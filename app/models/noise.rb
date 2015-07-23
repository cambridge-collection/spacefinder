class Noise < ActiveRecord::Base
  has_many :spaces
  
  def self.options_for_select
    order('LOWER(title)').map { |e| [e.title, e.id] }
  end
end
