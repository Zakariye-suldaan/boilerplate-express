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

module.exports = app;
