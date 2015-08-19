class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  private
  
  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      format.json { render nothing: true, status: :forbidden }
      format.html { redirect_to admin_login_url }
    end
  end
  
  def jsonp_callback
    if params[:callback] && params[:format].to_s == 'json'
      response['Content-Type'] = 'application/javascript'
      response.body = "%s(%s)" % [params[:callback], response.body]
    end
  end
  
  def check_user_details_set
    if user_signed_in? and current_user.details_needed? then
      render :json => {details_needed: 'true'}
    end
  end
end
