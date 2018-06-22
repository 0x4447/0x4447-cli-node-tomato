#!/usr/bin/env node

let os = require('os');
let fs = require('fs');
let npm = require('./package.json');
let ncp = require('ncp').ncp;
let path = require('path');
let term = require('terminal-kit').terminal;
let program = require('commander');

//   _____   ______   _______   _______   _____   _   _    _____    _____
//  / ____| |  ____| |__   __| |__   __| |_   _| | \ | |  / ____|  / ____|
// | (___   | |__       | |       | |      | |   |  \| | | |  __  | (___
//  \___ \  |  __|      | |       | |      | |   | . ` | | | |_ |  \___ \
//  ____) | | |____     | |       | |     _| |_  | |\  | | |__| |  ____) |
// |_____/  |______|    |_|       |_|    |_____| |_| \_|  \_____| |_____/
//

//
//	The CLI options for this app.
//
program
	.version(npm.version)
	.option('-d, --destination [type]', 'path to the destination folder')
	.parse(process.argv);

//
//	React when the user needs help
//
program.on('--help', function() {

	//
	//	Just add an empty line at the end of the help to make the text more clear
	//	to the user
	//
	console.log("");

});

//
//	Listen for key preses
//
term.on('key', function(name, matches, data ) {

	//
	//	1.	If we detect CTR+C we kill the app
	//
	if(name === 'CTRL_C' )
	{
		//
		//	1. 	Lets make a nice user experience and clean the terminal window
		//		before closing the app
		//
		term.clear();

		//
		//	->	Kill the app
		//
		process.exit();
	}

});

//
//	Pass the user input to the commander module
//
program.parse(process.argv);

//
//	Check if the user provided the dir source where to copy the file from
//
if(!program.destination)
{
	console.log('Missing destination');
	process.exit(0);
}

//
//	Get the full path of the app being executed
//
let app_path = process.argv[1].split('/');

//	 __  __              _____   _   _
//	|  \/  |     /\     |_   _| | \ | |
//	| \  / |    /  \      | |   |  \| |
//	| |\/| |   / /\ \     | |   | . ` |
//	| |  | |  / ____ \   _| |_  | |\  |
//	|_|  |_| /_/    \_\ |_____| |_| \_|
//

//
//	1.	Tell the user what to do.
//
term.yellow('\n');
term.yellow('Which template should I deploy?\n');

//
//	2.	A list of all the templates that we support
//
let items = [
	'1. Website',
	'2.	API'
];

//
//	3.	The real names of the folders inside the Source folder
//
let folder_names = ['website', 'api'];

//
//	4.	React to what the user selected
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
	let target = process.cwd() + "/" + program.destination

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
