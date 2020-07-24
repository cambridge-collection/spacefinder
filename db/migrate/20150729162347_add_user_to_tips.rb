class AddUserToTips < ActiveRecord::Migration[4.2]
  def change
    add_reference :tips, :user, index: true, foreign_key: true
  end
end
