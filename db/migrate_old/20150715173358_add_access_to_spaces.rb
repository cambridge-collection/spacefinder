class AddAccessToSpaces < ActiveRecord::Migration
  def change
    add_reference :spaces, :access, index: true, foreign_key: true
  end
end
