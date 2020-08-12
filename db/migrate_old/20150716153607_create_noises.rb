class CreateNoises < ActiveRecord::Migration
  def change
    create_table :noises do |t|
      t.string :title

      t.timestamps null: false
    end
  end
end
