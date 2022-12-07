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

// Route to weather page
app.get('/login/weather', function(req, res) {
    res.render('index', { weather: null, error: null });
});

// App displays data from the OpenWeather API
app.post('/login/weather', function(req, res) {

    // Get city name 
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
            //Body represents the data fetched, and we will parse it into a variable called "weather"
            let weather = JSON.parse(body);

            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                // Use the data received to set up our output
                    place = `${weather.name}, ${weather.sys.country}`,
                    weatherTimezone = `${weather.timezone}`;
                    weatherTemp = `${weather.main.temp}`,
                    //Weather icon (from API)
                    weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                    weatherDescription = `${weather.weather[0].description}`,
                    clouds = `${weather.clouds.all}`,
                    main = `${weather.weather[0].main}`,
                    weatherFeelTemp = `${weather.main.feels_like}`,
                    low = `${weather.main.temp_min}`,
                    high = `${weather.main.temp_max}`,
                    windspeed = `${weather.wind.speed}`,
                    humidity = `${weather.main.humidity}`,
                    // must convert from unix utc to timezone
                    sunrise = `${weather.sys.sunrise}`,
                    sunset = `${weather.sys.sunset}`,

                    //Calculated variables
                    weatherFahrenheit = ((weatherTemp * 9 / 5) + 32);
                    weatherFahrenheitFeel = ((weatherFeelTemp * 9 / 5) + 32);
                    fahrenheitLow = ((low * 9 / 5) + 32);
                    fahrenheitHigh = ((high * 9 / 5) + 32);
                    mphWind = (windspeed * 2.23694);

                // Round off the value of the degrees fahrenheit calculated into two decimal places
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