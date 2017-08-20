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
//	Remove the information about what type of framework is the site running on
//
app.disable('x-powered-by');

//
//	Remove from the header the ETag since we have no use for it in this case,
//	and this will also reduce the response size by 19%
//
app.set('etag', false);

//
//	Remove the date header if you know the other side won't cash the data.
//	Since this is the majority of the time, we remove this by default.
//
app.use(function(req, res, next) {

	//
	//	1.	Remove the Date header from each response
	//
	res.removeHeader('Date');

	//
	//	-> Keep going
	//
	next();

});

//
//	When enabled, Express attempts to determine the IP address of the client
//	connected through the front-facing proxy, or series of proxies.
//
app.enable('trust proxy');

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
