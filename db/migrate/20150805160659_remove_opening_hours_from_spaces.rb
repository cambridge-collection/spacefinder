class RemoveOpeningHoursFromSpaces < ActiveRecord::Migration[4.2]
  def change
    remove_column :spaces, :opening_hours, :text
  end
end
