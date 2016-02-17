var fs = require('fs');
var requireUncached = require('require-uncached');



//Function below will verify submitted code passes
//Use requireUncached to ensure that any changes made to the file
//during a node session will be detected when exportin testCode()
module.exports.checkCode = function(code, callback) {
	var fileDir = __dirname + '/../battlefields/room1/';
	var filePath = fileDir + '/code.js';
	fs.writeFile(filePath, code, 'utf8', function(err) {
		if(err) {
			callback(err, null);
		} else {
			try {
				var result = requireUncached(fileDir + '/test.js').testCode()
				callback(null, result);
			} catch(e) {
				callback(e, null);
			}
		}
	})
};
