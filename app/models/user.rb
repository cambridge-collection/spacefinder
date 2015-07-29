class User < ActiveRecord::Base
  devise :registerable,
         :rememberable, :trackable, :omniauthable
  
  def self.find_for_oauth(auth, signed_in_resource = nil)

    identity = Identity.find_for_oauth(auth)

    user = identity.user

    if user.nil?
      user = User.new(
        name: auth.info.name,
        #profile_image: auth.info.image
      )
      user.save!
    end

    if identity.user != user
      identity.user = user
      identity.save!
    end
    user
   end
end