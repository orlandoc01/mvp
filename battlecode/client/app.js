$(document).ready( function() {

	var socket = io();
	var kicksRemaining = 2;
	var username = prompt('Please enter a username');

	socket.emit('username', username);

	//Create code mirrors
	var cm0 = CodeMirror.fromTextArea(document.getElementById('play0Code'), {
		mode: "javascript",
	});

	var cm1 = CodeMirror.fromTextArea(document.getElementById('play1Code'), {
		mode: "javascript",
	});

	//Socket assignment and connecting to eaach others code
	socket.on('playId', function(message) {
		$('.playName').html(message);
	})

	socket.on('codeFrom0', function(val) {
		cm0.setValue(val);
	});

	socket.on('codeFrom1', function(val) {
		cm1.setValue(val);
	});

	cm0.on('keyup', function(e,a,b) {
		socket.emit('codeEntered', e.getValue());
	})

	cm1.on('keyup', function(e,a,b) {
		socket.emit('codeEntered', e.getValue());
	})
	
	//Submitting functionality implemented here below
	$('.submit0').on('click', function() {
		var code = cm0.getValue();
		$.post('/submit0', {code: code}, function(data) {
			if(data[0] === 1) {
				socket.emit('winner', 0);
				alert('Success. You win!');
			} else {
				$('.play0result').html(data[1]);
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
				$('.play1result').html(data[1]);
			}

		})
	})
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

	socket.on('kicked0', function() {
		var $codeMirror = $('.CodeMirror.cm-s-default').first();
		spinCodeMirror($codeMirror);
	});

	socket.on('kicked1', function() {
		var $codeMirror = $('.CodeMirror.cm-s-default').last();
		spinCodeMirror($codeMirror);
	});

	//Username construction
	socket.on('player0', function(name) {
		$('#player0').html('Player 0: ' + name);
	});

	socket.on('player1', function(name) {
		$('#player1').html('Player 1: ' + name);
	})




});
