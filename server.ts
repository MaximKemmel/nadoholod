import checkAuth from "./src/utils/checkAuth";

import { CategoryController, UserController } from "./src/server/index";

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const port = 8787;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/login", UserController.login);
app.get("/api/authme", checkAuth, UserController.authMe);

app.get("/api/categories", CategoryController.getCategories);

app.use(express.static(path.join(__dirname, "dist")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log("Server is running");
});
