class AddDeletedAtToTips < ActiveRecord::Migration
  def change
    add_column :tips, :deleted_at, :datetime
    add_index :tips, :deleted_at
  end
end
