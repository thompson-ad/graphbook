# Making GraphBook

## Preparing the dev environment

### Installing Nodejs

- install LTS Node via NVM

### Setting up React

- `npm init`
- `npm install --save react react-dom`

You need react if you are writing react applications at all and you need react-dom if you are connecting to the actual DOM of a browser

### preparing and configuring webpack

Our browser requests an index.html file when accessing our application, it specifies all of the files that are required to run our application. Make a public folder and add an `index.html` to it

- `mkdir public`
- `touch index.html`

in `index.html` add the boiler plate code (`! ->`) and include `<div id="root"></div>` in the body.

No JS is loaded here. This div tag is the DOMNode in which our application will be rendered by `ReactDOM`.

So, how do we get react up and running with the `index.html`? We need a bundler.

We will be using WebPack

install it and a shit tonne of dependencies that can be found in the `package.json` dev-dependencies.

We also have eslint

`npx install-peerdeps --dev eslint-config-airbnb`

once this has installed, create a `.eslintrc` file in the root of your project. Here we load the airbnb config and, define the environments the code is going to run and turn off one default rule.

Next, create a `webpack.client.config.js`.

- `HtmlWebpackPlug`: This automatically generates an HTML file that includes all of the webpack bundles. We pass to this our previously created `index.html` as a template.

- `CleanWebpackPlugin`: This empties all of the provided directories to clean old build files

- `entry`: tells webpack where the starting point of our application is. This file needs to be created by us.

- `output` : how our bundle should be called and where it should be saved `dist/client/bundle.js`.

- `module.rules`: we match our fil extensions with the correct loaders. All JS files (except the ones in node_modules) are transpiled by babel. This means we can use ES6 features.

- `devserver`: enables us to run the react code directly. Includes hot-reloading etc.

Now lets make the entry point for the client.

- `mkdir src/client`
- `touch index.js`

(this can be left empty for now, webpack can still handle that)

To spin up our webpack dev server, we need to add some npm scripts to package.json. We can run these using `npm`.

running `npm run client`, will now spin up the dev-server. The browser is empty but if you inspect and go to the `sources` tab you will see that we already have a `bundle.js` and our `index.html` was taken as a template.

### Rendering React

`index.js` is the main starting point. No business logic should be included in this file. It should only have this

```JS
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

Then make this first component, `App.js`. If webpack can't render hello world make sure you have a `.babelrc` file set up.

### Rendering Arrays from React State (some fake data)

We will work with some fake data in the App.js component for now but we will later replace this with some data from our graphql API.

### handling css

You can use CSS in JS or standard CSS. This project will use standard CSS.

we have set up webpack to handle css. the style-loader injects your bundles css right into the DOM.

However we must now import the CSS into our App. Instead of adding the css to the head tag of index.html we can import it in the `App.js`. Webpack will then minify and bundle our CSS too.

### event handling and state updates with React

### react helmet for document heads

It is crucial to be able to control your document heads. You might want to change the title or description based on the content you are presenting.

You can add all standardHTML headers with React Helmet.

### Webpack production build

The last step for our React setup is to have a production build. Until now, we were only using `webpack-dev-server`, but this naturally includes an unimproved development build. Furthermore, webpack automatically spawns a web-server. In a later chapter, we introduce express as our web server so we won't need webpack to host it.

`npm install --save-dev mini-css-extract-plugin`

`"client:build": "webpack --config webpack.client.build.config.js"`

add `webpack.client.build.config.js`.

Change

- mode to be production
- require mini-css plugin
- replace current css rule
- remove entire dev-server property.

when running `npm run client:build` it will create a production ready JS and CSS bundle.

This is the end of the basic react set-up.

### Useful Development Tools

- Chrome react developer tools

- webpack bundle analyser

`npm install --save-dev webpack-bundle-analyser`

- `"stats":`
- `"analyze":`

## Setting Up GraphQL with Express.js

- Express.js installation
- Routing in Express.js
- Binding Apollo Server to GrraphQL endpoint
- Serving static assets with express
- backend debugging and logging

### Node.js and Express.js

- Set up a GraphQL API that is consumed bu our frontend
- To accept network requests, we are going to set up a webserver

`npm install --save express`

### Running Express.js in Development

To launch the server we need to add a script.

install nodemon

install `@babel/node` to transpile the backend

now run `npm run server`.

Go to `http://localhost:8000` you will see hello world

### Routing in Express.js

Routing stands for how an application responds to specific endpoints and methods.

in express, one path can respond to different HTTP methods and can have multiple handler functions. These handler functions are executed one by one in order that they are defined.

A path can be a simple string but also a regex if needed.

if you pass multiple handler functions, be sure to pass `next` and you can hand over the execution of one handler function to the next.

### serving our production build

We can serve our production build of the front end through express.js. This approach is not great for development purposes but is useful for testing the build process and seeing how our live application will act.

### express middleware

Every middleware function receives a res, req and next.

middleware allows us to pre or post process the request or response object.

Express can have multiple routes for the same path and HTTP method. middleware can help decide which one to use.

important middleware:

-compression
-cors
-helmet

### combining express with apollo

install `apollo-server-express` `graphql` and `graphql-tools`.

Apollo offers an express.js specific package that integrates itself into the web server. In some scenarios, you may want to offer non-graphql routes.

import required gql packages.

import resolvers and schema.

The GraphQL schema is the representation of the API, that is, the data and function a client can request or run. Resolver functions are the implementation of the Schema. Both need to match 100%.

The `makeExecutableSchema` function from graphql-tools package merges the graphql schema and the resolver functions.

We pass this as a `schema` parameter to the Apollo Server. The context property of which contains the `request` object of Express.js so that we can access the request object in our resolver functions if we need to.

### Writing a graphql schema

The schema in schema.js is a basic schema which would at least be able to serve the fake posts array from chapter 1 excluding the users.

First we define a new type called Post. Post has an id of type int and text which is a string.

For our GraphQL server we need a type of RootQuery. The RootQuery type wraps all of the queries a client can run.

The first query we will have is going to return an array of all the posts we have got.

At the end we add the RootQuery to the schema property this type is the starting point for the Apollo server.
