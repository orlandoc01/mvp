function Room(num) {
	this.num = num;
	this[0] = null;
	this[1] = null;
	this.roomname = "Room " + this.num;
}

function Person(id) {
	this.id = id;
	this.room = null;
}

var currentRoom = new Room(0);
var personId = 0;
var emptyRooms = []; 
var clients = [];


var startIndex = 0;

module.exports = function(Server) {
	var io = require('socket.io')(Server);

	io.on('connection', function(socket) {
		
		console.log('a user connected');
		clients.push(socket);

		var currPerson = new Person(personId);
		currPerson.room = currentRoom;
		currentRoom[personId] = currPerson;
		personId++;

		socket.person = currPerson;
		socket.join(currentRoom.roomname);
	

		if(personId > 1) {
			personId = 0;
			lastRoomNum = currentRoom.num;
			currentRoom = new Room(lastRoomNum + 1);
		}
		var message = socket.person.id > 1 ? "You are spectating" : 
																					"You are player " + socket.person.id
																					+ "in room " + socket.person.room.num;

			
		
		socket.emit('playId', message);
		
		socket.on('enterKeyed', function(val) {
			socket.broadcast.emit('lineFrom' + socket.clientIndex, val);
		})
		
		socket.on('winner', function(val) {
			socket.broadcast.emit('winner', 'Player ' + val + ' won!');
		})
	});
}