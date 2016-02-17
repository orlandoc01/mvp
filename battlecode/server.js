var express = require('express');

var app = express();
var server = require('http').Server(app);

require(__dirname + '/serverConfig/middleware.js')(app, express);
require(__dirname + '/serverConfig/routes.js')(app, express);
require(__dirname + '/serverConfig/socketConfig.js')(server);
//Above files configure everyting on the server. Clientside is configured in app.js in public

server.listen(3000, function() {
	console.log('listening on 3000');
});
