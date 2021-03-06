console.log('client side javascript....')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherText1 = document.querySelector('#weatherText1')
const weatherText2 = document.querySelector('#weatherText2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    weatherText1.textContent = 'Loading...'
    weatherText2.textContent = ''

    const location = search.value
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                weatherText1.textContent = data.error
                weatherText2.textContent = ''
            } else {
                console.log(data.forecast)
                console.log(data.temperature)
                console.log(data.feelslike)
                console.log(data.address)
                weatherText1.textContent = 'Forecast for ' + data.address + ' : ' + data.forecast
                weatherText2.textContent = 'Temperature is ' + data.temperature + ', feels like ' + data.feelslike + ', humidity is ' + data.humidity + ' with cloud cover ' + data.cloudcover
            }
        })
    })
})