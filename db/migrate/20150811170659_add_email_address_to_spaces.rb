class AddEmailAddressToSpaces < ActiveRecord::Migration[4.2]
  def change
    add_column :spaces, :email_address, :string
  end
end
