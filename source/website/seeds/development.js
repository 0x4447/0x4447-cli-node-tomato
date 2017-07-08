//
//	Create a default user in the DB
//
exports.seed = function(knex, Promise) {

	return knex('users')
	.del()
	.then(function() {

		return knex('users')
				.insert({
					email: 'name@example.com',
					password: '$2a$12$s/AN1yl9NltGA/JXE73T1eR4hMwdtntKqRGMtd1BU0Co6QlCcpaUi' // the password is password at 12 rounds
				})
	});

};
