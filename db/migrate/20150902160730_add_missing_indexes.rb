class AddMissingIndexes < ActiveRecord::Migration
  def change
    add_index :roles, ["resource_id", "resource_type"]
    add_index :space_photos, :space_id
  end
end