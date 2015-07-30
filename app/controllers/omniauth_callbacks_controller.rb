class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    @user = User.find_for_oauth(request.env["omniauth.auth"])

    sign_in @user, :event => :authentication 
    set_flash_message(:notice, :success, :kind => "Facebook") if is_navigational_format?
    @details_needed = true # TODO, get this from the user model
    @status = "success"
    @redirect_url = spaces_url # TODO: Change this when integrated frontend
  end
  
  def failure
    # oauth declined, call facebook.erb?
    @user = nil
    @details_needed = false
    @status = "authrequired"
    @redirect_url = spaces_url # TODO: Change this when integrated frontend
    render :facebook
  end
  
end