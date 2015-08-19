class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    @user = User.find_for_oauth(request.env["omniauth.auth"])

    sign_in @user, :event => :authentication 
    
    @details_needed = @user.details_needed?
    @status = "success"
    if current_user.has_role? :admin then
      @redirect_url = admin_url
    else
      @redirect_url = root_url
    end
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