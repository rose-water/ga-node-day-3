// Credit to Mark Hellar for this code example.
const express = require('express');
const bart    = require('bart').createClient({"interval": 20000});
const app     = express();
const PORT    = 3000;

// tell our app where to serve our static files
app.use(express.static('public'));

// define a route - what happens when people visit /
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// tell our app where to listen for connections
var server = app.listen(PORT);
var io = require('socket.io')(server);

bart.on('embr', function(times){
  // console.log(estimates);
  console.log("BART data received");
  io.sockets.emit("stationUpdate", times);
});