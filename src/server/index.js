import express from "express";
import path from "path";
import helmet from "helmet";
import cors from "cors";
import compress from "compression";

const root = path.join(__dirname, "../../");

const app = express();

// Middleware - helmet
// helmet is a tool that allows you to set various HTTP headers to secure your application

// we add some XSS(cross-site scripting) protection tactics and remove the x-powered-by HTTP header and some other useful things just by helmet() in the first line

// to ensure that no one can inject malicious code, we are using the content-security-policy HTTP header or, in-short, CSP. This Header prevents attackers from loading resources from external urls.

// imgSrc makes sure that only images from amazonaws can be loaded.

// referrerPolicy - this sets the Referrer HTTP header only when making requests on the same host. When going from domain A to B, for example we fo not include the referrer, which is the url the user is coming from. This stops any internal routing or requests from being exposed to the internet.

// it is important to implement this very high to ensure all requests are affected.
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "unsafe-inline"],
      imgSrc: ["'self'", "data:", "*.amazonaws.com"]
    }
  })
);
app.use(helmet.referrerPolicy({ policy: "same-origin" }));

// Middleware - compression
// saves you and your user bandwidth.
// this middleware compresses all responses going through it
app.use(compress());

// Middleware - CORS
// we want our GraphQL API to be available from any website, app or system.
// When using APIs via AJAX, the main problem is that the API needs to send the correct Access-Control-Origin header.
// allow CORS(cross origin resource sharing) with the below.
app.use(cors());

// Middleware - serve static files
app.use("/", express.static(path.join(root, "dist/client")));
app.use("/uploads", express.static(path.join(root, "uploads")));

app.get("/", (req, res) => {
  res.sendFile(path.join(root, "/dist/client/index.html"));
});

app.listen(8000, () => console.log("listening on port 8000!"));
