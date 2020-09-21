class RemoveProfileImageFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :profile_image, :string
  end
end
