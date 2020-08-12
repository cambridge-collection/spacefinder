class CreateOpeningHours < ActiveRecord::Migration
  def change
    create_table :opening_hours_days do |t|
      t.boolean :open
      t.boolean :allday
      t.string :from
      t.string :to

      t.timestamps null: false
    end
    
    create_table :opening_hours_weeks do |t|
      t.integer :monday_id
      t.integer :tuesday_id
      t.integer :wednesday_id
      t.integer :thursday_id
      t.integer :friday_id
      t.integer :saturday_id
      t.integer :sunday_id
      t.timestamps null: false
    end
    
    add_column :spaces, :term_time_hours_id, :integer
    add_index :spaces, :term_time_hours_id
    
    add_column :spaces, :out_of_term_hours_id, :integer
    add_index :spaces, :out_of_term_hours_id
    
    add_index :opening_hours_weeks, :monday_id
    add_index :opening_hours_weeks, :tuesday_id
    add_index :opening_hours_weeks, :wednesday_id
    add_index :opening_hours_weeks, :thursday_id
    add_index :opening_hours_weeks, :friday_id
    add_index :opening_hours_weeks, :saturday_id
    add_index :opening_hours_weeks, :sunday_id
  end
end
