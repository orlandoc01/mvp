$(document).ready( function() {

	

	var socket = io();

	var cm0 = CodeMirror.fromTextArea(document.getElementById('play0Code'), {
		mode: "javascript",
		onChange: function(e) {
			console.log(e);
		}
	});

	var cm1 = CodeMirror.fromTextArea(document.getElementById('play1Code'), {
		mode: "javascript",
		onChange: function(e) {
			console.log(e);
		}
	});

	cm0.on('keyup', function(e,a,b) {
		console.log('change occured');
		socket.emit('codeEntered', e.getValue());
	})

	cm1.on('keyup', function(e,a,b) {
		console.log('change occured');
		socket.emit('codeEntered', e.getValue());
	})


	socket.on('playId', function(message) {
		$('.playName').html(message);
	})

	socket.on('codeFrom0', function(val) {
		cm0.setValue(val);
	});

	socket.on('codeFrom1', function(val) {
		cm1.setValue(val);
	});

	socket.on('winner', function(val) {
		alert(val);
	});

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
});
