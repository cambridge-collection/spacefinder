class AddAccessToSpaces < ActiveRecord::Migration[4.2]
  def change
    add_reference :spaces, :access, index: true, foreign_key: true
  end
end
