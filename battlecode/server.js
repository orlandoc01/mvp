var express = require('express');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

require(__dirname + '/serverConfig/middleware.js')(app, express);
require(__dirname + '/serverConfig/routes.js')(app, express);

io.on('connection', function(socket) {
	console.log('a user connected');
})

app.listen(3000);

console.log('server listening on port 3000');

module.exports = app;
