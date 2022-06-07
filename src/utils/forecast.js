require('dotenv').config();
const request = require('postman-request');

const forecast = (coordinates, callback) => {
    const coordinateQuery = coordinates.latitude + ',' + coordinates.longitude;
    const options = {
        url: 'http://api.weatherstack.com/current?access_key=' + process.env.WEATHERSTACK_API_KEY + '&query=' + coordinateQuery,
        json: true,
    };

    request(options, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined);
        } else if (body.error) {
            callback('Unable to get forecast information. Please try another search', undefined);
        } else {
            const data = body.current;
            callback(undefined, {
                temperature: data.temperature,
                feelslike: data.feelslike,
                weather_desc: data.weather_descriptions,
                humidity: data.humidity,
            });
        }
    });
};

module.exports = {
    forecast,
};