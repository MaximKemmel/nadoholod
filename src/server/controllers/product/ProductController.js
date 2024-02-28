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
exports.getProducts = void 0;
var connectionPool_1 = require("../../connectionPool");
var getProducts = function (_request, response) {
    try {
        connectionPool_1.connectionPool.query("SELECT * FROM products; SELECT * FROM product_images; SELECT * FROM product_attributes;", function (error, data) {
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
                var productsList_1 = [];
                products.forEach(function (product) {
                    productsList_1.push(__assign(__assign({}, product), { images: productImages_1.filter(function (image) { return image.product_id === product.id; }), attributes: productAttributes_1.filter(function (attribute) { return attribute.product_id === product.id; }) }));
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
