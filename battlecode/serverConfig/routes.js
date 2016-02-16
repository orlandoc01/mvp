//var request = require('request');
var checkCode = require('checkCode.js').checkCode();


module.exports = function(app, express) {
	
	app.get('/', function(req, res) {
		res.render('index');
	});

	app.post('/submit0', function(req, res) {
		checkCode(req.body.code, function(result) {
			req.send(result);
		})
	});

	app.post('/submit1', function(req, res) {
		checkCode(req.body.code, function(result) {
			req.send(result);
		})
	});
}