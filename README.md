# 🍅 Tomato

This is our own take on the [express-generator](https://expressjs.com/en/starter/generator.html) CLI that comes with ExpressJS. We made this project because we always spend quite some time brining the default ExpressJS template up to speed. Especially when we have to constantly spin up new micro-services.

A nice feature of this project is the simplicity on how you can customize it yourself. If you have your own style, you can just clone this repo and edit the `source` folder to your liking. But before you do that, check the list of features bellow.

# How to Install

```
] sudo npm install -g @0x4447/tomato
```

# How to Use

```
] tomato NAME_OF_THE_FOLDER
```

# Where to get Help

```
] tomato -h
```

# What to Expect

The `source` folder have 2 templates, one for when you need to build a Website in ExpressJS, and the other is when you need to build an API. In this case the API template is a striped down version of the Website folder, with some minor changes of course. Bellow you can check the list of all the shared features, but not limited to the features that they don't share in common.

# Shared Key Features

- Our personal commenting style that we like
- Simplified and explained the `server` file so from the start you know what each line of code dose
- By default we use clustering
- Redesigned how errors are handled and displayed
- By default we use Knex to talk with the database
- Code that starts the server is in `workers` folder since it is a worker, and since we always end up with more the the server
- End everything is organized how we like it :)

## Website

- Redirect to HTTPS in production
- By default we use compression when sending requests
- By default we use Hogan for the templating - nice and simple
- Favicon done right. Make your own five icon using [Real Favicon Generator](https://realfavicongenerator.net)
- Basic Open Graph support
- Twitter Cards support

## API

- Throw error if there is no HTTPS in production
- Remove the ETag from the header response
- Removed the Data entry in the header response
- Built in check for an API Key

# The whole flow to have the project up and running is this:

```
] sudo npm -g install @0x4447/tomato
```

Once you have this npm package installed globally, you can use it anywhere. Go to a folder where you want to create a new project and:

```
] tomato NAME_OF_THE_FOLDER
```

Select the option that best suit your needs. Then you'll have to go in to the directory you just created and type:

```
] npm install
```

Then you'll need to create a `.env` file to load your environment variables in to memory thanks to `foreman`, or you can also just install another tool that I made called [env-auto](https://www.npmjs.com/package/env-auto) like so:

```
] npm install cucumber -g
```

and then in the root folder of your project type:

```
] cucumber
```

to get the `.env` file automatically created from the `app.json` file. Last thing would be to start the whole thing with:

```
] npm start
```

# WARNING

This tool will override, destroy, kill and crash everything in its path - you've been warned ;)

# Fork It

This project was designed to allow you to make it your own - thanks to it simplicity. Once forked you just have to change the content of the `source` folder, and you have your own easy to use template up and running when you need it.

# The End

If you enjoyed this project, please consider giving it a 🌟. And check out our [0x4447 GitHub account](https://github.com/0x4447), where you'll find additional resources you might find useful or interesting.

## Sponsor 🎊

This project is brought to you by 0x4447 LLC, a software company specializing in building custom solutions on top of AWS. Follow this link to learn more: https://0x4447.com. Alternatively, send an email to [hello@0x4447.email](mailto:hello@0x4447.email?Subject=Hello%20From%20Repo&Body=Hi%2C%0A%0AMy%20name%20is%20NAME%2C%20and%20I%27d%20like%20to%20get%20in%20touch%20with%20someone%20at%200x4447.%0A%0AI%27d%20like%20to%20discuss%20the%20following%20topics%3A%0A%0A-%20LIST_OF_TOPICS_TO_DISCUSS%0A%0ASome%20useful%20information%3A%0A%0A-%20My%20full%20name%20is%3A%20FIRST_NAME%20LAST_NAME%0A-%20My%20time%20zone%20is%3A%20TIME_ZONE%0A-%20My%20working%20hours%20are%20from%3A%20TIME%20till%20TIME%0A-%20My%20company%20name%20is%3A%20COMPANY%20NAME%0A-%20My%20company%20website%20is%3A%20https%3A%2F%2F%0A%0ABest%20regards.).

# The End

If you enjoyed this project, please consider giving it a 🌟. And check out our [0x4447 GitHub account](https://github.com/0x4447), where we have additional resources that you might find useful or interesting.

## Sponsor 🎊

This project is brought to you by 0x4447 LLC, a software company specializing in build custom solutions on top of AWS. Find out more by following this link: https://0x4447.com or, say [hello@0x4447.email](mailto:hello@0x4447.email?Subject=Hello%20From%20Repo&Body=Hi%2C%0A%0AMy%20name%20is%20NAME%2C%20and%20I%27d%20like%20to%20get%20in%20touch%20with%20someone%20at%200x4447.%0A%0AI%27d%20like%20to%20discuss%20the%20following%20topics%3A%0A%0A-%20LIST_OF_TOPICS_TO_DISCUSS%0A%0ASome%20useful%20information%3A%0A%0A-%20My%20full%20name%20is%3A%20FIRST_NAME%20LAST_NAME%0A-%20My%20time%20zone%20is%3A%20TIME_ZONE%0A-%20My%20working%20hours%20are%20from%3A%20TIME%20till%20TIME%0A-%20My%20company%20name%20is%3A%20COMPANY%20NAME%0A-%20My%20company%20website%20is%3A%20https%3A%2F%2F%0A%0ABest%20regards.).
