require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    Rails.application.config.google_maps_api_key = ''
  end

  test "should get index" do
    get root_url
    assert_response :success
    assert_equal "text/html", @response.media_type
  end

  test "google maps API key is empty by default" do
    get root_url
    maps_url = 'https://maps.googleapis.com/maps/api/js?key=&libraries=geometry'
    assert_select "script:match('src', ?)", Regexp.escape(maps_url)
  end

  test "google maps API js is requested with API key specified in config" do
    api_key = 'abcd'
    Rails.application.config.google_maps_api_key = api_key
    get root_url
    maps_url = "https://maps.googleapis.com/maps/api/js?key=#{api_key}&libraries=geometry"
    assert_select "script:match('src', ?)", Regexp.escape(maps_url)
  end
end
