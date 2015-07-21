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
 
end
