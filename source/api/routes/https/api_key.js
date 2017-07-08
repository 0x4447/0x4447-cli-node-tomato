let express = require('express');

let router = express.Router();

//
//	Make sure the IP is present in each request
//
router.use(check_the_api_key);

//  _____     ____    _    _   _______   ______    _____
// |  __ \   / __ \  | |  | | |__   __| |  ____|  / ____|
// | |__) | | |  | | | |  | |    | |    | |__    | (___
// |  _  /  | |  | | | |  | |    | |    |  __|    \___ \
// | | \ \  | |__| | | |__| |    | |    | |____   ____) |
// |_|  \_\  \____/   \____/     |_|    |______| |_____/
//
////////////////////////////////////////////////////////////////////////////////

router.use('/', require('./api_key/index'));

////////////////////////////////////////////////////////////////////////////////

//  _    _   ______   _        _____    ______   _____     _____
// | |  | | |  ____| | |      |  __ \  |  ____| |  __ \   / ____|
// | |__| | | |__    | |      | |__) | | |__    | |__) | | (___
// |  __  | |  __|   | |      |  ___/  |  __|   |  _  /   \___ \
// | |  | | | |____  | |____  | |      | |____  | | \ \   ____) |
// |_|  |_| |______| |______| |_|      |______| |_|  \_\ |_____/
//

function check_the_api_key(req, res, next)
{
	//
	//	1.	Create a container that will pass the data around
	//
	let container = {
		authorization: req.headers.authorization
	}

	//
	//	2.	Make sure the API KEY is present
	//
	check_if_api_key_is_present(container)
		.then(function(container) {

			//
			//	1.	CLean up the API KEY
			//
			return clean_up_the_authorization_data(container);

		}).then(function(container) {

			//
			//	1.	Check if the Key matches what we have in our DB
			//
			return check_if_api_key_matches(container);

		}).then(function(container) {

			//
			//	1.	Moves to the next middleware
			//
			return next();

		}).catch(function(error) {

			//
			//	1.	Stop everything if there is an error
			//
			return next(error);

		});
}

//  _____    _____     ____    __  __   _____    _____   ______    _____
// |  __ \  |  __ \   / __ \  |  \/  | |_   _|  / ____| |  ____|  / ____|
// | |__) | | |__) | | |  | | | \  / |   | |   | (___   | |__    | (___
// |  ___/  |  _  /  | |  | | | |\/| |   | |    \___ \  |  __|    \___ \
// | |      | | \ \  | |__| | | |  | |  _| |_   ____) | | |____   ____) |
// |_|      |_|  \_\  \____/  |_|  |_| |_____| |_____/  |______| |_____/
//

//
//	Make sure first if the API KEY is present or not
//
function check_if_api_key_is_present(container)
{
	return new Promise(function(resolve, reject) {

		//
		//  1.	Let the user know if the API KEY is missing
		//
		if(!container.authorization)
		{
			//
			//	1.	Explain what happened
			//
			let error = new Error('The API KEY is missing');

			//
			//	2. The request is: Not Acceptable
			//
			error.status = 406;

			//
			//	->	Send he error to the next middelware
			//
			return reject(error);
		}

		//
		//	->	Send he error to the next middelware
		//
		return resolve(container);

	});
}

//
//	CLean up the API KEY so we can actually compare it with what we have
//
function clean_up_the_authorization_data(container)
{
	return new Promise(function(resolve, reject) {

		//
		// 	1.	Remove Basic from the beginning of the string
		//
		let no_basic = container.authorization.replace('Basic ', '');

		//
		//	2.	Convert from base64 to string
		//
		let b64_to_string = new Buffer(no_basic, 'base64').toString("utf8");

		//
		// 	3.	Remove the colon from the end of the string
		//
		let api_key = b64_to_string.replace(':', '');

		//
		//	4.	Add the cleaned up key to the container
		//
		container.api_key = api_key;

		//
		//	->	Send he error to the next middelware
		//
		return resolve(container);

	});
}

//
//	Check the API KEY with what we have on the server side.
//
function check_if_api_key_matches(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1. Check if the API KAY matches
		//
		if(container.api_key !== process.env.SECRET_OF_THIS_SERVER)
		{
			//
			//	1.	Explain what happened
			//
			let error = new Error('The API KEY is invalid');

			//
			//	2. The request is: Unauthorized
			//
			error.status = 401;

			//
			//	->	Send he error to the next middelware
			//
			return reject(error);
		}

		//
		//	->	Send he error to the next middelware
		//
		return resolve(container);

	});
}

module.exports = router;