class AddAttachmentPhotoToSpacePhotos < ActiveRecord::Migration
  def self.up
    change_table :space_photos do |t|
      t.attachment :photo
    end
  end

  def self.down
    remove_attachment :space_photos, :photo
  end
end
