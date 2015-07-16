class Space < ActiveRecord::Base
   validates_inclusion_of :expensive, :in => 1..5
   
   belongs_to :access
   belongs_to :space_type
   belongs_to :library
   
   attr_accessor :new_library_name
   
   before_save :create_library_from_name

   def create_library_from_name
     create_library(:name => new_library_name) unless new_library_name.blank?
   end
 
end
