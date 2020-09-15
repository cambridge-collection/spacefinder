class AddOpenTimeFlagsToSpace < ActiveRecord::Migration[6.0]
  def change
    add_column :spaces, :opentimes_before_9am, :boolean
    add_column :spaces, :opentimes_after_7pm, :boolean
    add_column :spaces, :opentimes_saturday, :boolean
    add_column :spaces, :opentimes_sunday, :boolean
  end
end
