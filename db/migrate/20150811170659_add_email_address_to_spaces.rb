class AddEmailAddressToSpaces < ActiveRecord::Migration
  def change
    add_column :spaces, :email_address, :string
  end
end
