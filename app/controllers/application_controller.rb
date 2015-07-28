class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  private
  
  def jsonp_callback
    if params[:callback] && params[:format].to_s == 'json'
      response['Content-Type'] = 'application/javascript'
      response.body = "%s(%s)" % [params[:callback], response.body]
    end
  end
end
