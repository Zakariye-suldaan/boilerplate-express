let express = require('express');
let app = express();
require('dotenv').config();

// Root-level logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Serve static assets
app.use("/public", express.static(__dirname + "/public"));

// Serve HTML file on root route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// JSON endpoint with env config
app.get("/json", (req, res) => {
  let response = { message: "Hello json" };
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response.message = response.message.toUpperCase();
  }
  res.json(response);
});

// In the route app.get('/now', ...) chain a middleware function and the final handler. In the middleware function you should add the current time to the request object in the req.time key. You can use new Date().toString(). In the handler, respond with a JSON object, taking the structure {time: req.time}.
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({ time: req.time });
});

module.exports = app;
