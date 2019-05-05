class FlightSerializer < ActiveModel::Serializer
  attributes :id, :name, :destination, :created_at

  has_many :bookings
  has_many :users, through: :bookings
end
