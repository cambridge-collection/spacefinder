namespace :spacefinder do
  
  desc "Grants administrator rights to a user based on a Raven user-id eg ab123@cam.ac.uk"
  task :make_admin, [:uid] => [:environment] do |t, args|
    if args[:uid].blank? then
      puts "Please provide a Raven user-id  eg ab123@cam.ac.uk"
    else
    
      id = Identity.find_by_uid(args[:uid])
      if id.nil? then
        puts "No users with uid #{args[:uid]} found, creating new user ready for first login"
        id = Identity.new
        id.provider = "saml"
        id.uid = args[:uid]
        u = User.new
        u.save
        id.user = u
        id.save
        
        id.user.add_role :admin
        puts "User #{args[:uid]} has been made an admin"
      else
        id.user.add_role :admin
        
        puts "User #{args[:uid]} has been made an admin"
      end
    end
  end
  
  desc "Grants contributor rights to a user based on a Raven user-id eg ab123@cam.ac.uk"
  task :make_contributor, [:uid] => [:environment] do |t, args|
    if args[:uid].blank? then
      puts "Please provide a Raven user-id  eg ab123@cam.ac.uk"
    else
    
      id = Identity.find_by_uid(args[:uid])
      if id.nil? then
        puts "No users with uid #{args[:uid]} found, creating new user ready for first login"
        id = Identity.new
        id.provider = "saml"
        id.uid = args[:uid]
        u = User.new
        u.save
        id.user = u
        id.save
        
        id.user.add_role :contributor
        puts "User #{args[:uid]} has been made a contributor"
      else
        id.user.add_role :contributor
        
        puts "User #{args[:uid]} has been made a contributor"
      end
    end
  end
  
  desc "Revokes contributor and admin rights from a user based on a Raven user-id eg ab123@cam.ac.uk"
  task :revoke_rights, [:uid] => [:environment] do |t, args|
    if args[:uid].blank? then
      puts "Please provide a Raven user-id  eg ab123@cam.ac.uk"
    else
    
      id = Identity.find_by_uid(args[:uid])
      if id.nil? then
        puts "No users with uid #{args[:uid]} found"
      else
        id.user.remove_role :contributor
        id.user.remove_role :admin
        
        puts "User #{args[:uid]} is no longer and admin or contributor"
      end
    end
  end

  desc "Imports a CSV of Spaces into the db"
  task :import_csv, [:csv_path] => [:environment] do |t, args|
    spaces_csv = SmarterCSV.process(args[:csv_path])
    
    spaces_csv.each{|space_csv|
      #binding.pry
      space = Space.new
      space.name = space_csv[:basic_info]
      
      access = Access.find_by_title(space_csv[:"who_can_use_the_space?"])
      unless access.nil? then
        space.access_id = access.id
      end
      
      st = SpaceType.where("lower(title) = ?", space_csv[:type_of_space].downcase).first
      unless st.nil? then
        space.space_type_id = st.id
      end

      unless :in_library.blank? then
        space.new_library_name= :in_library
        space.create_library_from_name
      end

      # space.new_library_name = space_csv[:in_library]
      
      space.description = space_csv[:text_description_of_space]
      space.address = space_csv[:street_address]
      space.floor = space_csv[:floor]
      space.lat = space_csv[:"decimal_gps_coordinates_(lattitude)_eg_52.197949"]
      space.lng = space_csv[:"decimal_gps_coordinates_(longitude)_eg_0.122951"]
      
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
      space.facebook_url = space_csv[:facebook_page].nil? ? "" : /(^https:\/\/www.facebook.com\/|^www.facebook.com\/)(.*)/.match(space_csv[:facebook_page])[2] 
      
      term_time_hours = space.build_term_time_hours
      out_of_term_hours = space.build_out_of_term_hours
      OpeningHoursWeek.days.each {|day|
        term_time_hours.send("build_#{day}")
        out_of_term_hours.send("build_#{day}")
      }
      
      space.atmosphere_disciplined = !(space_csv[:disciplined?].nil? or space_csv[:disciplined?].strip.empty?) ? true : false
      space.atmosphere_relaxed = !(space_csv[:relaxed_or_informal?].nil? or space_csv[:relaxed_or_informal?].strip.empty?) ? true : false
      space.atmosphere_modern = !(space_csv[:modern?].nil? or space_csv[:modern?].strip.empty?) ? true : false
      space.atmosphere_historic = !(space_csv[:historic?].nil? or space_csv[:historic?].strip.empty?) ? true : false
      space.atmosphere_inspiring = !(space_csv[:inspiring_or_thought_provoking?].nil? or space_csv[:inspiring_or_thought_provoking?].strip.empty?) ? true : false
      space.atmosphere_cosy = !(space_csv[:cosy?].nil? or space_csv[:cosy?].strip.empty?)? true : false
      space.atmosphere_social = !(space_csv[:social?].nil? or space_csv[:social?].strip.empty?) ? true : false
      space.atmosphere_friendly = !(space_csv[:friendly_or_welcoming?].nil? or space_csv[:friendly_or_welcoming?].strip.empty?) ? true : false
      
      noise = Noise.find_by_title(space_csv[:which_best_describes_the_typical_noise_level_in_this_space?])
      unless noise.nil? then
        space.noise_id = noise.id
      end
      
      space.facility_food_drink = !(space_csv[:"food_&_drink_allowed"].nil? or space_csv[:"food_&_drink_allowed"].strip.empty?) ? true : false
      space.facility_daylight = !(space_csv[:natural_daylight].nil? or space_csv[:natural_daylight].strip.empty?) ? true : false
      space.facility_views = !(space_csv[:attractive_views_out_of_the_window].nil? or space_csv[:attractive_views_out_of_the_window].strip.empty?) ? true : false
      space.facility_large_desks = !(space_csv[:large_desks].nil? or space_csv[:large_desks].strip.empty?) ? true : false
      space.facility_free_wifi = !(space_csv[:free_wifi].nil? or space_csv[:free_wifi].strip.empty?) ? true : false
      space.facility_no_wifi = !(space_csv[:no_wifi].nil? or space_csv[:no_wifi].strip.empty?) ? true : false
      space.facility_computers = !(space_csv[:computers].nil? or space_csv[:computers].strip.empty?) ? true : false
      space.facility_laptops_allowed = !(space_csv[:laptops_allowed].nil? or space_csv[:laptops_allowed].strip.empty?) ? true : false
      space.facility_sockets = !(space_csv[:plug_sockets].nil? or space_csv[:plug_sockets].strip.empty?) ? true : false
      space.facility_signal = !(space_csv[:phone_signal] .nil? or space_csv[:phone_signal] .strip.empty?) ? true : false
      space.facility_printers_copiers = !(space_csv[:printers_and_copiers].nil? or space_csv[:printers_and_copiers].strip.empty?) ? true : false
      space.facility_whiteboards = !(space_csv[:whiteboards].nil? or space_csv[:whiteboards].strip.empty?) ? true : false
      space.facility_projector = !(space_csv[:projector].nil? or space_csv[:projector].strip.empty?) ? true : false
      space.facility_outdoor_seating = !(space_csv[:outdoor_seating].nil? or space_csv[:outdoor_seating].strip.empty?) ? true : false
      space.facility_bookable = !(space_csv[:bookable].nil? or space_csv[:bookable].strip.empty?) ? true : false
      space.facility_toilets = !(space_csv[:toilets_nearby].nil? or space_csv[:toilets_nearby].strip.empty?) ? true : false
      space.facility_refreshments = !(space_csv[:close_to_refreshments].nil? or space_csv[:close_to_refreshments].strip.empty?) ? true : false
      space.facility_break = !(space_csv[:close_to_a_place_to_take_a_break].nil? or space_csv[:close_to_a_place_to_take_a_break].strip.empty?) ? true : false
      
      space.work_private = (space_csv[:"...in_private?"] == "yes") ? true : false
      space.work_close = (space_csv[:"...close_to_others?"] == "yes") ? true : false
      space.work_friends = (space_csv[:"...alongside_friends?"] == "yes") ? true : false
      space.work_group = (space_csv[:"...in_a_group?"] == "yes") ? true : false
      
      space.expensive = space_csv[:"if_this_is_a_café,_restaurant_or_bar_how_expensive_is_it?(1_=_cheap,_5_=_expensive)"].nil? ? nil : space_csv[:"if_this_is_a_café,_restaurant_or_bar_how_expensive_is_it?(1_=_cheap,_5_=_expensive)"]
      
      space.tag_list = space_csv[:tags]
      
      if space.save then
        puts "Saved: #{space_csv[:basic_info]} as #{space.id}"
      else
        puts "------"
        puts "There was a problem saving: #{space_csv[:basic_info]}"
        space.errors.full_messages.each do |message|
          puts message
        end
        puts "------"
      end
    }
  end

  desc "Import booking URL and update spaces"
  task :import_booking_url, [:csv_path] => [:environment] do |t, args|
    spaces_csv = SmarterCSV.process(args[:csv_path])
    spaces_csv.each { |space_csv|
      booking_url = space_csv[:booking_url]
      if !booking_url.blank? then
        space = Space.find(space_csv[:id])
        if !space.nil? then
          space.booking_url = booking_url
          space.save
          puts "Updated #{space.name} with url: #{booking_url}"
        end
      end

    }
  end

end

