class Tip < ActiveRecord::Base
  belongs_to :space
  belongs_to :user
  validates :user, :presence => true
end
