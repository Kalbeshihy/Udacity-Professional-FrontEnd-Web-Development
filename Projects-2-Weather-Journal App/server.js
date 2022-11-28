/* Require Packages */
// Require cors to Enable All CORS Requests.
const cors = require("cors");
// Require Express to run server and routes.
const express = require("express");
// Require body-parser to Access JSON data Sent From The Clint
const bodyParser = require("body-parser");

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable All Cors Requests
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Get All Data By '/getAll'
app.get("/getall", (req, res) => {
  res.send(projectData).status(200);
});

// Callback function to complete POST Data
app.post("/postData", (req, res) => {
  // Post Data
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    content: req.body.content,
  };
  console.log(projectData);
  res.send(projectData).status(200);
});

// Listen To Port
const port = 4800;

// Function To Test Server
const listening = () => {
  console.log(`Server Running at: http://localhost:${port}/`);
};

// Spin up the server
app.listen(port, listening);
