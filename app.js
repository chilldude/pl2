// The App
var express = require("express");
var app = express();
// Use static middleware
app.use(express.static(__dirname + '/public'));
// Set the view engine
app.set('view engine', 'jade');

// Set the directory that contains the views
app.set('views', __dirname + '/views');
app.use(function (req, res, next) {
  // Variable
  res.locals.variable = 'foobar';

  // Function
  res.locals.function = function (param) {
    return param + req.url;
  };

  next();
});
// Use the router middleware
app.use(app.router);
// Get route with one middleware
app.get("/", function (req, res) {
  res.send("root");
});
// Create HTTP server with your app
var http = require("http");
var server = http.createServer(app)

// Listen to port 3000
server.listen(3000, function(){
  console.log('server started on port 3000');
});