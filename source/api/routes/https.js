let express = require('express');

let router = express.Router();

//
//	1. 	Don't force HTTPS the code is running in development mode
//
if(process.env.NODE_ENV != 'local')
{
	router.use(force_https);
}

//  _____     ____    _    _   _______   ______    _____
// |  __ \   / __ \  | |  | | |__   __| |  ____|  / ____|
// | |__) | | |  | | | |  | |    | |    | |__    | (___
// |  _  /  | |  | | | |  | |    | |    |  __|    \___ \
// | | \ \  | |__| | | |__| |    | |    | |____   ____) |
// |_|  \_\  \____/   \____/     |_|    |______| |_____/
//
////////////////////////////////////////////////////////////////////////////////

router.use(require('./https/api_key'));

////////////////////////////////////////////////////////////////////////////////

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
	//	1. 	If the protocol is different from HTTPS we just don't
	//		accept it.
	//
	if(req.headers['x-forwarded-proto'] !== 'https')
	{
		//
		//	1.	Create a visual message for a human
		//
		let error = new Error('You need to use HTTPS in your URL');

		//
		//	2.  The request is: Not Acceptable
		//
		error.status = 406;

		//
		//	->	Move to the next middelware
		//
		return next(error);
	}

	//
	//	2. 	If the protocol is already HTTPS the, we just keep going.
	//
	return next();
}

module.exports = router;