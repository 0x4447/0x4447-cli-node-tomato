#!/usr/bin/env node

let fs = require('fs');
let path = require('path');

let source = "source";

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
//
//
destination_path.push(destination)

//
//
//
let destination_path_string = destination_path.join("/")


//
//
//
copy_folder(source, destination_path_string);

//
//
//
function copy_folder(source, target) {

	//
	//
	//
	let files = [];

	//
	//
	//
	let ble = source.split("/")

	//
	//
	//
	let me = "/";

	//
	//
	//
	if(ble[1])
	{
		me = ble[1]
	}

	//
	//	check if folder needs to be created or integrated
	//
	let targetFolder = path.join(target, path.basename(me));

	//
	//
	//
	if(!fs.existsSync(targetFolder))
	{
		//
		//
		//
		fs.mkdirSync(targetFolder);
	}

	//
	//
	//
	if(fs.lstatSync(source).isDirectory())
	{
		//
		//
		//
		files = fs.readdirSync(source);

		//
		//
		//
		files.forEach(function(file) {

			//
			//
			//
			let curSource = path.join( source, file );

			//
			//
			//
			if(fs.lstatSync(curSource).isDirectory())
			{
				//
				//
				//
				copy_folder(curSource, targetFolder);

			} else
			{
				//
				//
				//
				copy_file(curSource, targetFolder);
			}

		});
	}
}

function copy_file(source, target) {

	//
	//
	//
    let targetFile = target;

    //
    //	if target is a directory a new file with the same name will be created
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
    //
    //
    fs.writeFileSync(targetFile, fs.readFileSync(source));
}