class SpacePhoto < ActiveRecord::Base
  belongs_to :space
  
  has_attached_file :photo, :styles => { :resized => "800x>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/
end
