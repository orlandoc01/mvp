//var request = require('request');
var checkCode = require('./checkCode.js').checkCode;


module.exports = function(app, express) {
	
	app.get('/', function(req, res) {
		res.render('index');
	});

	app.post('/submit0', function(req, res) {
		var playerId = req.path[req.path.length - 1];
		checkCode(req.body.code, playerId, function(result) {
			req.send(result);
		})
	});

	app.post('/submit1', function(req, res) {
		checkCode(req.body.code, playerId, function(result) {
			req.send(result);
		})
	});
}