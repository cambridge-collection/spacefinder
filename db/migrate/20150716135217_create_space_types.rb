class CreateSpaceTypes < ActiveRecord::Migration[4.2]
  def change
    create_table :space_types do |t|
      t.string :title

      t.timestamps null: false
    end
  end
end
