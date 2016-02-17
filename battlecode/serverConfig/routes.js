//var request = require('request');
var checkCode = require('./checkCode.js').checkCode;
var EJS = require('ejs');
var fs = require('fs');
var Promise = require('bluebird');
Promise.promisifyAll(fs);


module.exports = function(app, express) {
  //making a get request to the index must render the index.ejs file with the appopriate prompt,
  //and code template. Getting the files from room1 and then injecting them into the ejs template
  //as a data object ensure they are rendered properly
	app.get('/', function(req, res) {
		fs.readFileAsync(__dirname + '/../battlefields/room1/prompt.txt', 'utf8')
		.then(function(prompt) {
			fs.readFileAsync(__dirname + '/../battlefields/room1/codeTemplate.js', 'utf8')
			.then(function(code) {
				var trimmedCode = code.trim();
				res.render('index', {prompt: prompt.trim(), code: code});
			});
		});
	});

  //Making a post request to either submit indicates code must be tested to ensure a succesful
  //submission. In the event of an error, a respons will also be sent
	app.post('/submit0', function(req, res) {
		var playerId = req.path[req.path.length - 1];
		console.log('code is ' + req.body.code);
		checkCode(req.body.code, function(err, result) {
			if(err) {
				var errorMesasge = 'Uh Oh ' + err;
				res.send([0, errorMesasge]);
			} else {
				console.log('result is' + JSON.stringify(result));
				res.send(result);
			}
		})
	});

	app.post('/submit1', function(req, res) {
		var playerId = req.path[req.path.length - 1];
		console.log('code is ' + req.body.code);
		checkCode(req.body.code, function(err, result) {
			if(err) {
				console.log('an error occured');
				res.send([0,'Your code caused an error. Check your syntax']);
			} else {
				console.log('result is' + JSON.stringify(result));
				res.send(result);
			}
		})
	});
}
