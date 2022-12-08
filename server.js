const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

// Configure dotenv package
require('dotenv').config();

// Set up openweathermap API_KEY
const apiKey ='c6f3dd6a279dad951573ece474bbc4ab';

// Set up express app and body-parser configurations
// Set up javascript template view engine
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Route to Homepage
app.get('/weatherfy', (req, res) => {
    res.sendFile(__dirname + '/login/static/index.html');
});

// Route to Login Page
app.get('/weatherfy/login', (req, res) => {
    res.sendFile(__dirname + '/login/static/login.html');
});

// Route to Weather Page
app.get('/weatherfy/login/weather', function(req, res) {
    res.render('index', { weather: null, error: null });
});

// App displays Current Weather Data from the OpenWeather API
app.post('/weatherfy/login/weather', function(req, res) {

    // Get city name 
    let city = req.body.city;

    // Use that city name to fetch data
    // Use the API_KEY
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // Request for data using the URL
    request(url, function(err, response, body) {

        // On return, check the json data fetched
        if (err) {
            // Display error message if there is no such url            
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            //Body represents the data fetched, and we will parse it into a variable called "weather"
            let weather = JSON.parse(body);

            if (weather.main == undefined) {
                // Display error message if there is no defined data in main
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                    // Use the data received to set up our output
                    place = `${weather.name}, ${weather.sys.country}`,
                    weatherTimezone = `${weather.timezone}`;
                    main = `${weather.weather[0].main}`,
                    // Must convert from Celsius to Fahrenheit
                    weatherTemp = `${weather.main.temp}`,
                    weatherFeelTemp = `${weather.main.feels_like}`,
                    low = `${weather.main.temp_min}`,
                    high = `${weather.main.temp_max}`,
                    // Weather icon (from API)
                    weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                    // General weather condition
                    weatherDescription = `${weather.weather[0].description}`,
                    // More details on weather condition
                    clouds = `${weather.clouds.all}`,
                    windspeed = `${weather.wind.speed}`,
                    humidity = `${weather.main.humidity}`,
                    // Must convert from unix utc to timezone
                    sunrise = `${weather.sys.sunrise}`,
                    sunset = `${weather.sys.sunset}`,

                    // Calculated variables
                    // Celsius to Fahrenheit
                    weatherFahrenheit = ((weatherTemp * 9 / 5) + 32);
                    weatherFahrenheitFeel = ((weatherFeelTemp * 9 / 5) + 32);
                    fahrenheitLow = ((low * 9 / 5) + 32);
                    fahrenheitHigh = ((high * 9 / 5) + 32);
                    // m/s to mph
                    mphWind = (windspeed * 2.23694);

                // Round off calculation to two decimal places
                function roundToTwo(num) {
                    return +(Math.round(num + "e+2") + "e-2");
                }
                //Round the temperature variables
                weatherFahrenheit = roundToTwo(weatherFahrenheit);
                weatherFahrenheitFeel = roundToTwo(weatherFahrenheitFeel);
                fahrenheitLow = roundToTwo(fahrenheitLow);
                fahrenheitHigh = roundToTwo(fahrenheitHigh);
                mphWind = roundToTwo(mphWind);

                // Convert from unix to standard clock time and date
                function unixToClock(num) {
                    let date = new Date((num * 1000));
                    let AMorPM = " AM";
                    let hours = date.getHours();
                    // Get hours, mins, secs
                    let mins = '0' + date.getMinutes();
                    let secs = '0' + date.getSeconds();
                    // Label PM if more than or equal to 12
                    if (hours > 12) {
                        hours -= 12;
                        AMorPM = " PM";
                    } else if (hours == 12) {
                        AMorPM = " PM";
                    }
                    // clock time
                    let clock = hours + ':' + mins.substr(-2) + ':' + secs.substr(-2) + AMorPM;
                    // day
                    const options = { weekday: "long" };
                    let day = new Intl.DateTimeFormat("en-US", options).format(date.getDay());
                    return clock + " on " + day;
                }
                //Convert sunrise and sunset times from seconds to standard clock time and date
                sunrise = unixToClock(sunrise);
                sunset = unixToClock(sunset);

                // Render the data to our page (index.ejs) before displaying it 
                res.render('index', { 
                    weather: weather, 
                    place: place, 
                    
                    sunrise: sunrise,
                    sunset: sunset,

                    temp: weatherTemp,
                    fahrenheit: weatherFahrenheit, 
                    feelTemp: weatherFeelTemp,
                    fahrenheitFeel: weatherFahrenheitFeel, 

                    low: low,
                    fahrenheitLow: fahrenheitLow,
                    high: high,
                    fahrenheitHigh: fahrenheitHigh,

                    icon: weatherIcon, 
                    description: weatherDescription,
                    clouds: clouds, 

                    windspeed: windspeed,
                    mphWind: mphWind,

                    humidity: humidity,

                    main: main, 
                    error: null });
            }
        }
    });
});

// Set up port configurations
app.listen(4000, function() {
    console.log('Weather app listening on port 4000!');
});
