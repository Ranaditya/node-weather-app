const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')
const { response } = require('express')

const port = process.env.PORT || 3000

//create the express application
const app = express()

//Mount static document directory to express app
const publicDirPath = path.join(__dirname, '../public')
app.use(express.static(publicDirPath))

//Set handlebar as the application view engine and its path
app.set('view engine', 'hbs')
const viewPath = path.join(__dirname, '../templates/views')
app.set('views', viewPath)
//set handlebar partials
const partialPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('index', {
        'title': 'Main',
        'weatherText': 'Application for weather',
        'footer': 'Created by Rana'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        footer: 'Created by Rana'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Help for application',
        footer: 'Created by Rana'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.status(404).send({
            error: 'No address is provided'
        })
    }
    console.log(address)
    //call weather API to get the details
    geocode(address, (error, { latitude, longitude } = {}) => {
        if (error) {
            console.log(error)
            return res.status(404).send({
                error: error
            })
        } else {
            forecast(latitude, longitude, (error, data) => {
                if (error) {
                    console.log(error)
                    return res.status(404).send({
                        error: error
                    })
                } else {
                    const { weather_descriptions, temperature, feelslike, humidity, cloudcover } = data.current
                    console.log('Weather condition is ' + weather_descriptions[0])
                    console.log('Current temp is ', temperature, 'but feels like ', feelslike)
                    return res.status(200).send({
                        forecast: weather_descriptions[0],
                        temperature: temperature,
                        feelslike: feelslike,
                        address: address,
                        humidity: humidity,
                        cloudcover: cloudcover
                    })
                }
            })
        }
    })
})


//route to handle error items for help
app.get('/help/*', (req, res) => {
    res.render('404', {
        'title': 'Page not found',
        'errorText': 'Help article not found',
        'footer': 'Create by Rana'
    })
})

//route to handle any generic 404 error
app.get('*', (req, res) => {
    res.render('404', {
        'title': 'Page not found',
        'errorText': 'No such page in application',
        'footer': 'Create by Rana'
    })
})

app.listen(port, () => {
    console.log('Server has started on port ', port)
})