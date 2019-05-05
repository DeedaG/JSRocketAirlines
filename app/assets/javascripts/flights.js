$(function() {
  console.log("flights.js is loaded...")
  listenForClick()
});

function listenForClick() {
  $('button').on('click', function(event) {
    event.preventDefault()
    getFlights()
  })
}
