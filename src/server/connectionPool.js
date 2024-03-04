"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionPool = void 0;
var mysql = require("mysql");
var user = "root";
var password = "root";
var database = "nadoholod";
var host = "localhost";
//const user = "default-db";
//const password = "Rn7DtPAT&gaH";
//const database = "default-db";
//const host = "10.16.0.1";
exports.connectionPool = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: database,
    multipleStatements: true,
});
