# API Documentation

The webpage that documents the current weather data: [current weather API doc](https://openweathermap.org/current)

The webpage that documents the geocoding API: [geocoding API doc](https://openweathermap.org/api/geocoding-api)

## API Endpoints
These are endpoints based off of `localhost:4000`.

### `/weatherfy`

This is the home page. It gives users a brief description of our web app's purpose, which is to inform users of real-time weather.
From there, users can click on the log in button to go to the login page.

### `/weatherfy/login`

This is the login page. User can enter their username and password.
After clicking the submit button, they move to the weather page.

### `/weatherfy/login/weather`

This is the weather page. Users can type in a city at the search bar.
Once they click the Get Weather button, the weather information will appear below for their use.
