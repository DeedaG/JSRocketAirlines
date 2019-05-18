class Booking < ApplicationRecord
  belongs_to :flight
  belongs_to :user

  scope :paid?, -> { where(paid: "1") }
  scope :not_paid, -> {where(paid: "0")}

end
