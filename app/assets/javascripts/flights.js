$(function() {
  console.log("flights.js is loaded...")
  listenForClick()
  listenForNewBookingFormClick()
  listenForShowClick()
});

function listenForClick() {
 $("[href='/flights']").on('click', function(event) {
   event.preventDefault()
   getFlights()
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

 const values = $('booking-page').serialize();

    $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/bookings',
    data: values,
    }).done(function(response) {
 debugger
      const newBooking = new Flight(data)
      const htmlAdd = newBooking.newflightbooking()
      $("#booked-flight").innerHTML = htmlAdd
 })
}


class Flight {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.destination = obj.destination
    this.bookings = obj.bookings
    this.user = obj.user
  }

  static newBookingForm(flight_id){
    return (`
    <div id="booked-flight">

    <form id="booking-page" method="post" action="/bookings">
      <strong> New Flight Booking Form </strong>

      <div id="bookingDescription">
        <label for="booking_Notes">Notes</label>
        <textarea name="booking[description]" id="booking_description" required></textarea>

      <div id="bookingPaid?">
        <label for="booking_Paid">Paid?</label>
        <input name="booking[paid]" type="hidden" value="0"><input type="checkbox" value="1" name="booking[paid]" id="booking_paid">

      <div id="flightId">
        <select  name="booking[flight_id]" id="booking_flight_id" required>
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
        ${time}"Customer Booked ${this.destination} ${this.name}"
        `)

      })
  return (`
    ${flightBookings}<br>
    ***${this.destination}${this.name} available***<br>
      <div id='new-booking-form-div' >
        <a href ="/flights/${this.id}/bookings/new" data-id="${this.id}" class='booking_link'>Book this Flight</a>
      </div><br></br>
    `)
  }

Flight.prototype.newflightbooking = function() {
  let flightBookings = this.bookings.map(booking => {
    let time = booking.created_at.slice(0,-14);
      if (booking.paid === 1)
        return (`
        ${time}"Customer Booked ${this.destination} ${this.name}"
        `)
      })

  return (`
    ${flightBookings}
    `)
}
