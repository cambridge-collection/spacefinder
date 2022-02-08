json.results do
  json.array! @spaces do |space|

    json.extract! space, :id, :name, :description, :access, :space_type, :library, :address, 
                          :floor, :lat, :lng, :restricted, :restriction, :disabled_access, 
                          :url, :phone_number, :email_address, :twitter_screen_name, :facebook_url, 
                          :atmosphere_disciplined, :atmosphere_relaxed, :atmosphere_historic, 
                          :atmosphere_modern, :atmosphere_inspiring, :atmosphere_cosy, :atmosphere_social, 
                          :atmosphere_friendly, :noise, :facility_food_drink, :facility_daylight, 
                          :facility_views, :facility_large_desks, :facility_free_wifi, :facility_no_wifi, 
                          :facility_computers, :facility_laptops_allowed, :facility_sockets, 
                          :facility_signal, :facility_printers_copiers, :facility_whiteboards, 
                          :facility_projector, :facility_outdoor_seating, :facility_bookable, :facility_toilets,
                          :facility_accessible_toilets, :facility_induction_loops, :facility_adjustable_furniture, :facility_individual_study_space, 
                          :facility_gender_neutral_toilets, :facility_bike_racks, :facility_smoking_area, :facility_baby_changing, :facility_prayer_room,
                          :facility_refreshments, :facility_break,
                          :opentimes_before_9am, :opentimes_after_7pm, :opentimes_saturday, :opentimes_sunday, :work_in_a_library, :work_private, :work_close, :work_friends,
                          :work_group, :expensive, :tags, :user_tags, :booking_url, :created_at, :updated_at

    json.images space.space_photos.collect{|space_photo| space_photo.photo.url(:resized, escape: false)}

    json.access space.try(:access).try(:title)
    json.space_type space.try(:space_type).try(:title)
    json.library space.try(:library).try(:name)
    json.noise space.try(:noise).try(:title)

    json.facilities @facilities.collect{|fk| if space.send(fk) == true then fk else nil end}.compact
    json.atmosphere @atmospheres.collect{|ak| if space.send(ak) == true then ak else nil end}.compact

    json.admin_tag_list space.tags.collect{|t| t.name }
    json.user_tags_list space.user_tags.collect{|t| t.name }

    json.term_time_hours do
      OpeningHoursWeek.days.each { |day|
        json.set! day do
          json.extract! space.term_time_hours.send(day), :open, :allday, :from, :to
        end
      }
    end
    json.out_of_term_hours do
      OpeningHoursWeek.days.each { |day|
        json.set! day do
          json.extract! space.out_of_term_hours.send(day), :open, :allday, :from, :to
        end
      }
    end
  end
end
json.set! :total_count, @spaces.total_count
