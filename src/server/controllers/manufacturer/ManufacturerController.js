"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteManufacturer = exports.updateManufacturer = exports.addManufacturer = exports.getManufacturers = void 0;
var connectionPool_1 = require("../../connectionPool");
var mysql = require("mysql");
var getManufacturers = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM manufacturers", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Производители не найдены",
                    error: error,
                });
            }
            else {
                var manufacturers = data;
                return response.json(manufacturers);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить производителей",
            error: error,
        });
    }
};
exports.getManufacturers = getManufacturers;
var addManufacturer = function (request, response) {
    try {
        var sql = "INSERT INTO manufacturers (??, ??) VALUES (?, ?);";
        var query = mysql.format(sql, [
            "manufacturer",
            "image_path",
            request.body.params.manufacturer.manufacturer,
            request.body.params.manufacturer.image_path,
        ]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Не удалось добавить производителя",
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
            message: "Ошибка при добавлении производителя",
            error: error,
        });
    }
};
exports.addManufacturer = addManufacturer;
var updateManufacturer = function (request, response) {
    try {
        var sql = "UPDATE manufacturers SET ?? = ?, ?? = ? WHERE ?? = ?;";
        var query = mysql.format(sql, [
            "manufacturer",
            request.body.params.manufacturer.manufacturer,
            "image_path",
            request.body.params.manufacturer.image_path,
            "id",
            request.body.params.manufacturer.id,
        ]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Не удалось обновить производителя",
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
            message: "Ошибка при обновлении производителя",
            error: error,
        });
    }
};
exports.updateManufacturer = updateManufacturer;
var deleteManufacturer = function (request, response) {
    try {
        var sql = "DELETE FROM manufacturers WHERE ?? = ?;";
        var query = mysql.format(sql, ["id", request.body.params.manufacturer.id]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Не удалось удалить производителя",
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
            message: "Ошибка при удалении производителя",
            error: error,
        });
    }
};
exports.deleteManufacturer = deleteManufacturer;
