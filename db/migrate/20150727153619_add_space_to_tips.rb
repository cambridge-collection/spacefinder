class AddSpaceToTips < ActiveRecord::Migration[4.2]
  def change
    add_reference :tips, :space, index: true, foreign_key: true
  end
end
