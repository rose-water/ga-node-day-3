const SerialPort = require("serialport");
const express    = require('express');
const app        = express();
const server     = app.listen(3001);
const io         = require('socket.io')(server);

const port = new SerialPort('/dev/tty.usbmodem141101', {
  baudRate: 9600
});

port.on('open', function() {
  console.log('Port open');
});

port.on('data', function(data) {
  // console.log(data);
  // console.log(data.toJSON());
  console.log(data.toString('utf8'));
  io.sockets.emit('mysocket', data);
});