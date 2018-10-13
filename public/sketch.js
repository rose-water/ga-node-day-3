var socket = io.connect('//localhost:3000');
socket.on('stationUpdate', function(data) {
  var markup = data.map(function(element){
    return `
      <div class="trainDiv">  
        <p>Destination: ${element.destination}</p>
        <p>Direction: ${element.direction}</p>
        <p>Arrives in: ${element.minutes} minutes</p>
      </div>
      `;
  }).join("");

  document.getElementById("myDiv").innerHTML = markup;  
});
socket.on('error', function() {
  console.error(arguments)
});