class OpeningHoursDay < ActiveRecord::Base
  has_one :opening_hours_week
end
