class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    find_and_sign_in
  end
  
  def failure
    # oauth declined, call facebook.erb?
    @user = nil
    @details_needed = false
    @status = "authrequired"
    @redirect_url = root_url
    render :signin
  end
  
  def shibboleth
    find_and_sign_in
  end
  
  private
  
  def find_and_sign_in
    @user = User.find_for_oauth(request.env["omniauth.auth"])

    sign_in @user, :event => :authentication 
    
    @details_needed = @user.details_needed?
    @status = "success"
    
    if can? :write, Space then
      @redirect_url = admin_url
    else
      @redirect_url = root_url
    end
    
    render :signin
  end
  
  
end