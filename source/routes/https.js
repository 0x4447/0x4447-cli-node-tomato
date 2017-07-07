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

router.use('/', require('./https/index'));

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

	//
	//	2. 	If the protocol is already HTTPS the, we just keep going.
	//
	next();
}

module.exports = router;