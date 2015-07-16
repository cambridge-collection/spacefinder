class AddNoiseToSpaces < ActiveRecord::Migration
  def change
    add_reference :spaces, :noise, index: true, foreign_key: true
  end
end
