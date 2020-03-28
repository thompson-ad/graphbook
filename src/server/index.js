import express from "express";

const app = express();

// going to https://localhost:8000 now will show first and second function in the terminal.

// if you remove next() the browser will time out
app.get(
  "/",
  (req, res, next) => {
    console.log("first function");
    next();
  },
  (req, res) => {
    console.log("second function");
    res.send("hello world");
  }
);

app.listen(8000, () => console.log("listening on port 8000!"));
