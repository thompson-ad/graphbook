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
