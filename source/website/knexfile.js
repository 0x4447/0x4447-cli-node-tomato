module.exports = {
	local: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		ssl: false,
		migrations: {
			tableName: 'knex_migrations'
		}
	},
	development: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		ssl: true,
		migrations: {
			tableName: 'knex_migrations'
		},
		pool: {
			min: 1,
			max: 2
		}
	},
	staging: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		ssl: true,
		migrations: {
			tableName: 'knex_migrations'
		},
		pool: {
			min: 1,
			max: 2
		}
	},
	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		ssl: true,
		migrations: {
			tableName: 'knex_migrations'
		},
		pool: {
			min: 1,
			max: 2
		}
	}
};
