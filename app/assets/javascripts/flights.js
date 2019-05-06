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
debugger
    let myflight = new Flight(data[0])
    let myFlighthtml = myflight.flight.html()
  })
}
