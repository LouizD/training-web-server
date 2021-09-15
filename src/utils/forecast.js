const request = require('postman-request');

const forecast = (long, latt, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=00eded832754a3799af28dcc5eb256d0&query=' + latt + ',' + long
  request(url, function(error, response, body){
    if (error) {
      callback('Unable to connect to location services', undefined)
    } else if (response.body === '{"message":"Not Found"}') {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      const data = JSON.parse(body);
      const { location, current } = data
      const { name } = location
      const { temperature, feelslike, weather_descriptions } = current

      callback(undefined, {
        location: name,
        currentTemperature: temperature,
        currentFeeledTemperature: feelslike,
        currentForecast: weather_descriptions[0]
      })
    }
  })
}

module.exports = forecast