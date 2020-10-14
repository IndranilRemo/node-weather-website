console.log('Client side javascript file loaded!')


// http://puzzle.mead.io/puzzle
var loc = document.querySelector('#location')
var weatherForm = document.querySelector('form')
var forcastLocation = document.querySelector('.forecastLocation')
var forecastDetails =  document.querySelector('.forecastDetails')
var error =  document.querySelector('.error')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    var url = 'http://localhost:3000/weather?address='+loc.value
    forcastLocation.textContent = 'Loading...'
    forecastDetails.textContent = ''
    error.textContent = ''
    fetch(url).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            forcastLocation.textContent = ''
            error.textContent=data.error
        } else {
            forcastLocation.textContent = 'Location : '+data.location
            forecastDetails.textContent = 'Forecast : '+data.forecast
        }
    })
})
})