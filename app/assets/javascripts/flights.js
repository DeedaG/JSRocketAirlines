$(function() {
  console.log("flights.js is loaded...")

    listenForNonAbcClick()
    listenForAbcClick()
    listenForNewBookingFormClick()
    listenForShowClick()
});


function listenForNonAbcClick() {
 //$("[href='/flights']").on('click', function(event) {
 $('#nonabc').on('click', function(event) {
   event.preventDefault()
   getFlights()
  })
}

function listenForAbcClick() {
 //$("[href='/flights']").on('click', function(event) {
 $('#abc').on('click', function(event) {

   event.preventDefault()

   getAbcFlights()
  })
}

function getAbcFlights() {
  $.ajax({
    url: 'http://localhost:3000/flights',
    method: 'get',
    dataType: 'json'
  }).done (function(flights) {

    flights.sort(function(a, b) {
      var destinationA = a.destination.toUpperCase(); // ignore upper and lowercase
      var destinationB = b.destination.toUpperCase(); // ignore upper and lowercase
      if (destinationA < destinationB) {
        return -1;
      }
      if (destinationA > destinationB) {
        return 1;
      }
      return 0;
    });


  flights.forEach(flight => {
    let myflight = new Flight(flight)
      let myFlighthtml = myflight.flighthtml()
      document.getElementById('ajax-flights').innerHTML += myFlighthtml
      console.log(myFlighthtml)
    })
  })
}



function getFlights() {
  $.ajax({
    url: 'http://localhost:3000/flights',
    method: 'get',
    dataType: 'json'
  }).done (function(flights) {
  flights.forEach(flight => {
    let myflight = new Flight(flight)
      let myFlighthtml = myflight.flighthtml()
      document.getElementById('ajax-flights').innerHTML += myFlighthtml
      console.log(myFlighthtml)
    })
  })
}

function listenForShowClick() {
 $(document).on('click', ".show_link", function(event) {
   event.preventDefault()
   var id = $(this).attr('data-id');
   getflight(id)
 })
}

function getflight(id) {
  var id = id;
   $.ajax({
     url: 'http://localhost:3000/flights',
     data: {id: id},
     method: 'get',
     dataType: 'json'
   }).done (function(flight) {
     let newFlight = new Flight(flight[id - 1])
      let flightHtml = newFlight.showflighthtml()
    document.querySelector('div#show-page').innerHTML = flightHtml
    console.log(flightHtml)
 })
}


function listenForNewBookingFormClick() {
  $(document).on('click', ".booking_link", function(event) {
    event.preventDefault()
    var flight_id = event.target.attributes['data-id'].value;
  //  alert("we r hack3rz");
    bookAFlight(flight_id)
  })
}

function bookAFlight(flight_id) {
  //var id = event.target.attributes['data-id'].value;
  let newBookingForm = Flight.newBookingForm(flight_id)
  document.querySelector("div#new-booking-form-div").innerHTML = newBookingForm

   $(function () {
     $('#booking-page').on('submit', function(event) {
     event.preventDefault();
     const values = $(this).serialize();
     $.post("/bookings", values).done(function(data) {
        console.log(data)
       $('#show-page').html("")

        const bookedFlight = new Booking(data)
      //  debugger
        const addHTML = bookedFlight.newflightbooking()
       $('#show-page').html(addHTML)
     })
    })
  })
}


class Flight {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.destination = obj.destination
    this.bookings = obj.bookings
    this.users = obj.users
  }

  static newBookingForm(flight_id){
    return (`
    <div id="booked-flight">

    <form id="booking-page" method="post" action="/bookings">
      <strong> New Flight Booking Form </strong>

      <div id="bookingDescription">
        <label for="booking_Notes">Notes</label>
        <textarea name="booking[description]" id="booking_description" required></textarea>

      <div id="bookingLuggage">
        <label for="booking_Luggage">Number of Bags (between 1 and 4): </label>
        <input type="number" name="booking[luggage]" id="booking_luggage" required></input>

      <div id="bookingFlight_class">
        <label for="booking_Flight_class">Choose Flight Class </label>
        <select name="booking[flight_class]" id="booking_flight_class" required>
          <option value="First"> First Class</option>
          <option value="Business"> Business Class</option>
          <option value="Economy"> Economy Class</option>
        </select>


      <div id="bookingPaid?">
        <label for="booking_Paid">Paid?</label>
        <input name="booking[paid]" type="hidden" value="0"><input type="checkbox" value="1" name="booking[paid]" id="booking_paid">

      <div id="flightId">
      <label for="flight_Id">Choose a Flight</label>
        <select name="booking[flight_id]" id="booking_flight_id" required>
          <option value="1">Dallas</option>
          <option value="2">London</option>
          <option value="3">Paris</option>
          <option value="4">New York</option>
          <option value="5">Los Angeles</option>
        </select>

      <div id="submit">
        <input type="submit" />
        </div>
      </form>
      `)
    }
  }


Flight.prototype.flighthtml = function() {
  return (`
    <div id ='show-page' ></div><br>
      <div >
        <a href ='/flights/${this.id}' data-id= '${this.id}' class='show_link'>${this.destination}</a><br>
        <br>
      </div>
    `)
}

Flight.prototype.showflighthtml = function() {
  let flightBookings = this.bookings.map(booking => {
    let time = booking.created_at.slice(0,-14);
      if (booking.paid === 1)
        return (`
        ${time} Customer Booked ${this.destination} ${this.name} <br>
        `)

      })
  return (`
    ${flightBookings}<br>
    ***${this.destination}${this.name} available***<br></br>
      <div id='new-booking-form-div' >
        <a href ="/flights/${this.id}/bookings/new" data-id="${this.id}" class='booking_link'>Book this Flight</a>
      </div><br></br>
    `)
  }


  class Booking {
    constructor(obj) {
      this.id = obj.id
      this.paid = obj.paid
      this.description = obj.description
      this.luggage = obj.luggage
      this.flight_class = obj.flight_class
      this.flight_id = obj.flight_id
      this.created_at = obj.created_at
      this.user = obj.user
      this.flight = obj.flight
    }
  }

Booking.prototype.newflightbooking = function() {

  if (this.paid === 1)
    return (`
     <h3>Booking Confirmation</h3>
     <p>Passenger: ${this.user.email}</p>
     <p>Destination: ${this.flight.destination}</p>
     <p>Flight Number: ${this.flight.name}</p>
     <p>Class: ${this.flight_class}</p>
     <p>Date Booked: ${this.created_at.slice(0,-14)}</p>
     <p>Number of Bags: ${this.luggage}</p>
    `)
  else
    return (`
     <h3>Booking not secured.  PAYMENT REQUIRED for ${this.flight.destination}${this.flight.name}.</h3>
    `)
}
