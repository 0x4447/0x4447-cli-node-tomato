#!/usr/bin/env node

let fs = require('fs');
let path = require('path');
let ncp = require('ncp').ncp;
let os = require('os');

//
//	1.	Get the full path of the app being executed
//
let app_path = process.argv[1].split('/');

//
//	2. Extract the name of the app/file name.
//
let app_name = app_path.pop();

//
//	3. The first provided argument by the user is the destination
//
const destination = process.argv[2];

//
//	4. Check if the secret was provided.
//
if(!destination)
{
	//
	//	1. Give the user an example how to use the app.
	//
	console.log("Missing argument! \n\n\tExample: ./%s \"DESTINATION\" \n", app_name);

	//
	//	-> Exit the app if error.
	//
	process.exit(1);
}

//
//	5.	Rebuild the path to the source
// https://docs.npmjs.com/files/folders
let source = "/usr/local/lib/node_modules/express-generator-dg/source";

//
//	6.	Change the source depending on the system
//
if(os.platform() == 'linux')
{
	source = "/usr/lib/node_modules/express-generator-dg/source";
}

//
//	7.	Make the path to the destination location
//
let target = process.cwd() + "/" + destination

//
//	Start copying
//
ncp(source, target, function (err) {

	if(err)
	{
		return console.error(err);
	}

	console.log('Done!');
});

