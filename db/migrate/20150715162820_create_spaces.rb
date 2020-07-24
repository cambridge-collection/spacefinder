class CreateSpaces < ActiveRecord::Migration[4.2]
  def change
    create_table :spaces do |t|
      t.string :name
      t.text :description
      t.text :address
      t.string :floor
      t.decimal :lat, precision: 10, scale: 6
      t.decimal :lng, precision: 10, scale: 6
      t.text :opening_hours
      t.boolean :restricted
      t.string :restriction
      t.boolean :disabled_access
      t.string :url
      t.string :phone_number
      t.string :twitter_screen_name
      t.string :facebook_url
      t.boolean :atmosphere_disciplined
      t.boolean :atmosphere_relaxed
      t.boolean :atmosphere_historic
      t.boolean :atmosphere_modern
      t.boolean :atmosphere_inspiring
      t.boolean :atmosphere_cosy
      t.boolean :atmosphere_social
      t.boolean :atmosphere_friendly
      t.boolean :facility_food_drink
      t.boolean :facility_daylight
      t.boolean :facility_views
      t.boolean :facility_large_desks
      t.boolean :facility_free_wifi
      t.boolean :facility_no_wifi
      t.boolean :facility_computers
      t.boolean :facility_laptops_allowed
      t.boolean :facility_sockets
      t.boolean :facility_signal
      t.boolean :facility_printers_copiers
      t.boolean :facility_whiteboards
      t.boolean :facility_projector
      t.boolean :facility_outdoor_seating
      t.boolean :facility_bookable
      t.boolean :facility_toilets
      t.boolean :facility_refreshments
      t.boolean :facility_break
      t.integer :expensive

      t.timestamps null: false
    end
  end
end
