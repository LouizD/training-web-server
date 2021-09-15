const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require ('./utils/forecast');

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views',viewsPath )
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'Louise'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Louise'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Louise'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    res.send({
      error: 'No address provided',
    })
  } else {
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
      if (error) {
        return res.send({ error })
      }

      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error })
        }
        res.send({
          forecast: forecastData.currentForecast,
          location: location,
          address: req.query.address
        })
      })
    })
  }
})

app.get('/help/*', (req, res) => {
  res.render('page404', {
    text: 'Help article not found',
    title: 'Weather app',
    name: 'Louise'
  })
})

app.get("/products", (req,res) => {
  if (!req.query.search) {
    res.send({
      error: 'Yout must provide a search term'
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('*', (req, res) => {
  res.render('page404', {
    text: 'Page not found',
    title: 'Weather app',
    name: 'Louise'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})