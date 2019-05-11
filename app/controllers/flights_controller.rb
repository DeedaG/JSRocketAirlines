class FlightsController < ApplicationController

  def index
    @flights = Flight.all
    @flight = Flight.new
    respond_to do |f|
      f.html {render :index}
      f.json {render json: @flights}
    end
  end

  def show
    @flight = Flight.find(params[:id])
    respond_to do |f|
      f.html {render :show}
      f.json {render json: @flight}
    end
  end


   def create
     @flight = Flight.new(flight_params)
     if @flight.save
      # redirect_to flights_path(@flight)
       render json: @flight
     else
       redirect_to root_path
     end
   end

   def edit
    @flight = Flight.find_by(id: params[:id])
  end

  def update
    @flight = Flight.find_by(id: params[:id])
    @flight.update(flight_params)
      redirect_to flight_path(@flight)
  end

   private
   def flight_params
     params.require(:flight).permit(:name, :destination, :users, :bookings, user_ids:[])
   end

end
