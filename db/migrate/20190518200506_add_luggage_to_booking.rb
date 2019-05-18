class AddLuggageToBooking < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :luggage, :integer
  end
end
