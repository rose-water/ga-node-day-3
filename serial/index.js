const SerialPort = require("serialport");
const express = require('express');
const app = express();
const server = app.listen(3001);
app.use(express.static('public'));

const io = require('socket.io')(server);

const port = new SerialPort('/dev/tty.usbmodem141101', {
  baudRate: 9600
});

//Serve index.html when some make a request of the server
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

port.on('open', function() {
    console.log('Port open');
});

port.on('data', function(data) {
    // console.log(data.toJSON());
    // console.log(data);
    console.log(data.toString('utf8'));
    io.sockets.emit('mysocket', data);
});