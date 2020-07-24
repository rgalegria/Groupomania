const mysql = require("mysql");
let db = {};

// const pool = mysql.createPool({
//   host: "localhost",
//   port: "3306",
//   user: "root",
//   password: "123456",
//   database: "groupomania",
//   connectionLimit: 10,
// });

var connection = mysql.createConnection({
  host: "localhost",
  localAddress: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "",
  database: "groupomania",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// db.all = () => {
//   return new Promise((resolve, reject) => {
//     pool.query("SELECT * FROM posts", (err, results) => {
//       if (err) {
//         return reject(err);
//       }
//       return resolve(results);
//     });
//   });
// };

module.exports = db;
