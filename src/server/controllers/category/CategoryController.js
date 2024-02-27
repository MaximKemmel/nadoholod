"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.addCategory = exports.getCategories = void 0;
var connectionPool_1 = require("../../connectionPool");
var mysql = require("mysql");
var getCategories = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM categories; SELECT * FROM category_attributes;", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Категории не найдены",
                    error: error,
                });
            }
            else {
                var categories = data[0];
                var categoryAttributes_1 = data[1];
                var categoriesList_1 = [];
                categories.forEach(function (category) {
                    categoriesList_1.push(__assign(__assign({}, category), { attributes: categoryAttributes_1.filter(function (attribute) { return attribute.category_id === category.id; }) }));
                });
                return response.json(categoriesList_1);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить категории",
            error: error,
        });
    }
};
exports.getCategories = getCategories;
var addCategory = function (request, response) {
    try {
        var sql = "INSERT INTO categories (??, ??, ??, ??) VALUES (?, ?, ?, ?);";
        var query = mysql.format(sql, [
            "parent_id",
            "category",
            "description",
            "img_path",
            request.body.params.category.parent_id,
            request.body.params.category.category,
            request.body.params.category.description,
            request.body.params.category.img_path,
        ]);
        connectionPool_1.connectionPool.query(query, function (error, data) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Не удалось добавить категорию",
                    error: error,
                });
            }
            else {
                var category_id_1 = data["insertId"];
                var sqlSecond_1 = "DELETE FROM category_attributes WHERE ?? = ?; ";
                var values_1 = ["category_id", category_id_1];
                request.body.params.category.attributes.forEach(function (attribute) {
                    sqlSecond_1 += "INSERT INTO category_attributes (??, ??) VALUES (?, ?); ";
                    values_1.push("category_id", "attribute_id", category_id_1, attribute.attribute_id);
                });
                var query_1 = mysql.format(sqlSecond_1, values_1);
                connectionPool_1.connectionPool.query(query_1, function (error) {
                    if (error) {
                        return response.status(404).json({
                            success: false,
                            message: "Ошибка при добавлении категории",
                            error: error,
                        });
                    }
                    else {
                        return response.status(200).json({ success: true });
                    }
                });
            }
        });
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            success: false,
            message: "Ошибка при добавлении категории",
            error: error,
        });
    }
};
exports.addCategory = addCategory;
var updateCategory = function (request, response) {
    try {
        var sql = "UPDATE categories SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?;";
        var query = mysql.format(sql, [
            "parent_id",
            request.body.params.category.parent_id,
            "category",
            request.body.params.category.category,
            "description",
            request.body.params.category.description,
            "img_path",
            request.body.params.category.img_path,
            "id",
            request.body.params.category.id,
        ]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Не удалось добавить категорию",
                    error: error,
                });
            }
            else {
                var sqlSecond_2 = "DELETE FROM category_attributes WHERE ?? = ?; ";
                var values_2 = ["category_id", request.body.params.category.id];
                request.body.params.category.attributes.forEach(function (attribute) {
                    sqlSecond_2 += "INSERT INTO category_attributes (??, ??) VALUES (?, ?); ";
                    values_2.push("category_id", "attribute_id", request.body.params.category.id, attribute.attribute_id);
                });
                var query_2 = mysql.format(sqlSecond_2, values_2);
                connectionPool_1.connectionPool.query(query_2, function (error) {
                    if (error) {
                        return response.status(404).json({
                            success: false,
                            message: "Ошибка при обновлении категории",
                            error: error,
                        });
                    }
                    else {
                        return response.status(200).json({ success: true });
                    }
                });
            }
        });
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            success: false,
            message: "Ошибка при добавлении категории",
            error: error,
        });
    }
};
exports.updateCategory = updateCategory;
var deleteCategory = function (request, response) {
    try {
        var sql = "DELETE FROM categories WHERE ?? = ?;";
        var query = mysql.format(sql, ["id", request.body.params.category.id]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Не удалось удалить категорию",
                    error: error,
                });
            }
            else {
                return response.status(200).json({ success: true });
            }
        });
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            success: false,
            message: "Ошибка при удалении категории",
            error: error,
        });
    }
};
exports.deleteCategory = deleteCategory;
