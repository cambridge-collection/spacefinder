class CreateTips < ActiveRecord::Migration[4.2]
  def change
    create_table :tips do |t|
      t.text :comment
      t.boolean :atmosphere_disciplined
      t.boolean :noise_quiet
      t.boolean :facility_large_desks
      t.boolean :work_friends
      t.boolean :atmosphere_relaxed
      t.boolean :facility_views
      t.boolean :atmosphere_inspiring

      t.timestamps null: false
    end
  end
end
