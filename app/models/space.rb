class Space < ActiveRecord::Base
  acts_as_taggable
  acts_as_taggable_on :user_tags
  
  validates_inclusion_of :expensive, :in => 1..5, :allow_blank => true
  validates :term_time_hours, presence: true
  validates_associated :term_time_hours
  validates :out_of_term_hours, presence: true
  validates_associated :out_of_term_hours

  belongs_to :access
  belongs_to :space_type
  belongs_to :library
  belongs_to :noise
  
  belongs_to :term_time_hours, class_name: "OpeningHoursWeek", :foreign_key => 'term_time_hours_id', dependent: :destroy
  belongs_to :out_of_term_hours, class_name: "OpeningHoursWeek", :foreign_key => 'out_of_term_hours_id', dependent: :destroy
  
  accepts_nested_attributes_for :term_time_hours
  accepts_nested_attributes_for :out_of_term_hours
  
  has_many :tips

  attr_accessor :new_library_name

  before_save :create_library_from_name

  def create_library_from_name
    unless new_library_name.blank? then
      self.library = Library.find_or_create_by(:name => new_library_name)
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
  
  
  
  filterrific(
    available_filters: [
      :with_noise_ids,
      :with_tag_names,
      :search_query
    ].concat(atmospheres.collect{ |atmosphere| 
      atmosphere.to_sym
    }).concat(facilities.collect{ |facility| 
      facility.to_sym
    })
  )
  
  scope :with_noise_ids, ->(noise_ids) {
    where(:noise_id => [*noise_ids])
  }
  
  scope :with_tag_names, ->(tag_names) {
    tagged_with(tag_names)
  }
  
  scope :search_query, ->(query) {
    return nil if query.blank?
    
    where("LOWER(name) LIKE ?", "%#{query.downcase}%")
  }
  
  atmospheres.each do |atmosphere|
    scope atmosphere.to_sym, ->(check) { if(check) then where(atmosphere => true) end }
  end
  
  facilities.each do |facility|
    scope facility.to_sym, ->(check) { if(check) then where(facility => true) end }
  end

end
