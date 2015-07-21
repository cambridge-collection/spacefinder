if defined?(space) == "local-variable" # because the partial in index wont let us 'as: @space'
  @space = space
end

json.extract! @space, :id, :name, :description, :address, :floor, :lat, :lng, :opening_hours, :restricted, :restriction, :disabled_access, :url, :phone_number, :twitter_screen_name, :facebook_url, :atmosphere_disciplined, :atmosphere_relaxed, :atmosphere_historic, :atmosphere_modern, :atmosphere_inspiring, :atmosphere_cosy, :atmosphere_social, :atmosphere_friendly, :facility_food_drink, :facility_daylight, :facility_views, :facility_large_desks, :facility_free_wifi, :facility_no_wifi, :facility_computers, :facility_laptops_allowed, :facility_sockets, :facility_signal, :facility_printers_copiers, :facility_whiteboards, :facility_projector, :facility_outdoor_seating, :facility_bookable, :facility_toilets, :facility_refreshments, :facility_break, :expensive, :created_at, :updated_at
