const request = require('request');

const weatherMap = (latitude,longitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=6c085dada30ec27b370a3365e5465783';
   
    request({url, json: true}, (error, {message, body}) => {
        if (error) {
            callback('Unable to connect weather services',undefined);
        }
        else if (message) {
            callback('Unable to find the location',undefined);
        }
        else {
            callback(undefined,'It is ' + body.weather[0].description + '. The latitude is: ' + body.coord.lat + '. The longitude is: ' + body.coord.lon + '.')
        }
    })
}

module.exports = weatherMap;
