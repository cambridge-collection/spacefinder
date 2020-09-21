class AddLibraryToSpaces < ActiveRecord::Migration
  def change
    add_reference :spaces, :library, index: true, foreign_key: true
  end
end
