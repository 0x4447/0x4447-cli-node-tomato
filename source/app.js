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
let body_parser = require('body-parser');

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
let compression = require('compression');

//
//	Parse the header for cookies
//
let cookie_parser = require('cookie-parser');

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
	release: npm.version
}).install();

//
//	Process Cookies from each requests. If a random string is provided it will
//	be assigned to the req.secret variable, middlewares can use it to sign
//	cookies or other things.
//
app.use(cookie_parser());

//
//	Set Sentry to start listening to requests
//
app.use(raven.requestHandler());

//
//	Compress the response with Gzip
//
app.use(compression());

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
app.use(body_parser.json());

//
//	Parse application/x-www-form-urlencoded
//
app.use(body_parser.urlencoded({ extended: false }));

//  _____     ____    _    _   _______   ______    _____
// |  __ \   / __ \  | |  | | |__   __| |  ____|  / ____|
// | |__) | | |  | | | |  | |    | |    | |__    | (___
// |  _  /  | |  | | | |  | |    | |    |  __|    \___ \
// | | \ \  | |__| | | |__| |    | |    | |____   ____) |
// |_|  \_\  \____/   \____/     |_|    |______| |_____/
//

////////////////////////////////////////////////////////////////////////////////

app.use(require('./routes/https'));

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

	//
	//	1.	Create a visual message for a human
	//
	let error = new Error("Not Found");

	//
	//	2.  The request is: Not Found.
	//
	error.status = 404;

	//
	//	->	Move to the next middelware
	//
	next(error);

});

//
//  Display any error that occurred during the request.
//
app.use(function(error, req, res, next) {

	//
	//	1.	Use the status of the error itself or set a default one.
	//
	let status = error.status || 500;

	//
	//	2.	If there was no status, and the default was set, we have to
	//		add the status to the error object.
	//
	if(status === 500)
	{
		error.status = 500;
	}

	//
	//	3.	Set the basic information about the error, that is going to be
	//		displayed to user and developers - regardless.
	//
	let obj_message = {
		message: error.message
	}

	//
	//	4.	Don't log the error when in production
	//
	if(process.env.NODE_ENV != 'production')
	{
		//
		//	1.	Set the variable to show the stack-trace to the developer
		//
		obj_message.error = error;

		//
		//	-> Show the error in the console
		//
		console.error(error);
	}

	//
	//	6.	Set the status response as the one from the error message
	//
	res.status(status);

	//
	//	7.	Send the error
	//
	res.json(obj_message);

	//
	//	->	Stop the request
	//
	res.end();

});

module.exports = app;
