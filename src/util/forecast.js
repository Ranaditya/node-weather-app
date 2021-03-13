const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=afe2005733de7cc5604f1fef039a9cab&query=' + latitude + ',' + longitude
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Something went wrong, no access on weather API!', undefined)
        }
        else if (response.body.error) {
            callback('Something went wrong,' + response.body.error.info, undefined)
        } else {
            callback(undefined, response.body)
        }
    })
}

module.exports = forecast