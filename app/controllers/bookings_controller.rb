require 'pry'
class BookingsController < ApplicationController

  def index
    if params[:user_id]
      @bookings = User.find(params[:user_id]).bookings
    else
      @bookings = Booking.all
    end
  end

  def new
      @booking = Booking.new
  end

  def notpaid
    @bookings = current_user.bookings
  end

  def create
    @user = current_user
    #@flight = Flight.find(params[:booking][:flight])
    @booking = current_user.bookings.create(booking_params)
    #raise params.inspect
    #@booking = @flight.bookings.create(booking_params.merge(user_id: current_user.id))
     #binding.pry
     render json: @booking, status: 201
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
    params.require(:booking).permit(:description, :paid, :flight_id)
  end

end
