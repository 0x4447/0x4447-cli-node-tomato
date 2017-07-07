//
//	1. 	Load the Knex config file which by default is located in the root
//		directory of the project.
//
let config = require("../knexfile");

//
//	2.	Load the running environment
//
let enviroment = process.env.NODE_ENV;

//
//  3.	Create Knex connection based on the environment
//
let knex = require('knex')(config[enviroment]);

//
//  Expose The Knex connection object
//
module.exports = knex;