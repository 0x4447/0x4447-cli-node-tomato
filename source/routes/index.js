let express = require('express');

let router = express.Router();

router.get('/', function(req, res, next) {

	//
	//	->	Render the HTML page
	//
	res.render("_frame", {
		title: "Home",
		description: "Home Page",
		partials: {
			body: 'index'
		}
	});

});

module.exports = router;