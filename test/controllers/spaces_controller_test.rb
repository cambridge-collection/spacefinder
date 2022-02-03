require "test_helper"

class SpacesControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @space = spaces(:one)
  end

  test "should get index" do
    get spaces_url, as: :json
    assert_response :success
    assert_equal "application/json", @response.media_type
  end

  test "show space is not implemented" do
    get space_url(@space)
    assert_response :not_implemented
  end

  test "get new as anonymous should redirect to login" do
    get new_space_url
    assert_redirected_to admin_login_path
  end

  test "get new as a regular user should redirect to login" do
    sign_in users(:sam_the_student)
    get new_space_url
    assert_redirected_to admin_login_path
  end

  test "get new as a contributor user should render the form" do
    sign_in users(:chris_the_contributor)
    get new_space_url
    assert_response :success
    assert_select "form.new_space"
  end

  test "get new as an admin user should render the form" do
    sign_in users(:alex_the_admin)
    get new_space_url
    assert_response :success
    assert_select "form.new_space"
  end

  test "create as anonymous should redirect to login" do
    post spaces_url, params: { space: { } }
    assert_redirected_to admin_login_path
  end

  test "create as a regular user should redirect to login" do
    sign_in users(:sam_the_student)
    post spaces_url, params: { space: { } }
    assert_redirected_to admin_login_path
  end

  test "create as a contributor user should create a space" do
    user = users(:chris_the_contributor)
    sign_in user
    user.add_role :admin, @space
    assert_difference('Space.count') do
      space_attributes = deep_attributes @space
      post spaces_url, params: { space: space_attributes }
    end
    assert_redirected_to admin_path
  end

  test "create as an admin user should create a space" do
    sign_in users(:alex_the_admin)
    assert_difference('Space.count') do
      space_attributes = deep_attributes @space
      post spaces_url, params: { space: space_attributes }
    end
    assert_redirected_to admin_path
  end

  test "edit as anonymous should redirect to login" do
    get edit_space_url(@space)
    assert_redirected_to admin_login_path
  end

  test "edit as a regular user should redirect to login" do
    sign_in users(:sam_the_student)
    get edit_space_url(@space)
    assert_redirected_to admin_login_path
  end

  test "edit as a contributor without access to the space user should redirect to login" do
    sign_in users(:chris_the_contributor)
    get edit_space_url(@space)
    assert_redirected_to admin_login_path
  end

  test "edit as a contributor with access to the space user should render the form" do
    user = users(:chris_the_contributor)
    sign_in user
    user.add_role :admin, @space
    get edit_space_url(@space)
    assert_response :success
    assert_select "form.edit_space"
  end

  test "edit as an admin user should render the form" do
    sign_in users(:alex_the_admin)
    get edit_space_url(@space)
    assert_response :success
    assert_select "form.edit_space"
  end

  test "update as anonymous should redirect to login" do
    patch space_url(@space), params: { space: {  } }
    assert_redirected_to admin_login_path
  end

  test "update as a regular user should redirect to login" do
    sign_in users(:sam_the_student)
    patch space_url(@space), params: { space: {  } }
    assert_redirected_to admin_login_path
  end

  test "update as a contributor without access to the space user should redirect to login" do
    sign_in users(:chris_the_contributor)
    patch space_url(@space), params: { space: {  } }
    assert_redirected_to admin_login_path
  end

  test "update as a contributor with access to the space user should update the space" do
    user = users(:chris_the_contributor)
    sign_in user
    user.add_role :admin, @space
    patch space_url(@space), params: { space: { name: "Chris was here" } }
    assert_redirected_to admin_path
    updated = Space.find(@space.id)
    assert_equal updated.name, "Chris was here"
  end

  test "update as an admin should update the space" do
    user = users(:alex_the_admin)
    sign_in user
    patch space_url(@space), params: { space: { name: "Alex was here" } }
    assert_redirected_to admin_path
    updated = Space.find(@space.id)
    assert_equal updated.name, "Alex was here"
  end

  test "destroy as anonymous should redirect to login" do
    delete space_url(@space)
    assert_difference('Space.count', 0) do
      delete space_url(@space)
    end
  end

  test "destroy as a regular user should redirect to login" do
    sign_in users(:sam_the_student)
    assert_difference('Space.count', 0) do
      delete space_url(@space)
    end
    assert_redirected_to admin_login_path
  end

  test "destroy as a contributor without access to the space user should redirect to login" do
    sign_in users(:chris_the_contributor)
    assert_difference('Space.count', 0) do
      delete space_url(@space)
    end
    assert_redirected_to admin_login_path
  end

  test "destroy as a contributor with access to the space user should not delete the space" do
    user = users(:chris_the_contributor)
    sign_in user
    user.add_role :admin, @space
    assert_difference('Space.count', 0) do
      delete space_url(@space)
    end
    assert_redirected_to admin_login_path
  end

  test "destroy as an admin should delete the space" do
    user = users(:alex_the_admin)
    sign_in user
    assert_difference('Space.count', -1) do
      delete space_url(@space)
    end
    assert_redirected_to admin_path
  end

  test "should get filters" do
    get '/spaces/filters.json'
    assert_response :success
    assert_equal "application/json", @response.media_type
    assert_equal @response.parsed_body.keys().to_set, \
      %w(work atmosphere noise facilities opentimes tags).to_set
  end

  test "should add tag" do
    post tags_space_url(@space), params: { tags: %w(foo bar) }, as: :json
    assert_response :success
    updated = Space.find(@space.id)
    assert_equal updated.user_tags.collect { |tag| tag.name }, %w(foo bar)
  end
end
