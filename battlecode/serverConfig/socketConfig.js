var clients = [];
var startIndex = 0;

module.exports = function(Server) {
	var io = require('socket.io')(Server);

	io.on('connection', function(socket) {
		
		console.log('a user connected');
		clients.push(socket);
		socket.clientIndex = startIndex++;
		
		socket.on('enterKeyed', function(val) {
			console.log('submitted from user ' + socket.clientIndex);
			socket.broadcast.emit('lineFrom' + socket.clientIndex, val);
		})
		
		socket.on('winner', function(val) {
			socket.broadcast.emit('winner', 'Player ' + val + ' won!');
		})
	});
}