"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAttributes = exports.getAttributes = void 0;
var connectionPool_1 = require("../../connectionPool");
var mysql = require("mysql");
var getAttributes = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM attributes", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Аттрибуты не найдены",
                    error: error,
                });
            }
            else {
                var attributes = data;
                return response.json(attributes);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить аттрибуты",
            error: error,
        });
    }
};
exports.getAttributes = getAttributes;
var addAttributes = function (request, response) {
    try {
        var sql_1 = "DELETE FROM attributes;";
        var values_1 = [];
        request.body.params.attributes.forEach(function (attribute) {
            sql_1 += "INSERT INTO attributes (??, ??) VALUES (?, ?); ";
            values_1.push("id", "attribute", attribute.id, attribute.attribute);
        });
        var query = mysql.format(sql_1, values_1);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Не удалось сохранить аттрибуты",
                    error: error,
                });
            }
            else {
                return response.status(200).json({ success: true });
            }
        });
    }
    catch (error) {
        response.status(500).json({
            success: false,
            message: "Не удалось сохранить аттрибуты",
            error: error,
        });
    }
};
exports.addAttributes = addAttributes;
