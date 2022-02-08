class SpacesController < ApplicationController
  protect_from_forgery except: :add_tag
  before_action :check_user_details_set, only: :add_tag
  before_action :set_space, only: [:show, :edit, :update, :add_tag, :destroy]
  layout "admin"

  # GET /spaces
  # GET /spaces.json
  def index

    @facilities = Space.facilities
    @atmospheres = Space.atmospheres

    @filterrific = initialize_filterrific(
      Space,
      params[:filters],
      :persistence_id => false
    )

    @spaces = @filterrific.find.order(id: :asc).page(params[:page]).per(params[:limit])
                .includes([:access, :space_type, :library, :noise, :space_photos, :tags, :user_tags,
                  term_time_hours: [:monday, :tuesday, :wednesday, :thursday, :friday, :saturday, :sunday],
                  out_of_term_hours: [:monday, :tuesday, :wednesday, :thursday, :friday, :saturday, :sunday]])
  end

  # Not used
  def show
    head :not_implemented
  end

  # GET /spaces/new
  def new
    authorize! :manage, Space
    @space = Space.new
    space_photo = @space.space_photos.new
    term_time_hours = @space.build_term_time_hours
    out_of_term_hours = @space.build_out_of_term_hours
    OpeningHoursWeek.days.each {|day|
      term_time_hours.send("build_#{day}")
      out_of_term_hours.send("build_#{day}")
    }
  end

  # GET /spaces/1/edit
  def edit
    authorize! :manage, @space
    space_photo = @space.space_photos.new
  end

  # POST /spaces
  def create
    authorize! :manage, Space
    @space = Space.new(space_params)

    if @space.save
      unless current_user.has_role? :admin then
        current_user.add_role :admin, @space
      end
      redirect_to admin_path
    else
      render :new
    end
  end

  # PATCH/PUT /spaces/1
  # PATCH/PUT /spaces/1.json
  def update
    authorize! :manage, @space
    if @space.update(space_params)
      unless current_user.has_role? :admin then
        current_user.add_role :admin, @space
      end
      redirect_to admin_path
    else
      render :edit
    end
  end

  def destroy
    authorize! :destroy, @space

    @space.destroy
    respond_to do |format|
      format.html { redirect_to admin_url, notice: 'Space was successfully removed.' }
      format.json { head :no_content }
    end
  end

  def filters
    @works = Space.works
    @atmospheres = Space.atmospheres
    @noises = Noise.all
    @facilities = Space.facilities
    @opentimes = Space.opentimes
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
        :name, :description, :access_id, :space_type_id, :library_id, :new_library_name, :address, :floor, :lat, :lng,
        :restricted, :restriction, :disabled_access, :url, :phone_number, :email_address, :twitter_screen_name, :facebook_url,
        :atmosphere_disciplined, :atmosphere_relaxed, :atmosphere_historic, :atmosphere_modern, :atmosphere_inspiring,
        :atmosphere_cosy, :atmosphere_social, :atmosphere_friendly, :noise_id,
        :facility_food_drink, :facility_daylight, :facility_views, :facility_large_desks, :facility_free_wifi,
        :facility_no_wifi, :facility_computers, :facility_laptops_allowed, :facility_sockets, :facility_signal,
        :facility_printers_copiers, :facility_whiteboards, :facility_projector, :facility_outdoor_seating, :facility_bookable,
        :facility_toilets, :facility_refreshments, :facility_break, :facility_wheelchair_accessible, :facility_blue_badge_parking,
        :facility_accessible_toilets, :facility_induction_loops, :facility_adjustable_furniture, :facility_individual_study_space,
        :facility_gender_neutral_toilets, :facility_bike_racks, :facility_smoking_area, :facility_baby_changing, :facility_prayer_room,
        :opentimes_before_9am, :opentimes_after_7pm, :opentimes_saturday, :opentimes_sunday,
        :booking_url,
        :work_in_a_library, :work_private, :work_close, :work_friends, :work_group, :expensive, :tag_list, :editors,
        space_photos_attributes: [:id, :photo, :_destroy],
        term_time_hours_attributes: [
          Hash[OpeningHoursWeek.days.collect {|day|
            ["#{day}_attributes".to_sym,
              [
                :open, :allday, :from, :to
              ]
            ]
          }]
        ],
        out_of_term_hours_attributes: [
          Hash[OpeningHoursWeek.days.collect {|day|
            ["#{day}_attributes".to_sym,
              [
                :open, :allday, :from, :to
              ]
            ]
          }]
        ]
      )
    end
end

