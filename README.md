# 🍅 Tomato

This is our own take on the [express-generator](https://expressjs.com/en/starter/generator.html) CLI that comes with ExpressJS. We made this project because we always spend quite some time brining the default ExpressJS template up to speed. Especially when we have to constantly spin up new micro-services.

A nice feature of this project is the simplicity on how you can customize it yourself. If you have your own style, you can just clone this repo and edit the `source` folder to your liking. But before you do that, check the list of features bellow. So... buckle up, scroll down and enjoy 🙂.

# How to Install

```
sudo npm install -g @0x4447/tomato
```

# Usage

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
$ sudo npm -g install @0x4447/tomato
```

Once you have this npm package installed globally, you can use it anywhere. Go to a folder where you want to create a new project and:

```
$ tomato NAME_OF_THE_FOLDER
```

Select the option that best suit your needs. Then you'll have to go in to the directory you just created and type:

```
$ npm install
```

Then you'll need to create a `.env` file to load your environment variables in to memory thanks to `foreman`, or you can also just install another tool that I made called [env-auto](https://www.npmjs.com/package/env-auto) like so:

```
$ npm install cucumber -g
```

and then in the root folder of your project type:

```
$ cucumber
```

to get the `.env` file automatically created from the `app.json` file. Last thing would be to start the whole thing with:

```
$ npm start
```

# WARNING

This tool will override, destroy, kill and crash everything in its path - you've been warned ;)

# Fork It

This project was designed to allow you to make it your own - thanks to it simplicity. Once forked you just have to change the content of the `source` folder, and you have your own easy to use template up and running when you need it.

# Why This Name?

Why not? We had to call it something. And once you see it, you're not going to forget it. 😃

# The End

If you enjoyed this project, please consider giving it a 🌟. And check out our [0x4447 GitHub account](https://github.com/0x4447), where we have additional articles and tools that you might find interesting.

# For Hire 👨‍💻 👩‍💻

If you'd like us to help you with something, please feel free to say hello@0x4447.com, and share what's on your mind. We'll take a look, and try our best to help you. Or visit our website at: [0x4447.com](https://0x4447.com).