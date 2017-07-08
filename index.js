#!/usr/bin/env node

let os = require('os');
let fs = require('fs');
let ncp = require('ncp').ncp;
let path = require('path');
let term = require('terminal-kit').terminal;

//
//	1.	Get the full path of the app being executed
//
let app_path = process.argv[1].split('/');

//
//	2. The first provided argument by the user is the destination
//
let destination = process.argv[2];

//
//	3. Make sure the destination was provided by the user
//
if(!destination)
{
	//
	//	1. Give the user an example how to use the app.
	//
	term.brightWhite("Missing argument!\n");
	term.brightWhite('\n');
	term.yellow("\tExample: express-generator-dg DESTINATION_FOLDER \n");
	term.brightWhite('\n');

	//
	//	-> Exit the app if error.
	//
	process.exit(1);
}

//
//	4.	Tell the user what to do.
//
term.yellow('\n');
term.yellow('Which template should I deploy?\n');

//
//	5.	A list of all the templates that we support
//
let items = [
	'1. Website',
	'2.	API'
];

//
//	6.	The real names of the folders inside the Source folder
//
let folder_names = ['website', 'api'];

//
//	7.	React to what the user selected
//
term.singleColumnMenu(items, function(error, response) {

	//
	//	1.	Get the folder name based on the user selection
	//
	let seelcted_folder = folder_names[response.selectedIndex]

	//
	//	2.	Create the path to the source folder to be copied
	//
	// 		https://docs.npmjs.com/files/folders
	//
	let source = "/usr/local/lib/node_modules/express-generator-dg/source/" + seelcted_folder;

	//
	//	3.	We change the path accordingly to the system the app is running
	//
	if(os.platform() == 'linux')
	{
		source = "/usr/lib/node_modules/express-generator-dg/source/" + seelcted_folder;
	}

	//
	//	4.	Make the path to the destination location
	//
	let target = process.cwd() + "/" + destination

	//
	//	5.	Start copying
	//
	ncp(source, target, function(error) {

		//
		//	1.	Check if an error occurred
		//
		if(error)
		{
			//
			//	1.	Show the error
			//
			term.red('\n');
			term.red(error[0]);
			term.red('\n');
			term.red('\n');

			//
			//	->	Exit the app
			//
			process.exit();
		}

		//
		//	2.	Let the user know the process of coping finished
		//
		term.yellow('\n');
		term.yellow('Done!');
		term.yellow('\n');
		term.yellow('\n');

		//
		//	->	Exit the app
		//
		process.exit();

	});

});
