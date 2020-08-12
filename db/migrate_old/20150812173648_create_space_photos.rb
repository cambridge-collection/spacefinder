class CreateSpacePhotos < ActiveRecord::Migration
  def change
    create_table :space_photos do |t|
      t.references :space

      t.timestamps null: false
    end
  end
end
