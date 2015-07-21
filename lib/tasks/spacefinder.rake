namespace :spacefinder do
  desc "Imports a CSV of Spaces into the db"
  task :import_csv, [:csv_path] => [:environment] do |t, args|
    
    spaces_csv = SmarterCSV.process(args[:csv_path])
    
    spaces_csv.each{|space_csv|
  
      space = Space.new
      space.name = space_csv[:basic_info]
      
      access = Access.find_by_title(space_csv[:"who_can_use_the_space?"])
      unless access.nil? then
        space.access_id = access.id
      end
      
      st = SpaceType.find_by_title(space_csv[:type_of_space])
      unless st.nil? then
        space.space_type_id = st.id
      end
      
      space.new_library_name = space_csv[:in_library]
      
      space.description = space_csv[:text_description_of_space]
      space.address = space_csv[:street_address]
      space.floor = space_csv[:floor]
      space.lat = space_csv[:"decimal_gps_coordinates_(lattitude)_eg_52.197949"]
      space.lng = space_csv[:"decimal_gps_coordinates_(longitude)_eg_0.122951"]
      space.opening_hours = space_csv[:opening_hours]
      
      if space_csv[:access_restrictions][0, 3] == "yes" then
        space.restricted = true 
        space.restriction = space_csv[:description_of_access_restriction]
      else
        space.restricted = false
      end
      
      if space_csv[:disabled_access][0, 3] == "yes" then
        space.disabled_access = true 
      else
        space.disabled_access = false
      end
      
      space.url = space_csv[:website_url]
      space.phone_number = space_csv[:phone_number]
      space.twitter_screen_name = (space_csv[:twitter]).to_s.tr('@', '')
      space.facebook_url = space_csv[:facebook_page]
      
      space.atmosphere_disciplined = !(space_csv[:disciplined?].nil? or space_csv[:disciplined?].empty?) ? true : false
      space.atmosphere_relaxed = !(space_csv[:relaxed_or_informal?].nil? or space_csv[:relaxed_or_informal?].empty?) ? true : false
      space.atmosphere_modern = !(space_csv[:modern?].nil? or space_csv[:modern?].empty?) ? true : false
      space.atmosphere_historic = !(space_csv[:historic?].nil? or space_csv[:historic?].empty?) ? true : false
      space.atmosphere_inspiring = !(space_csv[:inspiring_or_thought_provoking?].nil? or space_csv[:inspiring_or_thought_provoking?].empty?) ? true : false
      space.atmosphere_cosy = !(space_csv[:cosy?].nil? or space_csv[:cosy?].empty?)? true : false
      space.atmosphere_social = !(space_csv[:social?].nil? or space_csv[:social?].empty?) ? true : false
      space.atmosphere_friendly = !(space_csv[:friendly_or_welcoming?].nil? or space_csv[:friendly_or_welcoming?].empty?) ? true : false
      
      noise = Noise.find_by_title(space_csv[:which_best_describes_the_typical_noise_level_in_this_space?])
      unless noise.nil? then
        space.noise_id = noise.id
      end
      
      space.facility_food_drink = !(space_csv[:"food_&_drink_allowed"].nil? or space_csv[:"food_&_drink_allowed"].empty?) ? true : false
      space.facility_daylight = !(space_csv[:natural_daylight].nil? or space_csv[:natural_daylight].empty?) ? true : false
      space.facility_views = !(space_csv[:attractive_views_out_of_the_window].nil? or space_csv[:attractive_views_out_of_the_window].empty?) ? true : false
      space.facility_large_desks = !(space_csv[:large_desks].nil? or space_csv[:large_desks].empty?) ? true : false
      space.facility_free_wifi = !(space_csv[:free_wifi].nil? or space_csv[:free_wifi].empty?) ? true : false
      space.facility_no_wifi = !(space_csv[:no_wifi].nil? or space_csv[:no_wifi].empty?) ? true : false
      space.facility_computers = !(space_csv[:computers].nil? or space_csv[:computers].empty?) ? true : false
      space.facility_laptops_allowed = !(space_csv[:laptops_allowed].nil? or space_csv[:laptops_allowed].empty?) ? true : false
      space.facility_sockets = !(space_csv[:plug_sockets].nil? or space_csv[:plug_sockets].empty?) ? true : false
      space.facility_signal = !(space_csv[:phone_signal] .nil? or space_csv[:phone_signal] .empty?) ? true : false
      space.facility_printers_copiers = !(space_csv[:printers_and_copiers].nil? or space_csv[:printers_and_copiers].empty?) ? true : false
      space.facility_whiteboards = !(space_csv[:whiteboards].nil? or space_csv[:whiteboards].empty?) ? true : false
      space.facility_projector = !(space_csv[:projector].nil? or space_csv[:projector].empty?) ? true : false
      space.facility_outdoor_seating = !(space_csv[:outdoor_seating].nil? or space_csv[:outdoor_seating].empty?) ? true : false
      space.facility_bookable = !(space_csv[:bookable].nil? or space_csv[:bookable].empty?) ? true : false
      space.facility_toilets = !(space_csv[:toilets_nearby].nil? or space_csv[:toilets_nearby].empty?) ? true : false
      space.facility_refreshments = !(space_csv[:close_to_refreshments].nil? or space_csv[:close_to_refreshments].empty?) ? true : false
      space.facility_break = !(space_csv[:close_to_a_place_to_take_a_break].nil? or space_csv[:close_to_a_place_to_take_a_break].empty?) ? true : false
      
      space.expensive = space_csv[:"if_this_is_a_café,_restaurant_or_bar_how_expensive_is_it?(1_=_cheap,_5_=_expensive)"].nil? ? nil : space_csv[:"if_this_is_a_café,_restaurant_or_bar_how_expensive_is_it?(1_=_cheap,_5_=_expensive)"]
      
      if space.save then
        puts "Saved: #{space_csv[:basic_info]}"
      else
        puts "There was a problem saving: #{space_csv[:basic_info]}"
      end
    }
  end

end
