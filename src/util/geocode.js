const request = require('request')

const geocode = (location, callabck) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoicmFuYWRpdHlhIiwiYSI6ImNram4wZDl0YzVvcnAycm5xdThseHNxbnAifQ.YBV2hMlYsOfq7LbuPZVHJQ&limit=1'
    request({ url, json: true }, (error, response) => {

        if (error) {
            callabck('Something went wrong, try sometimes later!', undefined)
        }
        else if (response.body.features.length === 0) {
            callabck('Something went wrong, no result found. Search again with proper location', undefined)
        } else {
            const { center = {} } = response.body.features[0]
            console.log(location, ' latitude & longitude are ', center[1], ' and ', center[0])
            callabck(undefined, {
                latitude: center[1],
                longitude: center[0]
            })
        }
    })
}

module.exports = geocode