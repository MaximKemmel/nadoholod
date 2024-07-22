import checkAuth from "./src/utils/checkAuth";

import {
  CategoryController,
  ProductController,
  AttributeController,
  FilterController,
  UserController,
  ManufacturerController,
  MailController,
  SecondaryInfoController,
} from "./src/server/index";

const express = require("express");
const multer = require("multer");
const fs = require("fs-extra");
const bodyParser = require("body-parser");
const path = require("path");

const port = 8787;

const app = express();
let fileName = "";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    let type = req.params.type;
    let path = `./uploads/${type}`;
    fs.mkdirsSync(path);
    callback(null, path);
  },
  filename: (req, file, cb) => {
    fileName = `im${String(Date.now())}.${file.originalname.split(".")[file.originalname.split(".").length - 1]}`;
    if (req.params.type === "instructions") {
      fileName = `in${String(Date.now())}${file.originalname}`;
    }
    cb(null, fileName);
  },
});

const upload = multer({ storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/upload/:type", checkAuth, upload.single("file"), (req, res) => {
  res.json({
    url: `/${req.params.type}/${fileName}`,
  });
});

app.post("/api/login", UserController.login);
app.get("/api/authme", checkAuth, UserController.authMe);

app.get("/api/categories", CategoryController.getCategories);
app.post("/api/add_category", checkAuth, CategoryController.addCategory);
app.post("/api/update_category", checkAuth, CategoryController.updateCategory);
app.post("/api/delete_category", checkAuth, CategoryController.deleteCategory);

app.get("/api/products", ProductController.getProducts);
app.post("/api/add_product", checkAuth, ProductController.addProduct);
app.post("/api/update_product", checkAuth, ProductController.updateProduct);
app.post("/api/delete_product", checkAuth, ProductController.deleteProduct);

app.get("/api/attributes", AttributeController.getAttributes);
app.post("/api/add_attributes", checkAuth, AttributeController.addAttributes);
app.post("/api/update_attribute_position", checkAuth, AttributeController.updateAttributePosition);

app.get("/api/filters", FilterController.getFilters);
app.post("/api/add_filter", checkAuth, FilterController.addFilter);
app.post("/api/update_filter", checkAuth, FilterController.updateFilter);
app.post("/api/delete_filter", checkAuth, FilterController.deleteFilter);
app.post("/api/update_filter_position", checkAuth, FilterController.updateFilterPosition);

app.get("/api/manufacturers", ManufacturerController.getManufacturers);
app.post("/api/add_manufacturer", checkAuth, ManufacturerController.addManufacturer);
app.post("/api/update_manufacturer", checkAuth, ManufacturerController.updateManufacturer);
app.post("/api/delete_manufacturer", checkAuth, ManufacturerController.deleteManufacturer);

app.post("/api/send_mail", MailController.sendMail);

app.get("/api/secondary_info", SecondaryInfoController.getSecondaryInfo);
app.post("/api/update_secondary_info", checkAuth, SecondaryInfoController.updateSecondaryInfo);

app.use(express.static(path.join(__dirname, "dist")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log("Server is running");
});
