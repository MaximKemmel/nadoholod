"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttributes = void 0;
var connectionPool_1 = require("../../connectionPool");
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
