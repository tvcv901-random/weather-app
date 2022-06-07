const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { forecast } = require('./utils/forecast.js');
const { geocode } = require('./utils/geocode.js');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Chandra Vamsi',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather App',
        name: 'Chandra Vamsi',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Chandra Vamsi',
        text: 'some helpful text',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'address is required'
        });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast({ latitude, longitude }, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location: { latitude, longitude, location },
                address: req.query.address,
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('help_404', {
        name: 'Chandra Vamsi',
        title: 'Help article not found',
    });
});


app.get('*', (req, res) => {
    res.render('404', {
        name: 'Chandra Vamsi',
        title: '404 Error',
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});