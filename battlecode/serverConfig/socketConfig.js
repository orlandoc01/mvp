var clients = [];
var startIndex = 0;

module.exports = function(Server) {
	var io = require('socket.io')(Server);

	io.on('connection', function(socket) {
		
		console.log('a user connected');
		clients.push(socket);
		socket.clientIndex = startIndex++;
		var message = socket.clientIndex > 1 ? "You are spectating" : 
																					"You are player " + socket.clientIndex;

		socket.emit('playId', message);
		
		socket.on('enterKeyed', function(val) {
			socket.broadcast.emit('lineFrom' + socket.clientIndex, val);
		})
		
		socket.on('winner', function(val) {
			socket.broadcast.emit('winner', 'Player ' + val + ' won!');
		})
	});
}