var net = require('net');

var room = [];
var server = net.createServer(function (connection) {
  console.log('Connection is up and running');
  room.push(connection);

  connection.on('end', function () {
    console.log('Connection closed');
  });

  connection.on('data', function (data) {
    var command = data.toString();
    console.log(command);
    if(command == "quit\r\n") {
      console.log('woot');
      connection.end();
    }
  });

  connection.write("Hello random person\r\n");
  connection.write("There are " + room.length + " people in the room right now\r\n");
  room.forEach(function (person) {
    connection.pipe(person);
    person.pipe(connection);
  });
});
server.listen(1337, function () {
  console.log('Server is running. To connect type this in - telnet localhost 1337');
});
