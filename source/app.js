//  __  __    ____    _____    _    _   _        ______    _____
// |  \/  |  / __ \  |  __ \  | |  | | | |      |  ____|  / ____|
// | \  / | | |  | | | |  | | | |  | | | |      | |__    | (___
// | |\/| | | |  | | | |  | | | |  | | | |      |  __|    \___ \
// | |  | | | |__| | | |__| | | |__| | | |____  | |____   ____) |
// |_|  |_|  \____/  |_____/   \____/  |______| |______| |_____/
//

//
//	Module for working with file and directory paths
//
let path = require('path');

//
//	HTTP request logger middleware for NodeJS
//
let logger = require('morgan');

//
//	Fast, unopinionated, minimalist web framework
//
let express = require('express');

//
//	Parse incoming request bodies in a middleware before your handlers,
//	available under the req.body property.
//
let bodyParser = require('body-parser');

//
//	The main Centry module to collect crash reports
//
let raven = require('raven');

//
//	Add basic security headers to each request.
//
let helmet = require('helmet');

//
//	Compress the response to reduce page size
//
let compression = require('compression')

//
//	Save the express framework in a simple variable
//
let app = express();

//   _____   ______   _______   _______   _____   _   _    _____    _____
//  / ____| |  ____| |__   __| |__   __| |_   _| | \ | |  / ____|  / ____|
// | (___   | |__       | |       | |      | |   |  \| | | |  __  | (___
//  \___ \  |  __|      | |       | |      | |   | . ` | | | |_ |  \___ \
//  ____) | | |____     | |       | |     _| |_  | |\  | | |__| |  ____) |
// |_____/  |______|    |_|       |_|    |_____| |_| \_|  \_____| |_____/
//

//
//	Load the content of the package.json so we can extract some useful
//	information about the project.
//
let npm = require('./package.json');

//
//	Log errors to Sentry only when in production.
//
//	PRO-TIP: 	use the .dataCallback() method to filter out potential
//				unwanted errors.
//
//	- 	Send the version of the project so we can track which version
//		caused any problems.
//
raven.config(process.env.SENTRY_API_KEY, {
	release: npm.version,
	dataCallback: function(data) {

		//
		//	Only log when in production
		//
		if(process.env.NODE_ENV != "production")
		{
			data = false;
		}

		return data;
	}
}).install();

//
//	Set Sentry to start listening to requests
//
app.use(raven.requestHandler());

//
//	Compress the response
//
app.use(compression());

//
//	Force HTTPS before the client can access anything
//
app.use(force_https);

//
//	Strict-Transport-Security
//
//	Tell the browser, that the next time it connects to the site, it should
//	connect immediately over HTTPS
//
app.use(helmet.hsts({
	maxAge: 15638400,
	includeSubDomains: true,
	force: true
}));

//
//	Make sure the cached data is always validated with the server before
//	it get used.
//
app.use(helmet.noCache());

//
//	Set the custom headers.
//
app.use(helmet.contentSecurityPolicy({
	directives: {
		defaultSrc: ["'none'"],
		connectSrc: ["'self'"],
		fontSrc: ["'self'"],
		frameSrc: ["'self'"],
		imgSrc: ["'self'", "data:"],
		mediaSrc: ["'none'"],
		objectSrc: ["'none'"],
		scriptSrc: ["'self'", "'unsafe-inline'"],
		styleSrc: ["'self'", "'unsafe-inline'"]
	}
}));

//
//	Tell NodeJS where to look for views
//
app.set('views', path.join(__dirname, 'views'));

//
//	Load the Hogan HTML engine
//
app.set('view engine', 'hjs');

//
//	Remove the information about what type of framework is the site running on
//
app.disable('x-powered-by');

//
//	Expose the public folder to the world
//
app.use(express.static(path.join(__dirname, 'public')));

//
// HTTP request logger middleware for node.js
//
app.use(logger('dev'));

//
//	Parse all request as regular text, and not JSON objects
//
app.use(bodyParser.json());

//
//	Parse application/x-www-form-urlencoded
//
app.use(bodyParser.urlencoded({ extended: false }));

//  _____     ____    _    _   _______   ______    _____
// |  __ \   / __ \  | |  | | |__   __| |  ____|  / ____|
// | |__) | | |  | | | |  | |    | |    | |__    | (___
// |  _  /  | |  | | | |  | |    | |    |  __|    \___ \
// | | \ \  | |__| | | |__| |    | |    | |____   ____) |
// |_|  \_\  \____/   \____/     |_|    |______| |_____/
//

////////////////////////////////////////////////////////////////////////////////

app.use('/', require('./routes/index'));

////////////////////////////////////////////////////////////////////////////////

//  ______   _____    _____     ____    _____     _____
// |  ____| |  __ \  |  __ \   / __ \  |  __ \   / ____|
// | |__    | |__) | | |__) | | |  | | | |__) | | (___
// |  __|   |  _  /  |  _  /  | |  | | |  _  /   \___ \
// | |____  | | \ \  | | \ \  | |__| | | | \ \   ____) |
// |______| |_|  \_\ |_|  \_\  \____/  |_|  \_\ |_____/
//

//
//	Set Sentry to catch all the potential error
//
app.use(raven.errorHandler());

//
//
//  If nonce of the above routes matches, we create an error to let the
//  user know that the URL accessed doesn't match anything.
//
app.use(function(req, res, next) {

	let err = new Error('Not Found');
		err.status = 404;

	next(err);

});

//
//  Display any error that occurred during the request.
//
app.use(function(err, req, res, next) {

	//
	//	1.	Use the status of the error itself or set a default one
	//
	let status = err.status || 500;

	//
	//	2.	If there was no status, and the default was set, we have to
	//		add the status to the error object.
	//
	if(status === 500)
	{
		err.status = 500;
	}

	//
	//	3.	Set the basic information about the error, that is going to be
	//		displayed to user and developers regardless.
	//
	let obj_message = {
		message: err.message
	}

	//
	//	4.	Check if the environment is development, and if it is we
	//		will display the stack-trace
	//
	if(process.env.NODE_ENV != 'production')
	{
		//
		//	1.	Set the variable to show the stack-trace to the developer
		//
		obj_message.error = err;

		//
		//	-> Show the error in the console
		//
		console.error(err);
	}

	//
	//	5.	Set the status response as the one from the error message
	//
	res.status(status);

	//
	//	->	Show the error
	//
	res.json(obj_message);

});

//  _    _   ______   _        _____    ______   _____     _____
// | |  | | |  ____| | |      |  __ \  |  ____| |  __ \   / ____|
// | |__| | | |__    | |      | |__) | | |__    | |__) | | (___
// |  __  | |  __|   | |      |  ___/  |  __|   |  _  /   \___ \
// | |  | | | |____  | |____  | |      | |____  | | \ \   ____) |
// |_|  |_| |______| |______| |_|      |______| |_|  \_\ |_____/
//

//
//	No more excuses, just force HTTPS no matter what.
//
function force_https(req, res, next)
{
	//
	//	1. 	Skip redirection only when on local machine
	//
	if(process.env.NODE_ENV != 'local')
	{
		//
		//	1. 	Check what protocol are we using when behind a reverse proxy
		//
		if(req.headers['x-forwarded-proto'] !== 'https')
		{
			//
			//	-> 	Redirect the user to the same URL that he requested, but
			//		with HTTPS instead of HTTP
			//
			return res.redirect('https://' + req.hostname + req.url);
		}
	}

	//
	//	2. 	If the protocol is already HTTPS the, we just keep going.
	//
	next();
}

module.exports = app;
