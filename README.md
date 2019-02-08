# 🍅 Tomato

Tomato is our take on the [express-generator](https://expressjs.com/en/starter/generator.html) CLI that comes with ExpressJS. We created the project because we were spending too much time on bringing the default ExpressJS template up to speed, especially when we had to constantly spin up new micro-services.

One nice feature of this project is that it's simple for you to customize. If you have your own style, just clone this repo and edit the `source` folder to suit your needs.

# How to install

```
] sudo npm install -g @0x4447/tomato
```

# How to use

```
] tomato -d PATH_TO_FOLDER
```

# Where to get help

```
] tomato -h
```

# What to expect

There are two templates in the `source` folder, one for building a Website in ExpressJS, and another for building an API. In this case, the API template is a stripped-down version of the Website folder - with some minor changes. Below you'll find the list of all the shared features, but not limited to features they don't share in common.

# Shared key features

- Our preferred personal commenting style
- A simplified and thoroughly explained `server` file that immediately demonstrates what each line of code does
- Clustering used by default
- Redesigned handling and display of errors
- Knex used by default to talk with the database
- Code to start the server in `workers` folder since it's a worker and we always end up with more than the server
- Everything organized in the way we like it :)

## Website

- Redirect to HTTPS in production
- Compression used by default when sending requests
- Hogan used by default for templating (nice and simple)
- Favicon done right: Make five icons with [Real Favicon Generator](https://realfavicongenerator.net)
- Basic Open Graph support
- Twitter Cards support

## API

- Throws error if there is no HTTPS in production
- Removes the ETag from the header response
- Removes the Data entry in the header response
- Built-in check for an API Key

# The entire flow to get the project up and running follows:

```
] sudo npm -g install @0x4447/tomato
```

Once you have this npm package installed globally, you can use it anywhere. Go to a folder in which you'd like to create a new project, then:

```
] tomato -d PATH_TO_FOLDER
```

Select the option that best suits your needs, then go into the directory you just created and type:

```
] npm install
```

Next, create a `.env` file to load your environment variables into memory - thanks to `foreman`. Or you can install another of our tool, [env-auto](https://www.npmjs.com/package/env-auto) in this manner:

```
] npm install cucumber -g
```

In your project's root folder, type:

```
] cucumber -s PATH_TO_FOLDER
```

This automatically creates the `.env` file created from the `app.json` file. The last step is to start the whole thing with:

```
] npm start
```

# WARNING

This tool will override, destroy, kill, and crash everything in its path. You've been warned! ;)

# Fork it

We designed this project in such a simple way that you can make it your own. Once forked, just change the content of the `source` folder, and you'll have your own easy-to-use template up and running whenever you need it.

# The End

If you enjoyed this project, please consider giving it a 🌟. And check out our [0x4447 GitHub account](https://github.com/0x4447), which contains additional resources you might find useful or interesting.

## Sponsor 🎊

This project is brought to you by 0x4447 LLC, a software company specializing in building custom solutions on top of AWS. Follow this link to learn more: https://0x4447.com. Alternatively, send an email to [hello@0x4447.email](mailto:hello@0x4447.email?Subject=Hello%20From%20Repo&Body=Hi%2C%0A%0AMy%20name%20is%20NAME%2C%20and%20I%27d%20like%20to%20get%20in%20touch%20with%20someone%20at%200x4447.%0A%0AI%27d%20like%20to%20discuss%20the%20following%20topics%3A%0A%0A-%20LIST_OF_TOPICS_TO_DISCUSS%0A%0ASome%20useful%20information%3A%0A%0A-%20My%20full%20name%20is%3A%20FIRST_NAME%20LAST_NAME%0A-%20My%20time%20zone%20is%3A%20TIME_ZONE%0A-%20My%20working%20hours%20are%20from%3A%20TIME%20till%20TIME%0A-%20My%20company%20name%20is%3A%20COMPANY%20NAME%0A-%20My%20company%20website%20is%3A%20https%3A%2F%2F%0A%0ABest%20regards.).

