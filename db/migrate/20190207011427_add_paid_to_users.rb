class AddPaidToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :paid?, :boolean
  end
end
