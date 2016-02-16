var express = require('express');

var app = express();
var server = require('http').Server(app);

require(__dirname + '/serverConfig/middleware.js')(app, express);
require(__dirname + '/serverConfig/routes.js')(app, express);

require(__dirname + '/serverConfig/socketConfig.js')(server);

server.listen(3000, function() {
	console.log('listening on 3000');
});
