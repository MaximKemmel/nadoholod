"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.addCategory = exports.getCategories = void 0;
var connectionPool_1 = require("../../connectionPool");
var mysql = require("mysql");
var getCategories = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM categories", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Категории не найдены",
                    error: error,
                });
            }
            else {
                var categories = data;
                return response.json(categories);
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
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Не удалось добавить категорию",
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
                return response.status(200).json({ success: true });
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
