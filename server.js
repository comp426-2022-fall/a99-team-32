// Require node_modules

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

// Configure dotenv package

require('dotenv').config();

// Set up our openweathermap API_KEY

const apiKey ='c6f3dd6a279dad951573ece474bbc4ab';

// Setup our express app and body-parser configurations
// Setup our javascript template view engine
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Route to Homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login/static/index.html');
});

//Route to Login Page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login/static/login.html');
});

// Setup our default display on launch
app.get('/login/weather', function(req, res) {

    // It shall not fetch and display any data in the index page
    res.render('index', { weather: null, error: null });
});

// On a post request, the app shall data from OpenWeatherMap using the given arguments
app.post('/login/weather', function(req, res) {

    // Get city name passed in the form
    let city = req.body.city;

    // Use that city name to fetch data
    // Use the API_KEY in the '.env' file
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // Request for data using the URL
    request(url, function(err, response, body) {

        // On return, check the json data fetched
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body);

            // We shall output it in the console just to make sure that the data being displayed is what we want
            console.log(weather);

            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                // we shall use the data got to set up our output
                let place = `${weather.name}, ${weather.sys.country}`,
                    /* We shall calculate the current timezone using the data fetched*/
                    weatherTimezone = `${weather.timezone}`;
                let weatherTemp = `${weather.main.temp}`,
                    /* We shall fetch the weather icon and its size using the icon data*/
                    weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                    weatherDescription = `${weather.weather[0].description}`,
                    clouds = `${weather.clouds.all}`,
                    main = `${weather.weather[0].main}`,
                    // added
                    weatherFeelTemp = `${weather.main.feels_like}`,
                    low = `${weather.main.temp_min}`,
                    high = `${weather.main.temp_max}`,
                    windspeed = `${weather.wind.speed}`,
                    // must convert from unix utc to timezone
                    sunrise = `${weather.sys.sunrise}`,
                    sunset = `${weather.sys.sunset}`,
                    // variables
                    weatherFahrenheit,
                    weatherFahrenheitFeel,
                    fahrenheitLow,
                    fahrenheitHigh;
                weatherFahrenheit = ((weatherTemp * 9 / 5) + 32);
                weatherFahrenheitFeel = ((weatherFeelTemp * 9 / 5) + 32);
                fahrenheitLow = ((low * 9 / 5) + 32);
                fahrenheitHigh = ((high * 9 / 5) + 32);
                mphWind = (windspeed * 2.23694);

                // We shall also round off the value of the degrees fahrenheit calculated into two decimal places
                function roundToTwo(num) {
                    return +(Math.round(num + "e+2") + "e-2");
                }
                weatherFahrenheit = roundToTwo(weatherFahrenheit);
                weatherFahrenheitFeel = roundToTwo(weatherFahrenheitFeel);
                fahrenheitLow = roundToTwo(fahrenheitLow);
                fahrenheitHigh = roundToTwo(fahrenheitHigh);
                mphWind = roundToTwo(mphWind);

                function unixToClock(num) {
                    let date = new Date((num * 1000));
                    let AMorPM = " AM";
                    let hours = date.getHours();
                    if (hours > 12) {
                        hours -= 12;
                        AMorPM = " PM";
                    } else if (hours == 12) {
                        AMorPM = " PM";
                    }
                    let mins = '0' + date.getMinutes();
                    let secs = '0' + date.getSeconds();
                    let format = hours + ':' + mins.substr(-2) + ':' + secs.substr(-2);
                    return format + AMorPM;
                }
                sunrise = unixToClock(sunrise);
                sunset = unixToClock(sunset);

                // We shall now render the data to our page (index.ejs) before displaying it out
                res.render('index', { 
                    weather: weather, 
                    place: place, 
                    
                    // timezone info for sunrise/sunset
                    //timezone: timezone,
                    //timezone_offset: timezone_offset,
                    sunrise: sunrise,
                    sunset: sunset,

                    // real and relative temp
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

                    main: main, 
                    error: null });
            }
        }
    });
});

// We shall set up our port configurations
app.listen(4000, function() {
    console.log('Weather app listening on port 4000!');
});