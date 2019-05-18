class BookingSerializer < ActiveModel::Serializer
  attributes :id, :description, :flight_id, :user_id, :paid, :created_at, :luggage, :flight_class

  belongs_to :flight
  belongs_to :user
end
