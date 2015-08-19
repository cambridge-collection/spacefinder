class User < ActiveRecord::Base
  rolify
  devise :registerable,
         :rememberable, :trackable, :omniauthable
  
  has_many :tips, dependent: :destroy
  has_many :identities, dependent: :destroy
  
  def self.find_for_oauth(auth, signed_in_resource = nil)

    identity = Identity.find_for_oauth(auth)

    user = identity.user

    if user.nil?
      user = User.new(
        name: auth.info.name,
        profile_image: auth.info.image,
        email: auth.info.email,
        discipline: ""
      )
      user.save!
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
end
