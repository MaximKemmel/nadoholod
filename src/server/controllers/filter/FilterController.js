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
exports.getFilters = void 0;
var connectionPool_1 = require("../../connectionPool");
var getFilters = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM filters; SELECT * FROM filter_items;", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Фильтры не найдены",
                    error: error,
                });
            }
            else {
                var filters = data[0];
                var filterItems_1 = data[1];
                var filtersList_1 = [];
                filters.forEach(function (filter) {
                    filtersList_1.push(__assign(__assign({}, filter), { items: filterItems_1.filter(function (filterItem) { return filter.id === filterItem.filter_id; }) }));
                });
                return response.json(filtersList_1);
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
exports.getFilters = getFilters;
