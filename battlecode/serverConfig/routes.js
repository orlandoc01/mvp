//var request = require('request');
var checkCode = require('./checkCode.js').checkCode;


module.exports = function(app, express) {
	
	app.get('/', function(req, res) {
		res.render('index');
	});

	app.post('/submit0', function(req, res) {
		var playerId = req.path[req.path.length - 1];
		checkCode(req.body.code, playerId, function(err, result) {
			if(err) {
				res.send([0,'Your code caused an error. Check your syntax']);
			} else {
				console.log('result is' + JSON.stringify(result));
				res.send(result);
			}
		})
	});

	app.post('/submit1', function(req, res) {
		checkCode(req.body.code, playerId, function(result) {
			if(err) {
				res.send([0,'Your code caused an error. Check your syntax']);
			} else {
				console.log('result is' + JSON.stringify(result));
				res.send(result);
			}
		})
	});
}