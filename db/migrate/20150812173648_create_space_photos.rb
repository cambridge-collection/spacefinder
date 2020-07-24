class CreateSpacePhotos < ActiveRecord::Migration[4.2]
  def change
    create_table :space_photos do |t|
      t.references :space

      t.timestamps null: false
    end
  end
end
