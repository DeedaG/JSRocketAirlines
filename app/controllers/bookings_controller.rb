require 'pry'
class BookingsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    if params[:user_id]
      @bookings = User.find(params[:user_id]).bookings
    else
      @bookings = Booking.all
    end
    #render json: @booking
  end

  def new
      @booking = Booking.new
  end

  def notpaid
    @bookings = current_user.bookings
  end

  def create
    @user = current_user
    #@flight = Flight.find_by(params[:id])
    @booking = current_user.bookings.create(booking_params)

    #@booking = @flight.bookings.create(booking_params)
    # raise params.inspect
     render json: @booking
    ##redirect_to user_path(@booking.user_id)
  end

  def show
    @booking = Booking.find(params[:id])
    @bookings = current_user.bookings
    #raise params.inspect
    respond_to do |f|
      f.html {render :show}
      f.json {render json: @booking}
    end
  end

  private
  def booking_params
    params.require(:booking).permit(:description, :paid, :luggage, :flight_class, :flight_id, user_ids:[])
  end

end
