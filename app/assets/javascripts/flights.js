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
  var id = event.target.attributes['data-id'].value;
  const values = $(this).serialize()
  //alert(id);
  debugger
  // $.post('/flights', values).done(function(data) {
  //   //debugger
  //   const newBooking = new Flight(data)
  //   const htmlToAdd = newBooking.newBookingForm()
  //   $("booking-page").html("htmlToAdd")
  //
  //    })
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

  static newBookingForm(){
    return (`

      <strong> New Flight Booking Form </strong>

          <label for="booking_Notes">Notes</label>
          <textarea name="booking[description]" id="booking_description"></textarea>

          <label for="booking_Paid">Paid?</label>
          <input name="booking[paid]" type="hidden" value="0"><input type="checkbox" value="1" name="booking[paid]" id="booking_paid">

          <input  type="hidden" name="booking[flight_id]" id="booking_flight_id">

          <input type="submit" />
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
