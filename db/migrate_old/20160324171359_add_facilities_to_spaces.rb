class AddFacilitiesToSpaces < ActiveRecord::Migration
  def change
    add_column :spaces, :facility_wheelchair_accessible,  :boolean, default: false
    add_column :spaces, :facility_blue_badge_parking,     :boolean, default: false
    add_column :spaces, :facility_accessible_toilets,     :boolean, default: false
    add_column :spaces, :facility_induction_loops,        :boolean, default: false
    add_column :spaces, :facility_adjustable_furniture,   :boolean, default: false
    add_column :spaces, :facility_individual_study_space, :boolean, default: false
    add_column :spaces, :facility_gender_neutral_toilets, :boolean, default: false
    add_column :spaces, :facility_bike_racks,             :boolean, default: false
    add_column :spaces, :facility_smoking_area,           :boolean, default: false
    add_column :spaces, :facility_baby_changing,          :boolean, default: false
    add_column :spaces, :facility_prayer_room,            :boolean, default: false
  end
end
