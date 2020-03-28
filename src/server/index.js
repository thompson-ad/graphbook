import express from "express";
import path from "path";

// the path module offers many functionalities for working with directory structures

// using the global __dirname variable to get our projects root directory
// the variable hold the path of the current file, using path.join with ../../ gives us the real root.

const root = path.join(__dirname, "../../");

const app = express();

// express provides the .use method which runs a series of commands when a given path matches
// if no path is given it runs for every request
// we use this feature to serve our static files which include bundle.js and bundle.css created by npm run client:build

app.use("/", express.static(path.join(root, "dist/client")));
app.use("/uploads", express.static(path.join(root, "uploads")));

app.get("/", (req, res) => {
  res.sendFile(path.join(root, "/dist/client/index.html"));
});

app.listen(8000, () => console.log("listening on port 8000!"));
