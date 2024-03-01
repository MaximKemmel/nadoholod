const mysql = require("mysql");

const user = "root";
const password = "root";
const database = "nadoholod";
const host = "localhost";

//const user = "default-db";
//const password = "Rn7DtPAT&gaH";
//const database = "default-db";
//const host: "10.16.0.1";

export const connectionPool = mysql.createPool({
  host: host,
  user: user,
  password: password,
  database: database,
  multipleStatements: true,
});
