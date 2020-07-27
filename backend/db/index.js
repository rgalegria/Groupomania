const mysqlx = require("@mysql/xdevapi");

const db = mysqlx.getClient("root:@localhost:33060/groupomania");

db.getSession().then((session) => {
  console.log("Connected successfully to MySQL DB !");
  // console.log(session.inspect());
  // { user: 'root', host: 'localhost', port: 33060, pooling: true, ... }
});

module.exports = db;

// const config = {
//   password: "",
//   user: "root",
//   host: "localhost",
//   port: 33060,
//   schema: "groupomania",
// };

// const db = mysqlx.getSession(config).then((session) => {
//   console.log(session.inspect()); // { user: 'root', socket: '/path/to/socket' }
// });
