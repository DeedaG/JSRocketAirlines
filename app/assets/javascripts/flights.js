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
  }).done (function(flights) {
    //console.log("the data is", data)
//debugger
  flights.forEach(flight => {
    let myflight = new Flight(flight)
      //console.log(myflight)
      let myFlighthtml = myflight.flighthtml()
      document.getElementById('ajax-flights').innerHTML += myFlighthtml
      console.log(myFlighthtml)
  })
//     let myflight = new Flight(data[0])
//       .map(element => {
//       return (`
//         <p>${element.name}</p>
//         `)
//   })
// )
//    debugger

    //debugger
  })
}

function Flight(flight) {
    this.id = flight.id
    this.name = flight.name
    this.destination = flight.destination
    this.bookings = flight.bookings
    this.users = flight.users
}

Flight.prototype.flighthtml = function() {
  // let flightBookings = this.bookings.map(booking => {
  //   return (`
  //     <p>${booking.description}<br></p>
  //     `)
  //   })
    return (`
      <div>
      <h3>${this.destination}</h3>
      <p>${this.name}</p>
      </div>
      `)
}
