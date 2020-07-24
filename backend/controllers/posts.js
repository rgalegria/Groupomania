"use strict";

const { createPool } = require("mysql");
// const { permittedCrossDomainPolicies } = require("helmet");
const db = require("../db");

// exports.getAllPosts = (req, res, next) => {
//   console.log("postman test", req.body);
//   pool
//     .query("SELECT * FROM posts")
//     .then((posts) => res.status(200).json(posts))
//     .catch((error) => res.status(400).json({ error }));
// };

exports.getAllPosts = async (req, res, next) => {
  let results = await db.all();
  console
    .log("results", results)
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};
