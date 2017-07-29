let express = require('express');

let router = express.Router();

router.get('/', function(req, res, next) {

	//
	//	->	Close the connection with a positive status
	//
	res.end();

});

module.exports = router;