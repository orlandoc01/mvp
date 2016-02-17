$(document).ready( function() {
  //Create socket instance and prompt for username
	var socket = io();
	var kicksRemaining = 2;
	var username = prompt('Please enter a username');

  //Once username is created, emit a message to the server with the new name
	socket.emit('username', username);

	//Create code mirrors
	var cm0 = CodeMirror.fromTextArea(document.getElementById('play0Code'), {
		mode: "javascript",
	});

	var cm1 = CodeMirror.fromTextArea(document.getElementById('play1Code'), {
		mode: "javascript",
	});

	//When the socket receives the setup message from the server, it knows
  //to expect an id and room number and displays the right prompt and
  //disables the opponents buttons with this info
	socket.on('setup', function(id, roomNum) {
		var message = "You are player " + id + " in room " + roomNum;
		var oppID = !id * 1;
		console.log('oppID is ' + oppID);
		$('.playName').html(message);
		$('.submit' + oppID + ',.kick' + id).prop('disabled', true);
	})

  //When the socket receives a messag from the server, indicating that code
  //has been submitted, it sets the corresponding codeMirrors value to the new code
	socket.on('codeFrom0', function(val) {
		cm0.setValue(val);
	});

	socket.on('codeFrom1', function(val) {
		cm1.setValue(val);
	});

  //When a keyup event occurs in the codeMirror, the socket emits a message to the server
  //letting them know new code's been entered. Note that adding code to your opponents
  //CM will trigger this event as well, but the server will simply send it back to you
	cm0.on('keyup', function(e) {
		socket.emit('codeEntered', e.getValue());
	})

	cm1.on('keyup', function(e) {
		socket.emit('codeEntered', e.getValue());
	})
	
	//Submitting functionality implemented here below
  //If the user got back a 1 in the first element of the data array, it means they
  //won and a winner message is emitted to the server
	$('.submit0').on('click', function() {
		var code = cm0.getValue();
		$.post('/submit0', {code: code}, function(data) {
			if(data[0] === 1) {
				socket.emit('winner', 0);
				alert('Success. You win!');
			} else {
				var display = data[1];
				if(data[2]) {
					display = display + '<br>Console Output: ' + data[2];
				}
				$('.play0result').html(display);
			}
		});
	});

	$('.submit1').on('click', function() {
		var code = cm1.getValue();
		$.post('/submit1', {code: code}, function(data) {
			if(data[0] === 1) {
				socket.emit('winner', 1);
				alert('Success. You win!')
			} else {
				var display = data[1];
				if(data[2]) {
					display = display + '<br>Console Output: ' + data[2];
				}
				$('.play1result').html(display);
			}

		})
	})

  //If the socket heard a winner message from the server, it sends an alert
  //with the val (meaning that socket must not have won
	socket.on('winner', function(val) {
		alert(val);
	});

	//Kicking functionality implemented here below
	var spinCodeMirror = function($codeMirror) {
		$codeMirror.css('transform', 'rotate(180deg)');
		setTimeout(function() {
			$codeMirror.css('transform', 'rotate(0deg)')
		}, 10000);
	}

  //If the kick button is clicked, the socket emits a message to let them know
  //that player was kicked
	$('.kick0').on('click', function() {
		if(kicksRemaining > 0) {
			$(this).html("Kick Player 0 \n(" + (--kicksRemaining) + " remaining)")
			socket.emit('kick0');
		}
	});

	$('.kick1').on('click', function() {
		if(kicksRemaining > 0) {
			$(this).html("Kick Player 1 \n(" + (--kicksRemaining) + " remaining)")
			socket.emit('kick1');
		}
	});

  //If the socket receives a kicked message, it spins the code mirror
	socket.on('kicked0', function() {
		var $codeMirror = $('.CodeMirror.cm-s-default').first();
		spinCodeMirror($codeMirror);
	});

	socket.on('kicked1', function() {
		var $codeMirror = $('.CodeMirror.cm-s-default').last();
		spinCodeMirror($codeMirror);
	});

	//player0/1 mesage is received when user joins, this renders their username
  //for the other client
	socket.on('player0', function(name) {
		$('#player0').html('Player 0: ' + name);
	});

	socket.on('player1', function(name) {
		$('#player1').html('Player 1: ' + name);
	})

});
