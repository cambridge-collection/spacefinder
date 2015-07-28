class TipsController < ApplicationController
  protect_from_forgery except: :create
  
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

  private

    def tip_params
      params.require(:tip).permit(:comment, :atmosphere_disciplined, :noise_quiet, :facility_large_desks, :work_friends, :atmosphere_relaxed, :facility_views, :atmosphere_inspiring, :space_id)
    end
end
