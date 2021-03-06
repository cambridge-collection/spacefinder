class Tip < ActiveRecord::Base
  resourcify
  acts_as_paranoid
  belongs_to :space
  belongs_to :user
  belongs_to :responding_user, class_name: "User", \
    :foreign_key => 'responding_user_id', optional: true
  validates :user, :presence => true
end
