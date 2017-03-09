#!/usr/bin/env node

let fs = require('fs');
let path = require('path');

//
//
//
let destination_path = process.argv[1].split('/');

//
//    1. Extract the name of the app/file name.
//
let appName = destination_path.pop();

//
//    2. Save the first provided argument as the token.
//
const destination = process.argv[2];

//
//    4. Check if the secret was provided.
//
if(!destination)
{
    //
    //    1. Give the user an example how to use the app.
    //
    console.log("Missing argument! \n\n\tExample: ./%s \"THE_PAYLOAD\" YOUR_TOKEN\n", appName);

    //
    //    -> Exit the app if error.
    //
    process.exit(1);
}

//
//	Rebuild the path to the source
//
let source = "/usr/local/lib/node_modules/express-generator-dg/source"

//
//
//
let target = process.cwd() + "/" + destination


//
//	Start copying
//
copy_folder(source, target);

//
//	Function to traverse a folder structure
//
function copy_folder(source, target) {

	//
	//	Create an array which will hold all the file name
	//
	let files = [];

	//
	//	check if folder needs to be created or integrated
	//
	let targetFolder = target

	//
	//	Check if the target folder exists or not
	//
	if(!fs.existsSync(targetFolder))
	{
		//
		//	Create the target folder
		//
		fs.mkdirSync(targetFolder);
	}

	//
	//	Check if the source is a folder or not
	//
	if(fs.lstatSync(source).isDirectory())
	{
		//
		//	Read all the file inside the source folder and save them in to
		//	the array that we created above
		//
		files = fs.readdirSync(source);

		//
		//	Loop over the array and check each element
		//
		files.forEach(function(file) {

			//
			//	Create a full source path so we know where to copy from
			//
			let curSource = path.join(source, file);

			//
			//	Check if the source path is a folder or not
			//
			if(fs.lstatSync(curSource).isDirectory())
			{
				let arr = curSource.split('/');
				let name = arr.pop();

				//
				//	If we are dealing with a folder then run this function
				//	recursively
				//
				copy_folder(curSource, targetFolder + "/" + name);

			}
			else
			{
				//
				//	If the source is a file, lets just copy it
				//
				copy_file(curSource, targetFolder);
			}

		});
	}
}

function copy_file(source, target) {

	//
	//	Copy the target file name
	//
    let targetFile = target;

    //
    //	Check if target file exists
    //
    if(fs.existsSync(target))
    {
    	//
    	//
    	//
        if(fs.lstatSync(target).isDirectory())
        {
        	//
        	//
        	//
            targetFile = path.join( target, path.basename(source));
        }
    }

    //
    //	Copy source file to the target
    //
    fs.writeFileSync(targetFile, fs.readFileSync(source));
}