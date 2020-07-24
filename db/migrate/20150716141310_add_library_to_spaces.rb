class AddLibraryToSpaces < ActiveRecord::Migration[4.2]
  def change
    add_reference :spaces, :library, index: true, foreign_key: true
  end
end
