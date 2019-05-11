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
 $(document).on('click', "#ajax-new-booking", function(event) {
   event.preventDefault()
   let bookingForm = Flight.newBookingForm()
   document.querySelector('div#new-booking-form-div').innerHTML = bookingForm
  $('#new_booking').on('submit', function(event) {
    event.preventDefault();
    //newFlightBooking();\
    const values = $(this).serialize()
    $.post('/bookings', values).done(function(data) {
      var booking = data;
    //  document.getElementById("show-page").innerHTML = booking
      //  debugger
      //  let newBooking = new Flight(flight.booking)
      //  let bookingHtml = newBooking.newbookinghtml()
      // document.getElementById('#new_booking').innerHTML = bookingHtml
      // console.log(bookingHtml)

    })
    //debugger
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

  static newBookingForm(){
    return (`
      <form class="new_booking" id="new_booking" action="/bookings" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="YuTArG96OCR3cQlWArhrWiUTGg3kKmZ2CH1iECxfwzXfGyR6tIvQjjTF/cv7CeC/HezW+g+dtqnvdt45joXWwA==">
        <input name='flight_name' type='text_field' >Flight Number</input><br>
        <input name='flight_destination' type='text_field' >Destination</input><br>
        <label for="booking_Notes">Notes</label>
        <textarea name="booking[description]" id="booking_description"></textarea>

        <label for="booking_Paid">Paid?</label>
        <input name="booking[paid]" type="hidden" value="0"><input type="checkbox" value="1" name="booking[paid]" id="booking_paid">

        <input value="5" type="hidden" name="booking[flight_id]" id="booking_flight_id">

        <input type="submit" name="commit" value="Create Booking" data-disable-with="Create Booking">
      </form>
      `)
    }
  }

Flight.prototype.flighthtml = function() {
  return (`

    <div id = 'show-page'></div><br>
    <div >
      <a href = '/flights/${this.id}' data-id= '${this.id}' class='show_link'>${this.destination}</a><br>
      <br>
    </div>
    `)
}

Flight.prototype.showflighthtml = function() {
  let flightBookings = this.bookings.map(booking => {
    let time = booking.created_at.slice(0,-14)
      if (booking.paid === 1)
        return (`
        <button id='ajax-new-booking'>Book this flight</button>
        <div id='new-booking-form-div'>[form]</div><br></br>
        ${time}"Customer Booked ${this.destination} ${this.name}"
        `)
      else
        return (`
        <button id='ajax-new-booking'>Book this flight</button>
        <div id='new-booking-form-div'>[form]</div><br></br>
        ***${this.destination}${this.name} available***
        `)
      })
  return (`
    ${flightBookings}
    `)
  }

// Flight.prototype.newbookinghtml = function() {
//   let newBookings = this.bookings.map(booking => {
//     booking.description
//     booking.paid
//   })
//   return (`
//     ${this.name}
//     ${this.destination}
//     ${newBookings}
//     `)
// }
