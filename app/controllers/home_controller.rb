class HomeController < ApplicationController
  def index
    @user = current_user
    @details_needed = @user.try(:"details_needed?")
    @status = "success"
    @js_base_url = url_for(action: 'index', only_path: true, trailing_slash: true)
    @google_maps_api_key = Rails.application.config.google_maps_api_key or ''
    render layout: false
  end
end
