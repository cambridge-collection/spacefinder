if defined?(space) == "local-variable" # because the partial in index wont let us 'as: @space'
  @space = space
end

json.extract! @space, :id, :name, :description, :access, :space_type, :library, :address, :floor, :lat, :lng, :opening_hours, :restricted, :restriction, :disabled_access, :url, :phone_number, :twitter_screen_name, :facebook_url, :atmosphere_disciplined, :atmosphere_relaxed, :atmosphere_historic, :atmosphere_modern, :atmosphere_inspiring, :atmosphere_cosy, :atmosphere_social, :atmosphere_friendly, :noise, :facility_food_drink, :facility_daylight, :facility_views, :facility_large_desks, :facility_free_wifi, :facility_no_wifi, :facility_computers, :facility_laptops_allowed, :facility_sockets, :facility_signal, :facility_printers_copiers, :facility_whiteboards, :facility_projector, :facility_outdoor_seating, :facility_bookable, :facility_toilets, :facility_refreshments, :facility_break, :work_private, :work_close, :work_friends, :work_group, :expensive, :tags, :created_at, :updated_at
json.access @space.try(:access).try(:title)
json.space_type @space.try(:space_type).try(:title)
json.library @space.try(:library).try(:name)
json.noise @space.try(:noise).try(:title)

json.facilities Space.facilities.collect{|fk| if @space.send(fk) == true then fk else nil end}.compact
json.atmosphere Space.atmospheres.collect{|ak| if @space.send(ak) == true then ak else nil end}.compact
json.tags @space.tag_list
