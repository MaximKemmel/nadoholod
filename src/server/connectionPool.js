"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionPool = void 0;
var mysql = require("mysql");
var user = "root";
var password = "";
var database = "nadoholod";
var host = "localhost";
exports.connectionPool = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: database,
    multipleStatements: true,
});
