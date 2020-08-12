class RenameSpaceOwnersToEditors < ActiveRecord::Migration
  def change
    rename_column :spaces, :owners, :editors
  end
end
