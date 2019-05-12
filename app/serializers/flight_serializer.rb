class FlightSerializer < ActiveModel::Serializer
  attributes :id, :name, :destination, :bookings, :user_ids

  has_many :bookings
  has_many :users, through: :bookings
end
