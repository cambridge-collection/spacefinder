class AddSpaceTypeToSpaces < ActiveRecord::Migration
  def change
    add_reference :spaces, :space_type, index: true, foreign_key: true
  end
end
