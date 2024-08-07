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
    filename: function (req, file, cb) {
        fileName = "im".concat(String(Date.now()), ".").concat(file.originalname.split(".")[file.originalname.split(".").length - 1]);
        if (req.params.type === "instructions") {
            fileName = "in".concat(String(Date.now())).concat(file.originalname);
        }
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
app.post("/api/add_product", checkAuth_1.default, index_1.ProductController.addProduct);
app.post("/api/update_product", checkAuth_1.default, index_1.ProductController.updateProduct);
app.post("/api/delete_product", checkAuth_1.default, index_1.ProductController.deleteProduct);
app.get("/api/attributes", index_1.AttributeController.getAttributes);
app.post("/api/add_attributes", checkAuth_1.default, index_1.AttributeController.addAttributes);
app.post("/api/update_attribute_position", checkAuth_1.default, index_1.AttributeController.updateAttributePosition);
app.get("/api/filters", index_1.FilterController.getFilters);
app.post("/api/add_filter", checkAuth_1.default, index_1.FilterController.addFilter);
app.post("/api/update_filter", checkAuth_1.default, index_1.FilterController.updateFilter);
app.post("/api/delete_filter", checkAuth_1.default, index_1.FilterController.deleteFilter);
app.post("/api/update_filter_position", checkAuth_1.default, index_1.FilterController.updateFilterPosition);
app.get("/api/manufacturers", index_1.ManufacturerController.getManufacturers);
app.post("/api/add_manufacturer", checkAuth_1.default, index_1.ManufacturerController.addManufacturer);
app.post("/api/update_manufacturer", checkAuth_1.default, index_1.ManufacturerController.updateManufacturer);
app.post("/api/delete_manufacturer", checkAuth_1.default, index_1.ManufacturerController.deleteManufacturer);
app.post("/api/send_mail", index_1.MailController.sendMail);
app.get("/api/secondary_info", index_1.SecondaryInfoController.getSecondaryInfo);
app.post("/api/update_secondary_info", checkAuth_1.default, index_1.SecondaryInfoController.updateSecondaryInfo);
app.use(express.static(path.join(__dirname, "dist")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.listen(port, function () {
    console.log("Server is running");
});
