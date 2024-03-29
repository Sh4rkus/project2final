// import libraries
var express = require('express'),
    ejs     = require('ejs'),
    bodyParser = require('body-parser');

// import routes
var routes = require('./controller/index');
var pokedex  = require('./controller/pokedex');

// initialize express web application framework
// http://expressjs.com/
var app = express();
app.use(express.static(__dirname + '/public'));

// these two lines replace bodyParser()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// configure static directory
app.use(express.static('public'));

//configure view rendering engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// subtitle values access via the header template
app.set('subtitle', 'Lab 16');

//configure routes
app.use('/', routes);
app.use('/pokedex', pokedex);

app.set('port', 8020);
app.listen(app.get('port'));
console.log("Express server listening on port", app.get('port'));