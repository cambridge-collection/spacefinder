require 'test_helper'

class SpacesControllerTest < ActionController::TestCase
  setup do
    @space = spaces(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:spaces)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create space" do
    assert_difference('Space.count') do
      post :create, space: {address: @space.address, atmosphere_cosy: @space.atmosphere_cosy, atmosphere_disciplined: @space.atmosphere_disciplined, atmosphere_friendly: @space.atmosphere_friendly, atmosphere_historic: @space.atmosphere_historic, atmosphere_inspiring: @space.atmosphere_inspiring, atmosphere_modern: @space.atmosphere_modern, atmosphere_relaxed: @space.atmosphere_relaxed, atmosphere_social: @space.atmosphere_social, description: @space.description, disabled_access: @space.disabled_access, expensive: @space.expensive, facebook_url: @space.facebook_url, facility_bookable: @space.facility_bookable, facility_break: @space.facility_break, facility_computers: @space.facility_computers, facility_daylight: @space.facility_daylight, facility_food_drink: @space.facility_food_drink, facility_free_wifi: @space.facility_free_wifi, facility_laptops_allowed: @space.facility_laptops_allowed, facility_large_desks: @space.facility_large_desks, facility_no_wifi: @space.facility_no_wifi, facility_outdoor_seating: @space.facility_outdoor_seating, facility_printers_copiers: @space.facility_printers_copiers, facility_projector: @space.facility_projector, facility_refreshments: @space.facility_refreshments, facility_signal: @space.facility_signal, facility_sockets: @space.facility_sockets, facility_toilets: @space.facility_toilets, facility_views: @space.facility_views, facility_whiteboards: @space.facility_whiteboards, floor: @space.floor, lat: @space.lat, lng: @space.lng, name: @space.name,
                            term_time_hours_attributes: [ :open, :allday, :from, :to],
                            phone_number: @space.phone_number, restricted: @space.restricted, restriction: @space.restriction, twitter_screen_name: @space.twitter_screen_name, url: @space.url}
    end

    assert_redirected_to space_path(assigns(:space))
  end

  test "should show space" do
    get :show, id: @space
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @space
    assert_response :success
  end

  test "should update space" do
    patch :update, id: @space, space: {address: @space.address, atmosphere_cosy: @space.atmosphere_cosy, atmosphere_disciplined: @space.atmosphere_disciplined, atmosphere_friendly: @space.atmosphere_friendly, atmosphere_historic: @space.atmosphere_historic, atmosphere_inspiring: @space.atmosphere_inspiring, atmosphere_modern: @space.atmosphere_modern, atmosphere_relaxed: @space.atmosphere_relaxed, atmosphere_social: @space.atmosphere_social, description: @space.description, disabled_access: @space.disabled_access, expensive: @space.expensive, facebook_url: @space.facebook_url, facility_bookable: @space.facility_bookable, facility_break: @space.facility_break, facility_computers: @space.facility_computers, facility_daylight: @space.facility_daylight, facility_food_drink: @space.facility_food_drink, facility_free_wifi: @space.facility_free_wifi, facility_laptops_allowed: @space.facility_laptops_allowed, facility_large_desks: @space.facility_large_desks, facility_no_wifi: @space.facility_no_wifi, facility_outdoor_seating: @space.facility_outdoor_seating, facility_printers_copiers: @space.facility_printers_copiers, facility_projector: @space.facility_projector, facility_refreshments: @space.facility_refreshments, facility_signal: @space.facility_signal, facility_sockets: @space.facility_sockets, facility_toilets: @space.facility_toilets, facility_views: @space.facility_views, facility_whiteboards: @space.facility_whiteboards, floor: @space.floor, lat: @space.lat, lng: @space.lng, name: @space.name,

                                       # opening_hours: @space.opening_hours,
                                       phone_number: @space.phone_number, restricted: @space.restricted, restriction: @space.restriction, twitter_screen_name: @space.twitter_screen_name, url: @space.url,
                                       term_time_hours_attributes: [ :open, :allday, :from, :to]
    }
    assert_redirected_to space_path(assigns(:space))
  end

  test "should destroy space" do
    assert_difference('Space.count', -1) do
      delete :destroy, id: @space
    end

    assert_redirected_to spaces_path
  end
end
