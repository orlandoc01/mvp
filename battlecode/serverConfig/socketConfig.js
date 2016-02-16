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


module.exports = function(Server) {
	var io = require('socket.io')(Server);

	io.on('connection', function(socket) {

		var currPerson;

		if (emptyRooms.length !== 0) {
			var fillingRoom = emptyRooms.shift();
			currPerson = new Person(fillingRoom.id);
			currPerson.room = fillingRoom.room;
			fillingRoom[fillingRoom.id] = currPerson;

			socket.person = currPerson;
			socket.join(fillingRoom.room.roomname);

		} else {
			currPerson = new Person(personId);
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
		}

		var message = socket.person.id > 1 ? "You are spectating" : 
																					"You are player " + socket.person.id
																					+ " in room " + socket.person.room.num;
		socket.emit('playId', message);
		
		socket.on('enterKeyed', function(val) {
			socket.to(socket.person.room.roomname).broadcast.emit('lineFrom' + socket.person.id, val);
		})
		
		socket.on('winner', function(val) {
			socket.to(socket.person.room.roomname).broadcast.emit('winner', 'Player ' + val + ' won!');
		})

		socket.on('disconnect', function() {
			emptyRoom = socket.person.room;
			emptySlot = socket.person.id;
			emptyRooms.push({room: emptyRoom, id: emptySlot});
			console.log('client disconnected');
		})
	});
}