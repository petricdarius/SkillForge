const morgan = require("morgan");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

const express = require("express");
const path = require("path");

const app = express();

app.enable("trust proxy");

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello" });
});

const port = process.env.BE_PORT;

const limiter = rateLimit({
  //100 requests, from the same ip, in ONE hour
  max: 100,
  windowMs: 60 * 60 * 1000,
  //Error message
  message: "Too many requests from this IP! Please try again in one hour.",
});

app.use(
  express.json({
    limit: "10kb",
  }),
);
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  }),
);

app.use(mongoSanitize());

app.use(xss());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", limiter);

app.all(/.*/, (req, res, next) => {
  console.log("Route not defined");
  next();
});

module.exports = app;
