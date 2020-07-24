class AddNoiseToSpaces < ActiveRecord::Migration[4.2]
  def change
    add_reference :spaces, :noise, index: true, foreign_key: true
  end
end
