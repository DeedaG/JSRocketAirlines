class ChangeColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :bookings, :class, :flight_class
  end
end
