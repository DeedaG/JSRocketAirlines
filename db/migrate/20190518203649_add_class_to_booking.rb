class AddClassToBooking < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :class, :string
  end
end
