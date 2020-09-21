class AddResponseToTips < ActiveRecord::Migration
  def change
    add_column :tips, :response, :text
    add_column :tips, :responding_user_id, :integer
    add_index :tips, :responding_user_id
  end
end
