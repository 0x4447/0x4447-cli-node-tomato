//
//	USERS
//
exports.up = function(knex, Promise) {

	return Promise.all([

		knex.schema.createTable('users', function(table) {

			table
				.uuid('id')
				.primary()
				.defaultTo(knex.raw("gen_random_uuid()"));

			table
				.text('email')
				.unique()
				.notNullable()
				.comment('The email of the user');

			table
				.text('password')
				.notNullable()
				.comment('The password of the users');

			table
				.timestamp('created_at')
				.notNullable()
				.defaultTo(knex.fn.now());

			table
				.timestamp('updated_at')
				.notNullable()
				.defaultTo(knex.fn.now());
		})

	]);

};

exports.down = function(knex, Promise) {

	return Promise.all([
		knex.schema.dropTable('users')
	]);

};

