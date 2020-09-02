var express = require('express');
var argv = require('minimist')(process.argv.slice(2));
var bodyParser = require('body-parser');

var app = express();
app.enable('trust proxy');

/**
 * Set JSON response type
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
	res.setHeader('Content-Type', 'application/json');
	next();
});

/**
 * Set middleware for delay
 */
const delay = argv['delay'] ? argv['delay'] : 500;
app.use((req, res, next) => setTimeout(next, delay));

/*
 * Enable CORS
 */
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

/**
 * Load routes
 */
var routesAuth = require('./routes/auth.js');
var routesAccount = require('./routes/account.js');
var routesNotifications = require('./routes/notifications.js');
var routesDashboard = require('./routes/dashboard.js');

app.use('/api/v1/auth', routesAuth);
app.use('/api/v1/account', routesAccount);
app.use('/api/v1/notifications', routesNotifications);
app.use('/api/v1/dashboard', routesDashboard);

/**
 * Start server
 */
var serverPort = argv['port'] !== undefined ? argv['port'] : 8080;

app.listen(serverPort, function () {
	console.log(`mock-server started on ${serverPort} with ${delay}ms artificial delay`);
});
