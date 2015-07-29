class AddUserToTips < ActiveRecord::Migration
  def change
    add_reference :tips, :user, index: true, foreign_key: true
  end
end
