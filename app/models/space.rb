class Space < ActiveRecord::Base
  include SearchCop
  resourcify

  acts_as_taggable
  acts_as_taggable_on :user_tags
  acts_as_mappable

  validates_inclusion_of :expensive, :in => 1..5, :allow_blank => true
  validates :term_time_hours, presence: true
  validates_associated :term_time_hours
  validates :out_of_term_hours, presence: true
  validates_associated :out_of_term_hours

  validates :name, :space_type, :address, :lat, :lng, presence: true
  validates :facebook_url, format: {without: /(\Ahttps?:\/\/|facebook.com|\A\/)/, message: "should be the page name, without the http://facebook.com/"}, allow_blank: true
  validates :twitter_screen_name, format: {without: /(\A@|twitter.com)/, message: "in format \"cambridge_uni\""}, allow_blank: true
  before_validation do
    self.twitter_screen_name = self.twitter_screen_name.tr('@', '')
    self.twitter_screen_name = self.twitter_screen_name.strip
    self.facebook_url = self.facebook_url.strip
    if !self.booking_url.nil? then
      self.booking_url = self.booking_url.strip
    end

    if !self.work_in_a_library and !self.library_id.nil? then
      self.work_in_a_library = true
    end
  end

  belongs_to :access
  belongs_to :space_type
  belongs_to :library
  belongs_to :noise

  belongs_to :term_time_hours, class_name: "OpeningHoursWeek", :foreign_key => 'term_time_hours_id', dependent: :destroy
  belongs_to :out_of_term_hours, class_name: "OpeningHoursWeek", :foreign_key => 'out_of_term_hours_id', dependent: :destroy

  has_many :tips, dependent: :delete_all
  has_many :space_photos, dependent: :destroy

  accepts_nested_attributes_for :term_time_hours
  accepts_nested_attributes_for :out_of_term_hours
  accepts_nested_attributes_for :space_photos, :allow_destroy => true

  attr_accessor :new_library_name

  after_initialize :create_opentime_flags
  before_save :create_library_from_name
  after_save :add_space_to_editors

  def create_library_from_name
    unless new_library_name.blank? then
      self.library = Library.find_or_create_by(:name => new_library_name)
    end
  end

  def create_opentime_flags
    # TODO Read the opening time data and create flags for faster search filtering
    # Scan through hours.
    #
    # puts self.name
    self.opentimes_before_9am = true
    self.opentimes_after_7pm = true
    self.opentimes_saturday = true
    self.opentimes_sunday = true
  end

  def add_space_to_editors

    # remove existing editors
    rs = self.roles.find_by_name('admin')
    unless rs.nil? || rs.users.nil? then
      rs.users.each{|u|
        u.remove_role :admin, self
      }
    end

    # add new editors
    # add new editors
    unless self.editors.nil? then
      self.editors.split(',').each{|crsid|
        crsid.strip!
        id = Identity.find_by_uid(crsid)

        unless id.nil? then
          id.user.add_role :admin, self
        else
            #no user found with that id, add them as a contributor
            id = Identity.new
            id.provider = "shibboleth"
            id.uid = crsid
            u = User.new
            u.save
            id.user = u
            id.save

            id.user.add_role :contributor

            #set role to be admin on space
            id.user.add_role :admin, self
        end
      }
    end
  end

  def self.atmospheres
    self.attribute_names.select{|s| s[0, 10] == "atmosphere" }
  end

  def self.facilities
    self.attribute_names.select{|s| s[0, 8] == "facility" }

  end

  def self.works
    self.attribute_names.select{|s| s[0, 4] == "work" }
  end

  def self.opentimes
    # TODO convert to open times attributes
    self.attribute_names.select{|s| s[0, 9] == "opentimes" }
  end


  filterrific(
    available_filters: [
      :with_noise_ids,
      :with_tag_names,
      :search_query,
      :nearest,
      :bounds
    ].concat(atmospheres.collect{ |atmosphere|
      atmosphere.to_sym
    }).concat(facilities.collect{ |facility|
      facility.to_sym
    }).concat(works.collect{ |work|
      work.to_sym
    })
  )

  scope :with_noise_ids, ->(noise_ids) {
    where(:noise_id => [*noise_ids])
  }

  scope :with_tag_names, ->(tag_names) {
    tagged_with(tag_names)
  }

  scope :nearest, ->(origin) {
    by_distance(origin: origin.split(','))
  }

  scope :bounds, ->(bounds) {
    return nil if (bounds.sw.nil? || bounds.ne.nil?)
    in_bounds([bounds.sw.split(','), bounds.ne.split(',')])
  }

  search_scope :search_query do
    attributes :name, :description
    attributes :library => "library.name"
    attributes :tags => "tags.name"
    attributes :space_type => "space_type.title"
    attributes :noise => "noise.title"

    options :name, :type => :fulltext
    options :description, :type => :fulltext
    options :library, :type => :fulltext
    options :tags, :type => :fulltext
    options :space_type, :type => :fulltext
    options :noise, :type => :fulltext
  end

  atmospheres.each do |atmosphere|
    scope atmosphere.to_sym, ->(check) { if(check) then where(atmosphere => true) end }
  end

  facilities.each do |facility|
    scope facility.to_sym, ->(check) { if(check) then where(facility => true) end }
  end

  works.each do |work|
    scope work.to_sym, ->(check) { if(check) then where(work => true) end }
  end

  #
  # opentimes.each do |opentime|
  #  scope opentime.to_sym, ->(check) { if (check) then where(opentime => true) end}
  # end

end
