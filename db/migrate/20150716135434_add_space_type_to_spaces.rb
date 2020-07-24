class AddSpaceTypeToSpaces < ActiveRecord::Migration[4.2]
  def change
    add_reference :spaces, :space_type, index: true, foreign_key: true
  end
end
