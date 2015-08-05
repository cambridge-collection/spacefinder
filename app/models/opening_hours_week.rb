class OpeningHoursWeek < ActiveRecord::Base
  belongs_to :monday, class_name: "OpeningHoursDay", :foreign_key => 'monday_id'
  belongs_to :tuesday, class_name: "OpeningHoursDay", :foreign_key => 'tuesday_id'
  belongs_to :wednesday, class_name: "OpeningHoursDay", :foreign_key => 'wednesday_id'
  belongs_to :thursday, class_name: "OpeningHoursDay", :foreign_key => 'thursday_id'
  belongs_to :friday, class_name: "OpeningHoursDay", :foreign_key => 'friday_id'
  belongs_to :saturday, class_name: "OpeningHoursDay", :foreign_key => 'saturday_id'
  belongs_to :sunday, class_name: "OpeningHoursDay", :foreign_key => 'sunday_id'
  
  def self.days
    [:monday, :tuesday, :wednesday, :thursday, :friday, :saturday, :sunday]
  end
  
  days.each {|day|
    accepts_nested_attributes_for day
  }
end
