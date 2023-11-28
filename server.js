const express = require('express');
const path = require('path');
const Parse = require('parse/node');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

Parse.initialize('HrREP8UXPi4ZBhCDpUgLLecqSdvtPeNtM32djPoN', 'nCL56DiXqtnH9SHx2H3WmZe4NILi1PkdnjmvRXuB');
Parse.serverURL = 'https://parseapi.back4app.com/';


// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Update this with your front-end domain
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // Add the following line to expose headers
  res.header('Access-Control-Expose-Headers', 'Content-Length, Content-Type, X-Parse-Session-Token');

  next();
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Landing Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'landing-page.html'));
});

// Dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// User Profile
app.get('/user-profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'user-profile.html'));
});

// User Registration
app.get('/user-registration', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'user-registration.html'));
});

// Task List
app.get('/task-list', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'task-list.html'));
});

// Add Task
app.get('/add-task', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'add-task.html'));
});

// Password Reset
app.get('/password-reset', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'password-reset.html'));
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
