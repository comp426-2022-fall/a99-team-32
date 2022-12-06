//Login page for users to login
//Will allow users to type in the username and passcode
//Then will authenticate by checking against the correct username and passcode 
//Stored in the database

const express = require('express') // Include ExpressJS
const app = express() // Create an ExpressJS app
const bodyParser = require('body-parser'); // Middleware

app.use(bodyParser.urlencoded({ extended: false }));

// Route to Homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

//Route to Login Page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/static/login.html');
});

// Route to Weather Page
//app.get('/login', (req, res) => {
  //res.sendFile(__dirname + '../../views/index.html');
//});

//Route to Weather Page
//app.get('/login', (req, res) => {
  //res.sendFile('a99-team-32/views/index.html');
//});

app.post('/login', (req, res) => {
  // Insert Login Code Here
  let username = req.body.username;
  let password = req.body.password;
  res.send(`Username: ${username} Password: ${password}`);
});

const port = 3000 // Port we will listen on

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));