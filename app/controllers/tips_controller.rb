class TipsController < ApplicationController
  protect_from_forgery except: :create
  before_filter :authenticate_user!, except: [:index, :new, :review, :update, :destroy]
  before_filter :check_user_details_set, only: :create
  after_action :jsonp_callback, only: [:index]
  
  # GET /tips
  # GET /tips.json
  def index
    @space = Space.find(params[:space_id])
    @tips = @space.tips
  end

  # GET /tips/new
  def new
    @space = Space.find(params[:space_id])
    @tip = @space.tips.new
  end

  # POST /tips
  # POST /tips.json
  def create
    @space = Space.find(params[:space_id])
    @tip = @space.tips.new(tip_params)
    @tip.user = current_user
    
    respond_to do |format|
      if @tip.save
        format.html { redirect_to @space, notice: 'Tip was successfully created.' }
        format.json { render :json => {status: 'ok'} }
      else
        format.html { render :new }
        format.json { render json: @tip.errors, status: :unprocessable_entity }
      end
    end
  end
  
  def destroy
    @tip = Tip.find(params[:id])
    @tip.destroy
    respond_to do |format|
      format.html { redirect_to admin_review_url, notice: 'Tip was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def review
    @tips = Tip.order('updated_at DESC').where(:response => nil)
    render layout: "admin"
  end
  
  def update
    @tip = Tip.find(params[:id])
    @tip.responding_user = User.first # TODO use current admin user
    respond_to do |format|
      if @tip.update(response_params)
        format.html { redirect_to admin_review_url, notice: 'Tip was successfully updated.' }
        format.json { render :show, status: :ok, location: @tip }
      else
        format.html { redirect_to admin_review_url }
        format.json { render json: @tip.errors, status: :unprocessable_entity }
      end
    end
  end
  
  private

    def tip_params
      params.require(:tip).permit(:comment, :atmosphere_disciplined, :noise_quiet, :facility_large_desks, :work_friends, :atmosphere_relaxed, :facility_views, :atmosphere_inspiring, :space_id)
    end
    
    def response_params
      params.require(:tip).permit(:response)
    end
end
