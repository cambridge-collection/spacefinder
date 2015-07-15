class Space < ActiveRecord::Base
   validates_inclusion_of :expensive, :in => 1..5
   belongs_to :Access
end
