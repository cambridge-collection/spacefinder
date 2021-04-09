class User < ActiveRecord::Base
  rolify
  devise :rememberable, :trackable, :omniauthable, omniauth_providers: [:saml]
  
  has_many :tips, dependent: :destroy
  has_many :identities, dependent: :destroy
  
  has_attached_file :avatar, styles: { :resized => "150x150#" }, default_url: ActionController::Base.helpers.image_path("default-avatar.png")
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/
  
  def self.find_for_oauth(auth, signed_in_resource = nil)

    identity = Identity.find_for_oauth(auth)

    user = identity.user

    if user.nil?
            
      user = User.new(
        name: auth.info.name,
        email: auth.info.email,
        discipline: "",
        avatar_remote_url: auth.info.image
      )
      
      user.save!
      
      # add as admin to any listed spaces
      admin_spaces = Space.where("LOWER(editors) LIKE ?", "%#{identity.uid}%")
      unless admin_spaces.empty? then
        user.add_role :contributor
        admin_spaces.each{|admin_space|
          user.add_role :admin, admin_space
        }
      end
    end

    if identity.user != user
      identity.user = user
      identity.save!
    end
    user
   end
   
   def details_needed?
     name.blank? or email.blank? or discipline.blank?
   end
   
   def avatar_remote_url=(url_value)
     begin
       self.avatar = URI.parse(url_value)
     rescue
       self.avatar = nil
     end
     
     @avatar_remote_url = url_value
   end
end
