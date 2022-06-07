require('dotenv').config();
const request = require('postman-request');

const geocode = (address, callback) => {
    const options = {
        url: 'http://api.positionstack.com/v1/forward?access_key=' + process.env.POSITIONSTACK_API_KEY + '&query=' + encodeURIComponent(address),
        json: true,
    };

    request(options, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined);
        } else if (body.data.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            const data = body.data;
            callback(undefined, {
                latitude: data[0].latitude,
                longitude: data[0].longitude,
                location: data[0].name,
            });
        }
    });
};

module.exports = {
    geocode,
};