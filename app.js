// The App
var express = require("express");
var routes = require('./routes');
var stylus = require("stylus");
var nib= require("nib");
var app = express();
// Use static middleware
app.use(express.static(__dirname + '/public'));
// Set the view engine
app.set('view engine', 'jade');

//stylus
app.use(stylus.middleware({
  src: __dirname + '/public/stylesheets',
  compile: function(str, path) {
    return stylus(str)
      .set('filename', path)
      .set('compress', true)
      .use(nib());
  }
}));

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
// configure routes
app.get("/", routes.index);

// Create HTTP server with your app
var http = require("http");
var server = http.createServer(app)

// Listen to port 3000
server.listen(3000, function(){
  console.log('server started on port 3000');
});