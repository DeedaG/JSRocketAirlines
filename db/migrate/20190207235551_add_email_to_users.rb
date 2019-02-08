class AddEmailToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :email, :string
    add_column :users, :image, :string
    add_column :users, :uid, :string
  end
end
