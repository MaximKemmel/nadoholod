"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkAuth_1 = require("./src/utils/checkAuth");
var index_1 = require("./src/server/index");
var express = require("express");
var multer = require("multer");
var fs = require("fs-extra");
var bodyParser = require("body-parser");
var path = require("path");
var port = 8787;
var app = express();
var fileName = "";
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var type = req.params.type;
        var path = "./uploads/".concat(type);
        fs.mkdirsSync(path);
        callback(null, path);
    },
    filename: function (_, file, cb) {
        fileName = "ct".concat(String(Date.now()), ".").concat(file.originalname.split(".")[file.originalname.split(".").length - 1]);
        cb(null, fileName);
    },
});
var upload = multer({ storage: storage });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/upload/:type", checkAuth_1.default, upload.single("file"), function (req, res) {
    res.json({
        url: "/".concat(req.params.type, "/").concat(fileName),
    });
});
app.post("/api/login", index_1.UserController.login);
app.get("/api/authme", checkAuth_1.default, index_1.UserController.authMe);
app.get("/api/categories", index_1.CategoryController.getCategories);
app.post("/api/add_category", checkAuth_1.default, index_1.CategoryController.addCategory);
app.post("/api/update_category", checkAuth_1.default, index_1.CategoryController.updateCategory);
app.post("/api/delete_category", checkAuth_1.default, index_1.CategoryController.deleteCategory);
app.get("/api/products", index_1.ProductController.getProducts);
app.use(express.static(path.join(__dirname, "dist")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.listen(port, function () {
    console.log("Server is running");
});
