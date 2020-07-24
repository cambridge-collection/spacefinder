class CreateAccesses < ActiveRecord::Migration[4.2]
  def change
    create_table :accesses do |t|
      t.string :title

      t.timestamps null: false
    end
  end
end
