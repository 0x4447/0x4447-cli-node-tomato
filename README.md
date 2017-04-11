# DG Express Generator

I decided to make my own `express-generator` because I always spend quite some time to bring the default template up to speed, by changing things that I didn't like etc. With `express-generator-dg` I decided to share with the world how I like a NodeJS project to look. Some might like it other will hate it. But if you don't like what you see, you can easily clone this repo, and by changing he content of the `source` folder, you'll have your own `express-generator`

# Key Features

- My personal commenting style that I like
- Simplified and explained the `server` file so from the start you know what each line dose
- By default I use clustering
- By default I force HTTPS in production - no excuses
- Redesigned how errors are handled and displayed
- By default I use Hogan for the templating - nice and simple
- Favicon done right. Make your own five icon using [Real Favicon Generator](https://realfavicongenerator.net)
- Basic Open Graph support
- Sentry Support by default set it to report crashes only in production
- By default I use Knex to talk with the database
- Code that starts the server is in `workers` folder since it is a worker, and since I always end up with more the the server I have everything in place
- End everything is organized how I like it :)

# The whole flow to have the project up and running

```
$ npm install express-generator-dg -g
```

Once you have this npm package installed globally, you can use it anywhere. Go to a folder where you would like to create a new project and:

```
$ express-generator-dg NAME_OF_THE_FOLDER
```

Then you'll have to go in to the directory you just created and type:

```
$ npm install
```

Then you'll need to create a `.env` file to load your environment variables in to memory thanks to `foreman`, or you can also just install

```
$ npm install env-auto -g
```

and then type in the root folder of your project to get the `.env` file automatically created from the `app.json` file.

```
$ env-auto
```

Last thing would be to start the whole thing with:

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
