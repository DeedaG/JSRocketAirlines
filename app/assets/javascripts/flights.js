$(function() {
  console.log("flights.js is loaded...")
  listenForClick()
});

function listenForClick() {
 $("button#flights-data").on('click', function(event) {
   event.preventDefault()
   getFlights()
  })
}

function getFlights() {
  $.ajax({
    url: 'http://localhost:3000/flights',
    method: 'get',
    dataType: 'json'
  }).done (function(data) {
    console.log("the data is", data)
//debugger
    let myflight = new Flight(data[0])
    debugger
    let myFlighthtml = myflight.flighthtml()
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
}

Flight.prototype.flighthtml = function() {
  let flightBookings = this.bookings.map(booking) => {
    return
      {`
        <p>booking.flight_id<br>
        booking.description<br>
        booking.paid</p>\
      `}
  }

  return {`
    <div>
    <h3>${this.destination}</h3>
    <p>${this.name}</p>
    <p>${flightBookings}</p>
    </div>
    `}
}
