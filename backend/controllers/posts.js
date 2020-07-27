"use strict";

const db = require("../db");

// GET all Posts Controller

// exports.getAllPosts = (req, res, next) => {
//   db.getSession()
//     .then((session) => {
//       return Promise.all([
//         session.sql("CREATE TABLE groupomania.bar (_id SERIAL)").execute(),
//         session.sql("CREATE TABLE groupomania.baz (_id SERIAL)").execute(),
//       ]).then(() => session.getSchema("groupomania"));
//     })
//     .then((schema) => {
//       return schema.getTables();
//     })
//     .then((tables) => {
//       console.log(tables[0].getName()); // 'bar'
//       console.log(tables[1].getName()); // 'baz'
//     })
//     .catch((error) => {
//       res.status(400).json({ error });
//     });
// };

exports.getAllPosts = (req, res, next) => {
  db.getSession()
    .then((session) => {
      session.sql("SELECT * FROM groupomania.posts LIMIT 0, 1000").execute();
      then((table) => {
        res.status(200).json(table);
      });
      // return session.close();
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
