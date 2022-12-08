# Weatherfy

## Summary 

Weatherfy is a web app that allows you to search for a location's weather in real-time. It utilizes the OpenWeather API to receive weather data from cities across the world. You will be able to see several weather varibles, including the real temperature, what it "feels like", weather conditions (like clouds, rain, clear sky), cloudcover, humidity, windspeed, sunrise, and sunset. 

What makes our app unique from other weather forecasting apps is that we added sunrise and sunset information, and also converted the timezones to the timezone of the user's laptop. That way, you can see the sunrise and sunset information for any city in terms of your own timezone.

## Our App

### Video Walkthrough

Link to [Demo video](https://www.youtube.com/watch?v=VICfSfzKCts&ab_channel=VR)

Link to [Demo slides](https://docs.google.com/presentation/d/1chkkYmoA3AEsBfhWS9rWX-g-OBA3enGbO928zLJ4X1s/edit?usp=sharing)

### Instructions for Use

1. Clone repository
2. Run npm install inside directory to install dependencies
3. Run `npm test` or `npm start` (node server.js) to start app
4. Search [localhost:4000/weatherfy](http://localhost:4000/weatherfy) on web browser (it listens on port 4000)
5. Click “LOG IN” for the login page
6. Put in username and password to login
7. Search for the real-time weather of the city
8. Press `CTRL + C` to stop app

## Documentation

### [Roles](https://github.com/comp426-2022-fall/a99-team-32/blob/main/docs/roles.md)

Shuyi  
- Review Manager - review pull requests to merge or reject them and manage the related discussions  
- Release Manager - manage the packaging and release process for your prototype package  
- Database Lead  

Kelly  
- Plan Manager - manage overall plan and keep the project tab/to-do list up to date  
- Documentation Manager - keep the documentation in order and identify what is missing and needs to be documented  
- Back End Lead  

Vidya  
- Project Manager - keep track of all the moving parts and make sure that everything that needs to happen is happening  
- Front End Lead  
- Design Lead  

### [Planning](https://github.com/comp426-2022-fall/a99-team-32/blob/main/docs/planning.md)

#### 12/03
- Brainstormed project ideas
- Decided on weather and geocoding APIs to create weather forecasting app
- Planned to-do list through project board

#### 12/04
- Decided on OpenWeather API, pulling from current weather data
- Figured out how the Current Weather Data API and Geolocating API work
- Created API key
- Decided on weather variables of interest
- Started on back end
- Started on database

#### 12/05
- Decide on design for front end
- Complete front page front end
- Add more weather variables

#### 12/06
- Complete login page front end
- Complete weather page front end
- Complete back end
- Complete database
- Check functionality and design on webbrowser

#### 12/07
- Clean up files, comments, and code
- Brainstorm future plans
- Film video

### [Future Plans](https://github.com/comp426-2022-fall/a99-team-32/blob/main/docs/futureplans.md)

#### Trip Planning
- Add future weather data
- Recommend what to wear and bring based on weather predictions

#### Account Creation and Information
- Allow users to sign up for their own account
- Add User Info page with information on user account name, their home location, and their saved locations
- Incorporate a database to save user information

### [API](https://github.com/comp426-2022-fall/a99-team-32/blob/main/docs/api%20documentation.md)

The webpage that documents the current weather data: [current weather API doc](https://openweathermap.org/current)

The webpage that documents the geocoding API: [geocoding API doc](https://openweathermap.org/api/geocoding-api)

#### API Endpoints
These are endpoints based off of `localhost:4000`.

#### `/weatherfy`

This is the home page. It gives users a brief description of our web app's purpose, which is to inform users of real-time weather.
From there, users can click on the log in button to go to the login page.

#### `/weatherfy/login`

This is the login page. User can enter their username and password.
After clicking the submit button, they move to the weather page.

#### `/weatherfy/login/weather`

This is the weather page. Users can type in a city at the search bar.
Once they click the Get Weather button, the weather information will appear below for their use.

### References

- [README.md writing and formatting](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
