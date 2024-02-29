"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManufacturers = void 0;
var connectionPool_1 = require("../../connectionPool");
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
