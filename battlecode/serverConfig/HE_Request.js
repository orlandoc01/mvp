var CLIENT_SECRET = '65b5102503d48ce78eaccc72a26186f815da491f';
var CLIENT_ID = '0dd3ce63abb7e569b3e1a6181e40b837b89eaab04fc6.api.hackerearth.com';
var RUN_URL = 'http://api.hackerearth.com/code/run/';
var request = require('request');

module.exports.runCode = function(code, lang) {
	console.log('secret is ' + CLIENT_SECRET);
	var data = {
		'client_id': CLIENT_ID,
		'client_secret': CLIENT_SECRET,
		'async': 1,
		'source': code,
		'lang': lang || 'JAVASCRIPT',
		'time_limit': 5,
		'memory_limit': 262144,
	};

	request.post(RUN_URL, data, function(error1, success) {
		console.log('got a response');
		console.log(success.body);

		//console.log(sucess.body);
	});
}


module.exports.testCode = function() {
	module.exports.runCode('console.log("TESTING");', 'JAVASCRIPT');
}