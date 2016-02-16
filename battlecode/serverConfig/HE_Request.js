var HackerEarth = require('hackerearth-node');
var request = require('request');

var CLIENT_SECRET = 'd246c10356414930c48fd6d7e4ea09ec0d8398b5';
var CLIENT_ID = 'a909c9e433318fc9cd5ff8c291fb2c449c0149930e04.api.hackerearth.com';
var RUN_URL = 'http://api.hackerearth.com/v3/code/run/';



module.exports.runCode = function(code, lang) {
	console.log('secret is ' + CLIENT_SECRET);
	var data = {
		//'client_id': CLIENT_ID,
		'client_secret': CLIENT_SECRET,
		'async': 0,
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