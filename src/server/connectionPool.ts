const mysql = require("mysql");

const user = "root";
const password = "root";
const database = "nadoholod";
const host = "localhost";

export const connectionPool = mysql.createPool({
  host: host,
  user: user,
  password: password,
  database: database,
  multipleStatements: true,
});
