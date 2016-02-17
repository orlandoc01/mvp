var morgan = require('morgan');
var bodyParser = require('body-parser');


module.exports = function(app, express) {
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/../views');
	app.use(express.static(__dirname + '/../public'))
}