function Room(num) {
	this.num = num;
	this[0] = null;
	this[1] = null;
	this.roomname = "Room " + this.num;
}

function Person(id) {
	this.id = id;
	this.room = null;
	this.username = null;
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
			socket.room = fillingRoom.room;
			socket.join(fillingRoom.room.roomname);

		} else {
			currPerson = new Person(personId);
			currPerson.room = currentRoom;
			currentRoom[personId] = currPerson;
			personId++;

			socket.person = currPerson;
			socket.room = currentRoom;
			socket.join(currentRoom.roomname);
			

			if(personId > 1) {
				personId = 0;
				lastRoomNum = currentRoom.num;
				currentRoom = new Room(lastRoomNum + 1);
			}
		}

		var message = socket.person.id > 1 ? "You are spectating" : 
																					"You are player " + socket.person.id
																					+ " in room " + socket.room.num;
		socket.emit('setup', socket.person.id, socket.room.num);
		

		socket.on('codeEntered', function(val) {
			socket.to(socket.room.roomname).broadcast.emit('codeFrom' + socket.person.id, val);
		})

		
		socket.on('winner', function(val) {
			socket.to(socket.room.roomname).broadcast.emit('winner', 'Player ' + val + ' won!');
		})

		socket.on('disconnect', function() {
			emptyRoom = socket.person.room;
			emptySlot = socket.person.id;
			emptyRooms.push({room: emptyRoom, id: emptySlot});
		})

		socket.on('kick0', function() {
			if(socket.person.id === 1) {
				io.to(socket.room.roomname).emit('kicked0')
			}
		});

		socket.on('kick1', function() {
			if(socket.person.id === 0) {
				io.to(socket.room.roomname).emit('kicked1')
			}
		});

		socket.on('username', function(name) {
			var id = socket.person.id;
			if(id === 0) {
				socket.person.username = name;
				io.to(socket.room.roomname).emit('player0', name);
				socket.room[1] ? io.to(socket.room.roomname).emit('player1', socket.room[1].username) : null;
			} else if (id === 1) {
				socket.person.username = name;
				io.to(socket.person.room.roomname).emit('player1', name)
				socket.room[0] ? io.to(socket.room.roomname).emit('player0', socket.room[0].username) : null;
			}
		})
	});
}