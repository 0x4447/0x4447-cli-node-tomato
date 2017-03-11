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
//	Force HTTPS before the client can access anything
//
app.use(force_https);

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

app.use('/', require('./routes/index'));

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

	let err = new Error('Not Found');
		err.status = 404;

	next(err);

});

//
//  Display any error that occurred during the request.
//
app.use(function(err, req, res, next) {

	//
	//	1.	Set the basic information about the error, that is going to be
	//		displayed to user and developers regardless.
	//
	let obj_message = {
		message: err.message
	};

	//
	//	2.	Hide the stack trace when in production
	//
	if(process.env.NODE_ENV != 'production')
	{
		//
		//	1.	Add the whole error to the message
		//
		obj_message.error = err;

		//
		//	-> Show the error in the console
		//
		console.error(err);
	}

	//
	//	3.	Display a default status error, or pass the one from
	//		the error message
	//
	res.status(err.status || 500);

	//
	//	->	Show the error as JSON
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
	//	1. 	Redirect only in the production environment
	//
	if(process.env.NODE_ENV != 'local')
	{
		//
		//	1. 	Check what protocol are we using
		//
		if(req.headers['x-forwarded-proto'] !== 'https')
		{
			//
			//	-> 	Redirect the user to the same URL that he requested, but
			//		with HTTPS instead of HTTP
			//
			return res.redirect('https://' + req.get('host') + req.url);
		}
	}

	//
	//	2. 	If the protocol is already HTTPS the, we just keep going.
	//
	next();
}

module.exports = app;
