class UsersController < ApplicationController
  protect_from_forgery except: :add_tag
  before_action :authenticate_user!
  before_action :set_user
  layout "admin"

  def authenticate_user!
    # code here
  end

  def add_tag
  end

  def edit
  end

  def update
    respond_to do |format|
      if @user.update(user_params)
        format.json { render :json => {
          status: 'ok',
          details_needed: @user.details_needed?
        } }
        format.html { redirect_to admin_review_path }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = current_user
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(
        :name, :email, :discipline, :avatar
      )
    end
end

