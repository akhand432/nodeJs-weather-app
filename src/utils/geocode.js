const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZ2Vla3lzcHlkZXIiLCJhIjoiY2twcGYyY3M5MDFkbzJ3bzF2cm05Zm13aiJ9.am_LA5kOC9yXiMqJXNpkLA&limit=1'

    request({url, json: true},(error, {body}) => {
        if (error) {
            callback('Unable to connect weather services',undefined);
        }
        else if (body.features.length === 0) {
            callback('Unable to find the location',undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode;

