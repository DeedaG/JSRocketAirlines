$(function() {
  console.log("flights.js is loaded...")
  listenForClick()
  listenForNewBookingFormClick()
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

        <form>
          <input id='flight-name' type='text' name='name'></input><br>
          <input type= 'text' name='destination'></input><br>
          <input type='submit' />
        </form>
        `)
    }
}

function listenForNewBookingFormClick() {
 $("button#ajax-new-booking").on('click', function(event) {
   event.preventDefault()
   let newBookingForm = Flight.newBookingForm()
   document.querySelector('div#new-booking-form-div').innerHTML = newBookingForm
   //debugger
  })
}



Flight.prototype.flighthtml = function() {
   // let flightBookings = this.bookings.map(booking => {
   //   return (`
   //        ${booking.paid}
   //      `)
   // })

    return (`
      <div>
      <h3>${this.destination}</h3><p>${this.name}</p>
      <br>
      </div>
      `)
}
