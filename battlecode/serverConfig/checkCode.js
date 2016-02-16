var fs = require('fs');

module.exports.checkCode = function(code, playerID, callback) {
	var fileDir = __dirname + '../battlefields/room1/';
	var filePath = fileDir + '/code' + playerID + '.js';
	fs.writeFile(filePath, code, 'utf8', function(err) {
		if(err) {
			callback(err, null);
		} else {
			var result = require(fileDir + '/test' + playerID + '.js').testCode();
			callback(null, result);
		}
	})
};