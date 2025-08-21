let express = require('express');
let app = express();
let bodyParser = require('body-parser');
require('dotenv').config();

// Root-level logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Serve static assets
app.use("/public", express.static(__dirname + "/public"));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: false }));

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

//Build an echo server, mounted at the route GET /:word/echo. Respond with a JSON object, taking the structure {echo: word}. You can find the word to be repeated at req.params.word. You can test your route from your browser's address bar, visiting some matching routes, e.g. your-app-rootpath/freecodecamp/echo.
app.get('/:word/echo', (req, res) => {
  res.json({ echo: req.params.word });
});

//Build an API endpoint, mounted at GET /name. Respond with a JSON document, taking the structure { name: 'firstname lastname'}. The first and last name parameters should be encoded in a query string e.g. ?first=firstname&last=lastname.
app.get('/name', (req, res) => {
  res.json({ name: `${req.query.first} ${req.query.last}` });
});


module.exports = app;
