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

//each socket will be assigned an id of 0 or 1 and
//assigned a roomnumber as needed with no upper limit
var currentRoom = new Room(0);
var personId = 0;
var emptyRooms = []; 


module.exports = function(Server) {
	var io = require('socket.io')(Server);

	io.on('connection', function(socket) {
		var currPerson;
    //Each socket is assigned a person object
    //and a room object. Each room can only have two
    //users, player0 and player1. The if conditional
    //first checks to see if there are empty rooms (pushed
    //when a user disconnects) and assigns the socket there (Note
    //this behavior has been slightly glitchy). If not, then
    //a new Person is created, assigned to the current room,
    //and then we check to see if a new room needs to be corrected
    //by seeing if the new personID is greater than 1
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


    //Emit a setup message to tell the socket its personId and room number	
		socket.emit('setup', socket.person.id, socket.room.num);
		
    //If we detect a code entered message, we broadcast it to the other client
    //in the room, telling it which personID the message came from and the code that
    //was sent in the message
		socket.on('codeEntered', function(val) {
			socket.to(socket.room.roomname).broadcast.emit('codeFrom' + socket.person.id, val);
		})

	  //If we detect a winner message, we broadcast it to the other client in the room
    //to let them know a winner has been chosen. The val should be the personID
		socket.on('winner', function(val) {
			socket.to(socket.room.roomname).broadcast.emit('winner', 'Player ' + val + ' won!');
		})

    //If we detect a disconnect from a socket, we add an object to emptyRooms array
    //which corresponds to the emptyID and emptyRoom
		socket.on('disconnect', function() {
			emptyRoom = socket.person.room;
			emptySlot = socket.person.id;
			emptyRooms.push({room: emptyRoom, id: emptySlot});
		})

    //If we detect a kick to player0, we check to make sure it came from player1 then send
    //it to both clients, to ensure that both see flipped screens and not just one
		socket.on('kick0', function() {
			if(socket.person.id === 1) {
				io.to(socket.room.roomname).emit('kicked0')
			}
		});

    //Same as above but for player1 kick instead
		socket.on('kick1', function() {
			if(socket.person.id === 0) {
				io.to(socket.room.roomname).emit('kicked1')
			}
		});

    //When a user has sent a 'username' message, we see which personId it matches and then
    //assign the username to the correct person in the matching room object. We then broadcast
    //the 'player0' message to the other client and, if there exist another client in the room
    //we also broadcast their uername so the newly named socket can get it as well
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
