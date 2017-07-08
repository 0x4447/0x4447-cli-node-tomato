# DG Express Generator

This is my own take on the [express-generator](https://expressjs.com/en/starter/generator.html) CLI that comes with ExpressJS. I made this project because I always spend quite some time brining the default ExpressJS template up to speed. Especially when I have to constantly spin up new micro-services.

A nice feature of my project is the simplicity on how you can customize it yourself. If you have your own style, you can just clone this repo and edit the `source` folder to your liking. But before you do that, check the list of features bellow. So... buckle up, scroll down and enjoy 🙂.

# How to go about this

The `source` folder have 2 templates, one for when you need to build a Website in ExpressJS, and the other is when you need to build an API. In this case the API template is a striped down version of the Website folder, with some minor changes of course. Bellow you can check the list of all the shared features, but not limited to the features that they don't share in common.

# Shared Key Features

- My personal commenting style that I like
- Simplified and explained the `server` file so from the start you know what each line of code dose
- By default I use clustering
- Redesigned how errors are handled and displayed
- Sentry Support by default set it to report crashes only in production
- By default I use Knex to talk with the database
- Code that starts the server is in `workers` folder since it is a worker, and since I always end up with more the the server I have everything in place
- End everything is organized how I like it :)

## Website

- Redirect to HTTPS in production
- By default I use compression when sending requests
- By default I use Hogan for the templating - nice and simple
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
$ npm install express-generator-dg -g
```

Once you have this npm package installed globally, you can use it anywhere. Go to a folder where you want to create a new project and:

```
$ express-generator-dg NAME_OF_THE_FOLDER
```

Select the option that best suit your needs. Then you'll have to go in to the directory you just created and type:

```
$ npm install
```

Then you'll need to create a `.env` file to load your environment variables in to memory thanks to `foreman`, or you can also just install another tool that I made called [env-auto](https://www.npmjs.com/package/env-auto) like so:

```
$ npm install env-auto -g
```

and then in the root folder of your project type:

```
$ env-auto
```

to get the `.env` file automatically created from the `app.json` file. Last thing would be to start the whole thing with:

```
$ npm start
```

# WARNING

This tool will override, destroy, kill and crash everything in its path - you've been warned ;)

# Fork It

This project was designed to allow you to make it your own - thanks to it simplicity. Once forked you just have to change the content of the `source` folder, and you have your own easy to use template up and running when you need it.

# The End

If you've enjoyed this article/project, please consider giving it a 🌟. Also check out my [GitHub account](https://github.com/davidgatti), where I have other articles and apps that you might find interesting.

## Where to follow

You can follow me on social media 🐙😇, at the following locations:

- [GitHub](https://github.com/davidgatti)
- [Twitter](https://twitter.com/dawidgatti)
- [Instagram](https://www.instagram.com/gattidavid/)

## More about me

I don’t only live on GitHub, I try to do many things not to get bored 🙃. To learn more about me, you can visit the following links:

- [Podcasts](http://david.gatti.pl/podcasts)
- [Articles](http://david.gatti.pl/articles)
- [Technical Articles](http://david.gatti.pl/technical_articles)
- [Software Projects](http://david.gatti.pl/software_projects)
- [Hardware Projects](http://david.gatti.pl/hardware_projects)
