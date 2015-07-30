class SpacesController < ApplicationController
  protect_from_forgery except: :add_tag
  before_filter :authenticate_user!, except: [:index, :filters]
  before_action :set_space, only: [:show, :edit, :update, :destroy, :add_tag]
  after_action :jsonp_callback, only: [:index, :show, :filters]

  # GET /spaces
  # GET /spaces.json
  def index
    
    @facilities = Space.facilities
    @atmospheres = Space.atmospheres
    
    @filterrific = initialize_filterrific(
      Space,
      params[:filters],
      :select_options => {
        with_noise_ids: Noise.options_for_select,
        with_tags: ActsAsTaggableOn::Tag.all.order('LOWER(name)').map { |e| [e.name, e.id] },
        with_atmosphere: Space.atmospheres, 
        with_facility: Space.facilities
      },
      :persistence_id => false
    )
    
    @spaces = @filterrific.find
    
  end

  # GET /spaces/1
  # GET /spaces/1.json
  def show
    @facilities = Space.facilities
    @atmospheres = Space.atmospheres
  end

  # GET /spaces/new
  def new
    @space = Space.new
  end

  # GET /spaces/1/edit
  def edit
  end

  # POST /spaces
  # POST /spaces.json
  def create
    @space = Space.new(space_params)

    respond_to do |format|
      if @space.save
        format.html { redirect_to @space, notice: 'Space was successfully created.' }
        format.json { render :show, status: :created, location: @space }
      else
        format.html { render :new }
        format.json { render json: @space.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /spaces/1
  # PATCH/PUT /spaces/1.json
  def update
    respond_to do |format|
      if @space.update(space_params)
        format.html { redirect_to @space, notice: 'Space was successfully updated.' }
        format.json { render :show, status: :ok, location: @space }
      else
        format.html { render :edit }
        format.json { render json: @space.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /spaces/1
  # DELETE /spaces/1.json
  def destroy
    @space.destroy
    respond_to do |format|
      format.html { redirect_to spaces_url, notice: 'Space was successfully destroyed.' }
      format.json { head :no_content }
    end
  end
  
  def filters
    @works = Space.works
    @atmospheres = Space.atmospheres
    @noises = Noise.all
    @facilities = Space.facilities
    @tags = ActsAsTaggableOn::Tag.all.order(taggings_count: :desc)
  end
  
  def add_tag
    respond_to do |format|
      @space.user_tag_list.add(params["tags"])
      if @space.save
        format.json { render :json => {status: 'ok'} }
      else
        format.json { render json: @space.errors, status: :unprocessable_entity }
      end
    end
    
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_space
      @space = Space.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def space_params
      params.require(:space).permit(
        :name, :description, :access_id, :space_type_id, :library_id, :new_library_name, :address, :floor, :lat, :lng, :opening_hours, :restricted, :restriction, :disabled_access, :url, :phone_number, :twitter_screen_name, :facebook_url, :atmosphere_disciplined, :atmosphere_relaxed, :atmosphere_historic, :atmosphere_modern, :atmosphere_inspiring, :atmosphere_cosy, :atmosphere_social, :atmosphere_friendly, :noise_id, :facility_food_drink, :facility_daylight, :facility_views, :facility_large_desks, :facility_free_wifi, :facility_no_wifi, :facility_computers, :facility_laptops_allowed, :facility_sockets, :facility_signal, :facility_printers_copiers, :facility_whiteboards, :facility_projector, :facility_outdoor_seating, :facility_bookable, :facility_toilets, :facility_refreshments, :facility_break, :work_private, :work_close, :work_friends, :work_group, :expensive, :tag_list
      )
    end
end

