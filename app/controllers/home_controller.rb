class HomeController < ApplicationController
  def index
    @user = current_user
    @details_needed = @user.try(:"details_needed?")
    @status = "success"
    render layout: false
  end
end
