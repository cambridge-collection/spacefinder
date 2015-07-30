class User < ActiveRecord::Base
  devise :registerable,
         :rememberable, :trackable, :omniauthable
  
  has_many :tips
  
  def self.find_for_oauth(auth, signed_in_resource = nil)

    identity = Identity.find_for_oauth(auth)

    user = identity.user

    if user.nil?
      user = User.new(
        name: auth.info.name,
        profile_image: auth.info.image,
        email: auth.info.email
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
     name.blank? or email.blank?
   end
end
