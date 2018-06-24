#!/usr/bin/env node

let fs = require('fs');
let npm = require('./package.json');
let ncp = require('ncp').ncp;
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
	.option('-d, --destination [type]', 'path to the destination folder');

//
//	React when the user needs help
//
program.on('--help', function() {

	//
	//	Just add an empty line at the end of the help to make the text more
	//	clear to the user
	//
	console.log("");

});

//
//	Pass the user input to the commander module
//
program.parse(process.argv);

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
let app_location = get_source_path(process.argv[1]);

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
	let source = app_location + "/source/" + seelcted_folder;

	//
	//	3.	Make the path to the destination location
	//
	let target = process.cwd() + "/" + program.destination;

	//
	//	4.	Start copying
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

//	 ______  _    _  _   _   _____  _______  _____  ____   _   _   _____
//	|  ____|| |  | || \ | | / ____||__   __||_   _|/ __ \ | \ | | / ____|
//	| |__   | |  | ||  \| || |        | |     | | | |  | ||  \| || (___
//	|  __|  | |  | || . ` || |        | |     | | | |  | || . ` | \___ \
//	| |     | |__| || |\  || |____    | |    _| |_| |__| || |\  | ____) |
//	|_|      \____/ |_| \_| \_____|   |_|   |_____|\____/ |_| \_||_____/
//

//
//	Create the source path where the module is located so we can get to the
//	`source` folder and copy its content to the destination.
//
//	We need to do this since different environments save the module in
//	different places. Clean npm will save it in one place, nvm will save it
//	in another one.
//
function get_source_path(path)
{
	//
	//	1.	Split the string in to an array
	//
	let path_array = path.split('/');

	//
	//	2.	Check if we are dealing with nvm or not
	//
	let nvm = path_array.includes('.nvm') || false;

	//
	//	3.	Remove the last two indexes from the array since we want to get
	//		to where the source of the module is located ad not where the
	//		symlink to the binary is.
	//
	path_array.splice(-2);

	//
	//	3.	Add the array the folders names that points to the source of
	//		the module.
	//
	path_array.push('lib');
	path_array.push('node_modules');
	path_array.push('@0x4447');
	path_array.push('tomato');

	//
	//	4.	Convert the array in to a path string.
	//
	let new_path = path_array.join('/');

	//
	//	->	Return the result
	//
	return new_path;
}