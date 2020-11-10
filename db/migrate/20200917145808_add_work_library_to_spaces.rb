class AddWorkLibraryToSpaces < ActiveRecord::Migration[6.0]
  def change
    add_column :spaces, :work_in_a_library, :bool
  end
end
