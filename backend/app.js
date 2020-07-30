"use strict";

// Middleware Imports

const express = require("express");
require("dotenv").config();
const sanitizeMiddleware = require("sanitize-middleware");

// Validators
// const validator = require("validator");

// App security
const helmet = require("helmet");
const toobusy = require("toobusy-js");
const bouncer = require("express-bouncer")(10000, 600000, 5);

// App Routes
// const userRoutes = require("./routes/user-routes");
const postRoutes = require("./routes/post-routes");

// Initialize express App

const app = express();

// Helmet Middleware

app.use(helmet());

// CORS Control Headers

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Bouncer Middleware

bouncer.blocked = function (req, res, next, remaining) {
  res.send(
    429,
    "Too many requests have been made, " +
      "please wait " +
      remaining / 1000 +
      " seconds"
  );
};

// Too Busy Middleware

app.use(function (req, res, next) {
  if (toobusy()) {
    // log if you see necessary
    res.status(503).send("Server Too Busy");
  } else {
    next();
  }
});

// Express Parser Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sanitize Middleware

app.use(sanitizeMiddleware());

// Access Routes

// app.use("/images", express.static(path.join(__dirname, "images")));
// app.use("/auth", userRoutes);
app.use("/posts", postRoutes);

// App Execution

module.exports = app;
