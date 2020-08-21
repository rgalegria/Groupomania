"use strict";

// Middleware Imports

const express = require("express");
require("dotenv").config();
const sanitizeMiddleware = require("sanitize-middleware");
// const passport = require("passport");
const session = require("express-session");

// App security
const helmet = require("helmet");
const toobusy = require("toobusy-js");
const bouncer = require("express-bouncer")(10000, 600000, 5);

// App Routes
const signupRoutes = require("./routes/signup-route");
const loginRoutes = require("./routes/login-route");
const userRoutes = require("./routes/user-routes");
const postRoutes = require("./routes/posts-routes");

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
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

// Bouncer Middleware

bouncer.blocked = function (req, res, next, remaining) {
    res.send(429, "Too many requests have been made, " + "please wait " + remaining / 1000 + " seconds");
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

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        // store: sessionStore,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
        },
    })
);

// Express Parser Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport Init. Middleware

// require("./config/passport");

// app.use(passport.initialize());
// app.use(passport.session());

// Test Session Middleware

// app.use((req, res, next) => {
//   console.log(req.session);
//   console.log(req.user);
//   next();
// });

// Sanitize Middleware

app.use(sanitizeMiddleware());

// Access Routes

app.use("/signup", signupRoutes);
app.use("/login", loginRoutes);
app.use("/user", userRoutes);
app.use("/posts", postRoutes);
// app.use("/images", express.static(path.join(__dirname, "images")));

// App Execution

module.exports = app;
