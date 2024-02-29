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
exports.deleteProduct = exports.updateProduct = exports.addProduct = exports.getProducts = void 0;
var connectionPool_1 = require("../../connectionPool");
var mysql = require("mysql");
var getProducts = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM products; SELECT * FROM product_images; SELECT * FROM product_attributes; SELECT * FROM product_filters", function (error, data) {
            if (error) {
                return response.status(404).json({
                    message: "Товары не найдены",
                    error: error,
                });
            }
            else {
                var products = data[0];
                var productImages_1 = data[1];
                var productAttributes_1 = data[2];
                var productFilters_1 = data[3];
                var productsList_1 = [];
                products.forEach(function (product) {
                    productsList_1.push(__assign(__assign({}, product), { images: productImages_1.filter(function (image) { return image.product_id === product.id; }), attributes: productAttributes_1.filter(function (attribute) { return attribute.product_id === product.id; }), filters: productFilters_1.filter(function (filter) { return filter.product_id === product.id; }) }));
                });
                return response.json(productsList_1);
            }
        });
    }
    catch (error) {
        response.status(500).json({
            message: "Не удалось получить товары",
            error: error,
        });
    }
};
exports.getProducts = getProducts;
var addProduct = function (request, response) {
    try {
        var sql = "INSERT INTO products (??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
        var query = mysql.format(sql, [
            "category_id",
            "name",
            "description",
            "full_description",
            "price",
            "delivery_info",
            "instruction_path",
            "manufacturer_id",
            request.body.params.product.category_id,
            request.body.params.product.name,
            request.body.params.product.description,
            request.body.params.product.full_description,
            request.body.params.product.price,
            request.body.params.product.delivery_info,
            request.body.params.product.instruction_path,
            request.body.params.product.manufacturer_id,
        ]);
        connectionPool_1.connectionPool.query(query, function (error, data) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Не удалось добавить товар",
                    error: error,
                });
            }
            else {
                var product_id_1 = data["insertId"];
                var sqlSecond_1 = "DELETE FROM product_images WHERE ?? = ?; DELETE FROM product_attributes WHERE ?? = ?; DELETE FROM product_filters WHERE ?? = ?;";
                var values_1 = ["product_id", product_id_1, "product_id", product_id_1, "product_id", product_id_1];
                request.body.params.product.images.forEach(function (image) {
                    sqlSecond_1 += "INSERT INTO product_images (??, ??, ??) VALUES (?, ?, ?); ";
                    values_1.push("product_id", "path", "is_main", product_id_1, image.path, image.is_main);
                });
                request.body.params.product.attributes.forEach(function (attribute) {
                    sqlSecond_1 += "INSERT INTO product_attributes (??, ??, ??) VALUES (?, ?, ?); ";
                    values_1.push("product_id", "attribute_id", "value", product_id_1, attribute.attribute_id, attribute.value);
                });
                request.body.params.product.filters.forEach(function (filter) {
                    sqlSecond_1 += "INSERT INTO product_filters (??, ??, ??) VALUES (?, ?, ?); ";
                    values_1.push("product_id", "filter_id", "filter_item_id", product_id_1, filter.filter_id, filter.filter_item_id);
                });
                var query_1 = mysql.format(sqlSecond_1, values_1);
                connectionPool_1.connectionPool.query(query_1, function (error) {
                    if (error) {
                        return response.status(404).json({
                            success: false,
                            message: "Ошибка при добавлении товара",
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
            message: "Ошибка при добавлении товара",
            error: error,
        });
    }
};
exports.addProduct = addProduct;
var updateProduct = function (request, response) {
    try {
        var sql = "UPDATE products SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?;";
        var query = mysql.format(sql, [
            "category_id",
            request.body.params.product.category_id,
            "name",
            request.body.params.product.name,
            "description",
            request.body.params.product.description,
            "full_description",
            request.body.params.product.full_description,
            "price",
            request.body.params.product.price,
            "delivery_info",
            request.body.params.product.delivery_info,
            "instruction_path",
            request.body.params.product.instruction_path,
            "manufacturer_id",
            request.body.params.product.manufacturer_id,
            "id",
            request.body.params.product.id,
        ]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Не удалось обновить товар",
                    error: error,
                });
            }
            else {
                var sqlSecond_2 = "DELETE FROM product_images WHERE ?? = ?; DELETE FROM product_attributes WHERE ?? = ?; DELETE FROM product_filters WHERE ?? = ?;";
                var values_2 = [
                    "product_id",
                    request.body.params.product.id,
                    "product_id",
                    request.body.params.product.id,
                    "product_id",
                    request.body.params.product.id,
                ];
                request.body.params.product.images.forEach(function (image) {
                    sqlSecond_2 += "INSERT INTO product_images (??, ??, ??) VALUES (?, ?, ?); ";
                    values_2.push("product_id", "path", "is_main", request.body.params.product.id, image.path, image.is_main);
                });
                request.body.params.product.attributes.forEach(function (attribute) {
                    sqlSecond_2 += "INSERT INTO product_attributes (??, ??, ??) VALUES (?, ?, ?); ";
                    values_2.push("product_id", "attribute_id", "value", request.body.params.product.id, attribute.attribute_id, attribute.value);
                });
                request.body.params.product.filters.forEach(function (filter) {
                    sqlSecond_2 += "INSERT INTO product_filters (??, ??, ??) VALUES (?, ?, ?); ";
                    values_2.push("product_id", "filter_id", "filter_item_id", request.body.params.product.id, filter.filter_id, filter.filter_item_id);
                });
                var query_2 = mysql.format(sqlSecond_2, values_2);
                connectionPool_1.connectionPool.query(query_2, function (error) {
                    if (error) {
                        return response.status(404).json({
                            success: false,
                            message: "Ошибка при обновлении товара",
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
            message: "Ошибка при добавлении товара",
            error: error,
        });
    }
};
exports.updateProduct = updateProduct;
var deleteProduct = function (request, response) {
    try {
        var sql = "DELETE FROM products WHERE ?? = ?; DELETE FROM product_images WHERE ?? = ?; DELETE FROM product_attributes WHERE ?? = ?; DELETE FROM product_filters WHERE ?? = ?;";
        var query = mysql.format(sql, [
            "id",
            request.body.params.product.id,
            "product_id",
            request.body.params.product.id,
            "product_id",
            request.body.params.product.id,
            "product_id",
            request.body.params.product.id,
        ]);
        connectionPool_1.connectionPool.query(query, function (error) {
            if (error) {
                return response.status(404).json({
                    success: false,
                    message: "Не удалось удалить товар",
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
            message: "Ошибка при удалении товара",
            error: error,
        });
    }
};
exports.deleteProduct = deleteProduct;
