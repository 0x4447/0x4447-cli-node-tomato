//
//	INIT
//
exports.up = function(knex, Promise) {

	return Promise.all([

		knex.raw('CREATE EXTENSION pgcrypto')

	]);

};

exports.down = function(knex, Promise) {

	return Promise.all([

		knex.raw('DROP EXTENSION pgcrypto')

	]);

};
