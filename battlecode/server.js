var express = require('express');

var app = express();

require('./serverConfig/middleware.js')(app, express);
//require('./serverConfig/routes.js')(app, express);

app.listen(3000);

module.exports = app;
