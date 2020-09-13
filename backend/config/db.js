const mysql = require("mysql");

// Pool de conexion
const db = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWD,
    database: process.env.SQL_DB,
});

// Test de conexion
db.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
    if (error) throw error;
    console.log("Connected successfully to MySQL DB !");
});

module.exports = db;
