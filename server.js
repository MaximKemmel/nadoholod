var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var port = 8787;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.listen(port, function () {
    console.log("Server is running");
});
