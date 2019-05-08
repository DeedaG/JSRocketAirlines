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
  //   $("[href='/flights/${id}']").append(flightHtml)
  $(`a[href ='/flights/${id}']`).append(flightHtml)
    // console.log(flightHtml)
 })
}


function listenForNewBookingFormClick() {
 $("button#ajax-new-booking").on('click', function(event) {
   event.preventDefault()
   let newBookingForm = Flight.newBookingForm()
   document.querySelector('div#new-booking-form-div').innerHTML = newBookingForm
   //debugger
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
          <label for="booking_Notes">Notes</label><br>
          <textarea name="booking[description]" id="booking_description"></textarea><br>
          <label for="booking_Paid">Paid?</label>
          <input type="checkbox" value="1" name="booking[paid]" id="booking_paid">
          <input type='submit' />
        </form>
        `)
    }
}


Flight.prototype.flighthtml = function() {
  //   if (`
  //     (${booking.paid} === 1)
  //          `)
  //     return "PAID";
  //   else
  //     (`
  //       (${booking.paid} === 0)
  //       `)
  //     return "PAYMENT REQUIRED"
  // })

  return (`
    <div>
      <a href = '/flights/${this.id}' data-id= '${this.id}' class='show_link'>${this.destination}</a><br>
      <br>
    </div>
    `)
}

Flight.prototype.showflighthtml = function() {

  return (`
    ${this.name}
    ${this.users.count}
    `)
}
