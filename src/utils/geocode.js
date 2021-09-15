const request = require('postman-request');

const geocode = (address, callback) => {
  const geo_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibG91aXNlbGFsYSIsImEiOiJja3RjdXJhNDMyOWxiMm9qcHpnNXpjOWZrIn0.9-lizbgvEtQSR1xtLIr20w'
  request(geo_url, function(error, response, body){
    if (error) {
      callback('Unable to connect to location services', undefined)
    } else if (response.body === '{"message":"Not Found"}' || response.body.error) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      const data = JSON.parse(body);
      callback(undefined, {
        longitude: data.features[0].geometry.coordinates[0] ? data.features[0].geometry.coordinates[0] : '',
        latitude: data.features[0].geometry.coordinates[1] ? data.features[0].geometry.coordinates[1] : '',
        location: data.features[0].place_name ? data.features[0].place_name : ''
      })
    }
  })
}

module.exports = geocode