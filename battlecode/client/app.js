$(document).ready( function() {

	

	var socket = io();

	var myCodeMirror = CodeMirror.fromTextArea(document.getElementById('play0Code'), {
		mode: "javascript"
	});

	var myCodeMirror = CodeMirror.fromTextArea(document.getElementById('play1Code'), {
		mode: "javascript"
	});







	

	$('.play0, .play1').keyup(function(event) {
		if(event.keyCode === 13) {
			var $this = $(this);
			socket.emit('enterKeyed', $this.val() );
		}
	});

	socket.on('playId', function(message) {
		$('.playName').html(message);
	})

	socket.on('lineFrom0', function(val) {
		$('.play0').val(val);
	});
	socket.on('lineFrom1', function(val) {
		$('.play1').val(val);
	});

	socket.on('winner', function(val) {
		alert(val);
	});

	$('.submit0').on('click', function() {
		var code = $('#play0Code').val()
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
		var code = $('#play1Code').val()
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
