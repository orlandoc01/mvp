var express = require('express');


var clients = [];
var startIndex = 0;

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


require(__dirname + '/serverConfig/middleware.js')(app, express);
require(__dirname + '/serverConfig/routes.js')(app, express);

io.on('connection', function(socket) {
	console.log('a user connected');
	clients.push(socket);
	socket.clientIndex = startIndex++;
	socket.on('enterKeyed', function(val) {
		console.log('submitted from user ' + socket.clientIndex);
		socket.broadcast.emit('lineFrom' + socket.clientIndex, val);

	})
});

server.listen(3000, function() {
	console.log('listening on 3000');
});
