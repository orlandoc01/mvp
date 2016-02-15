var express = require('express');

var app = express();

require(__dirname + '/serverConfig/middleware.js')(app, express);
require(__dirname + '/serverConfig/routes.js')(app, express);

app.listen(3000);

module.exports = app;
