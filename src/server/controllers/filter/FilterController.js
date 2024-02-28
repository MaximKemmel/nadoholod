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
exports.deleteFilter = exports.updateFilter = exports.addFilter = exports.getFilters = void 0;
var connectionPool_1 = require("../../connectionPool");
var mysql = require("mysql");
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
var addFilter = function (request, response) {
    try {
        var sql = "INSERT INTO filters (??) VALUES (?);";
        var query = mysql.format(sql, ["filter", request.body.params.filter.filter]);
        connectionPool_1.connectionPool.query(query, function (error, data) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Не удалось добавить фильтр",
                    error: error,
                });
            }
            else {
                var filter_id_1 = data["insertId"];
                var sqlSecond_1 = "DELETE FROM filter_items WHERE ?? = ?; ";
                var values_1 = ["filter_id", filter_id_1];
                request.body.params.filter.items.forEach(function (item) {
                    sqlSecond_1 += "INSERT INTO filter_items (??, ??) VALUES (?, ?); ";
                    values_1.push("filter_id", "filter_item", filter_id_1, item.filter_item);
                });
                var query_1 = mysql.format(sqlSecond_1, values_1);
                connectionPool_1.connectionPool.query(query_1, function (error) {
                    if (error) {
                        return response.status(404).json({
                            success: false,
                            message: "Ошибка при добавлении фильтра",
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
exports.addFilter = addFilter;
var updateFilter = function (request, response) {
    try {
        var sql = "UPDATE filters SET ?? = ? WHERE ?? = ?;";
        var query = mysql.format(sql, ["filter", request.body.params.filter.filter, "id", request.body.params.filter.id]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Не удалось добавить категорию",
                    error: error,
                });
            }
            else {
                var sqlSecond_2 = "DELETE FROM filter_items WHERE ?? = ?; ";
                var values_2 = ["filter_id", request.body.params.filter.id];
                request.body.params.filter.items.forEach(function (item) {
                    sqlSecond_2 += "INSERT INTO filter_items (??, ??) VALUES (?, ?); ";
                    values_2.push("filter_id", "filter_item", request.body.params.filter.id, item.filter_item);
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
exports.updateFilter = updateFilter;
var deleteFilter = function (request, response) {
    try {
        var sql = "DELETE FROM filters WHERE ?? = ?; DELETE FROM filter_items WHERE ?? = ?;";
        var query = mysql.format(sql, ["id", request.body.params.filter.id, "filter_id", request.body.params.filter.id]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Не удалось удалить фильтр",
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
            message: "Ошибка при удалении фильтра ",
            error: error,
        });
    }
};
exports.deleteFilter = deleteFilter;
