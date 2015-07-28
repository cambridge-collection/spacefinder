class AddSpaceToTips < ActiveRecord::Migration
  def change
    add_reference :tips, :space, index: true, foreign_key: true
  end
end
