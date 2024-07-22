"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAttributePosition = exports.addAttributes = exports.getAttributes = void 0;
var connectionPool_1 = require("../../connectionPool");
var mysql = require("mysql");
var getAttributes = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM attributes ORDER BY position DESC", function (error, data) {
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
            sql_1 += "INSERT INTO attributes (??, ??, ??, ??) VALUES (?, ?, ?, ?); ";
            values_1.push("id", "attribute", "is_main", "position", attribute.id, attribute.attribute, attribute.is_main, attribute.position);
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
var updateAttributePosition = function (request, response) {
    try {
        var sql = "UPDATE attributes SET ?? = ? WHERE ?? = ?; UPDATE attributes SET ?? = ? WHERE ?? = ?;";
        var query = mysql.format(sql, [
            "position",
            request.body.params.old_position,
            "position",
            request.body.params.attribute.position,
            "position",
            request.body.params.attribute.position,
            "id",
            request.body.params.attribute.id,
        ]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Не удалось обновить позицию аттрибута",
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
            message: "Ошибка при обновлении позиции аттрибута",
            error: error,
        });
    }
};
exports.updateAttributePosition = updateAttributePosition;
