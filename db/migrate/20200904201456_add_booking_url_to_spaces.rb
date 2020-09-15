class AddBookingUrlToSpaces < ActiveRecord::Migration[6.0]
  def change
    add_column :spaces, :booking_url, :string
  end
end
