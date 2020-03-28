// we can use import here as our backend gets transpiled by babel
import express from "express";

// we initialise the server with the express() command and the result is stored in the app constant
// everything our backend does is executed through this object
const app = express();

// then we specify the routes that accept the requests
// for this straightforward intro we will accept all GET requests matching any path with app.get, other methods are catchable with app.put, app.post etc

// the first parameter is the path to match. After this you can provide an unlimited list of callback functions, which are executed one by one.

// the callbacks always receive the client request as the first and the response as the second which is sent by the server

app.get("*", (req, res) => res.send("hello world!"));

// The last piece to make our server publicly available is to tell express on which  port it should listen.

// the callback is then executed when the HTTP server binding has finished and requests can be accepted on this port

app.listen(8000, () => console.log("listening on port 8000!"));
