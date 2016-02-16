//var request = require('request');

module.exports = function(app, express) {
	
	app.get('/', function(req, res) {
		res.render('index');
	});

	app.post('/submit0', function(req, res) {
		res.send(req.body);
	});

	app.post('/submit1', function(req, res) {
		res.send(req.body);
	})

}