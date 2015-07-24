class Space < ActiveRecord::Base
  acts_as_taggable
  
  validates_inclusion_of :expensive, :in => 1..5, :allow_blank => true

  belongs_to :access
  belongs_to :space_type
  belongs_to :library
  belongs_to :noise

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
  
  
  
  filterrific(
    available_filters: [
      :with_noise_ids
    ].concat(atmospheres.collect{|atmosphere| atmosphere.to_sym})
  )
  
  scope :with_noise_ids, lambda { |noise_ids|
    where(:noise_id => [*noise_ids])
  }
  
  atmospheres.each do |atmosphere|
    scope atmosphere.to_sym, ->(check) { if(check) then where(atmosphere => true) end }
  end

end
