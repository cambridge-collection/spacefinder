class RemoveOpeningHoursFromSpaces < ActiveRecord::Migration
  def change
    remove_column :spaces, :opening_hours, :text
  end
end
