class AddOwnersToSpaces < ActiveRecord::Migration
  def change
    add_column :spaces, :owners, :string
  end
end
