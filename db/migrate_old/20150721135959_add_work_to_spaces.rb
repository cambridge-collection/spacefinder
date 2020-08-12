class AddWorkToSpaces < ActiveRecord::Migration
  def change
    add_column :spaces, :work_private, :boolean
    add_column :spaces, :work_close, :boolean
    add_column :spaces, :work_friends, :boolean
    add_column :spaces, :work_group, :boolean
  end
end
