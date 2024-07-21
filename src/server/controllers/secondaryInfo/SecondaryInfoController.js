"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSecondaryInfo = exports.getSecondaryInfo = void 0;
var connectionPool_1 = require("../../connectionPool");
var mysql = require("mysql");
var getSecondaryInfo = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM secondary_info", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Второстепенная информация не найдена",
                    error: error,
                });
            }
            else {
                var secondaryInfo = data;
                return response.json(secondaryInfo);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить второстепенную информацию",
            error: error,
        });
    }
};
exports.getSecondaryInfo = getSecondaryInfo;
var updateSecondaryInfo = function (request, response) {
    try {
        var sql = "UPDATE secondary_info SET ?? = ?, ?? = ?, ?? = ? WHERE id = 1;";
        var query = mysql.format(sql, [
            "chillers_count",
            request.body.params.secondary_info.chillers_count,
            "cameras_count",
            request.body.params.secondary_info.cameras_count,
            "generators_count",
            request.body.params.secondary_info.generators_count,
        ]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Не удалось обновить второстепенную информацию",
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
            message: "Ошибка при обновлении второстепенной информации",
            error: error,
        });
    }
};
exports.updateSecondaryInfo = updateSecondaryInfo;
