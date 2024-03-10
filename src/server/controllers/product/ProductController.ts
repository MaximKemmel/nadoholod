import { connectionPool } from "../../connectionPool";

import { IProduct } from "../../../types/product/product";
import { IProductImage } from "../../../types/product/productImage";
import { IProductAttribute } from "../../../types/product/productAttribute";
import { IProductFilter } from "../../../types/product/productFilter";

const mysql = require("mysql");

const getProducts = (_request, response) => {
  try {
    connectionPool.query(
      "SELECT * FROM products ORDER BY id DESC; SELECT * FROM product_images; SELECT * FROM product_attributes; SELECT * FROM product_filters",
      (error, data) => {
        if (error) {
          return response.status(404).json({
            message: "Товары не найдены",
            error: error,
          });
        } else {
          const products = data[0] as IProduct[];
          const productImages = data[1] as IProductImage[];
          const productAttributes = data[2] as IProductAttribute[];
          const productFilters = data[3] as IProductFilter[];
          const productsList = [] as IProduct[];
          products.forEach((product: IProduct) => {
            productsList.push({
              ...product,
              images: productImages.filter((image: IProductImage) => image.product_id === product.id) as IProductImage[],
              attributes: productAttributes.filter(
                (attribute: IProductAttribute) => attribute.product_id === product.id
              ) as IProductAttribute[],
              filters: productFilters.filter(
                (filter: IProductFilter) => filter.product_id === product.id
              ) as IProductFilter[],
            });
          });
          return response.json(productsList);
        }
      }
    );
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить товары",
      error: error,
    });
  }
};

const addProduct = (request, response) => {
  try {
    const sql = "INSERT INTO products (??, ??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    const query = mysql.format(sql, [
      "category_id",
      "name",
      "description",
      "full_description",
      "price",
      "delivery_info",
      "instruction_path",
      "manufacturer_id",
      "is_recomendated",
      "volume",
      request.body.params.product.category_id,
      request.body.params.product.name,
      request.body.params.product.description,
      request.body.params.product.full_description,
      request.body.params.product.price,
      request.body.params.product.delivery_info,
      request.body.params.product.instruction_path,
      request.body.params.product.manufacturer_id,
      request.body.params.product.is_recomendated,
      request.body.params.product.volume,
    ]);
    connectionPool.query(query, (error, data) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Не удалось добавить товар",
          error: error,
        });
      } else {
        const product_id = data["insertId"];
        let sqlSecond =
          "DELETE FROM product_images WHERE ?? = ?; DELETE FROM product_attributes WHERE ?? = ?; DELETE FROM product_filters WHERE ?? = ?;";
        const values = ["product_id", product_id, "product_id", product_id, "product_id", product_id] as string[];
        request.body.params.product.images.forEach((image) => {
          sqlSecond += "INSERT INTO product_images (??, ??, ??) VALUES (?, ?, ?); ";
          values.push("product_id", "path", "is_main", product_id, image.path, image.is_main);
        });
        request.body.params.product.attributes.forEach((attribute) => {
          sqlSecond += "INSERT INTO product_attributes (??, ??, ??) VALUES (?, ?, ?); ";
          values.push("product_id", "attribute_id", "value", product_id, attribute.attribute_id, attribute.value);
        });
        request.body.params.product.filters.forEach((filter) => {
          sqlSecond += "INSERT INTO product_filters (??, ??, ??) VALUES (?, ?, ?); ";
          values.push("product_id", "filter_id", "filter_item_id", product_id, filter.filter_id, filter.filter_item_id);
        });
        const query = mysql.format(sqlSecond, values);
        connectionPool.query(query, (error) => {
          if (error) {
            return response.status(404).json({
              success: false,
              message: "Ошибка при добавлении товара",
              error: error,
            });
          } else {
            return response.status(200).json({ success: true });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "Ошибка при добавлении товара",
      error: error,
    });
  }
};

const updateProduct = (request, response) => {
  try {
    const sql =
      "UPDATE products SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?;";
    const query = mysql.format(sql, [
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
      "is_recomendated",
      request.body.params.product.is_recomendated,
      "volume",
      request.body.params.product.volume,
      "id",
      request.body.params.product.id,
    ]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Не удалось обновить товар",
          error: error,
        });
      } else {
        let sqlSecond =
          "DELETE FROM product_images WHERE ?? = ?; DELETE FROM product_attributes WHERE ?? = ?; DELETE FROM product_filters WHERE ?? = ?;";
        const values = [
          "product_id",
          request.body.params.product.id,
          "product_id",
          request.body.params.product.id,
          "product_id",
          request.body.params.product.id,
        ] as string[];
        request.body.params.product.images.forEach((image) => {
          sqlSecond += "INSERT INTO product_images (??, ??, ??) VALUES (?, ?, ?); ";
          values.push("product_id", "path", "is_main", request.body.params.product.id, image.path, image.is_main);
        });
        request.body.params.product.attributes.forEach((attribute) => {
          sqlSecond += "INSERT INTO product_attributes (??, ??, ??) VALUES (?, ?, ?); ";
          values.push(
            "product_id",
            "attribute_id",
            "value",
            request.body.params.product.id,
            attribute.attribute_id,
            attribute.value
          );
        });
        request.body.params.product.filters.forEach((filter) => {
          sqlSecond += "INSERT INTO product_filters (??, ??, ??) VALUES (?, ?, ?); ";
          values.push(
            "product_id",
            "filter_id",
            "filter_item_id",
            request.body.params.product.id,
            filter.filter_id,
            filter.filter_item_id
          );
        });
        const query = mysql.format(sqlSecond, values);
        connectionPool.query(query, (error) => {
          if (error) {
            return response.status(404).json({
              success: false,
              message: "Ошибка при обновлении товара",
              error: error,
            });
          } else {
            return response.status(200).json({ success: true });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "Ошибка при добавлении товара",
      error: error,
    });
  }
};

const deleteProduct = (request, response) => {
  try {
    const sql =
      "DELETE FROM products WHERE ?? = ?; DELETE FROM product_images WHERE ?? = ?; DELETE FROM product_attributes WHERE ?? = ?; DELETE FROM product_filters WHERE ?? = ?;";
    const query = mysql.format(sql, [
      "id",
      request.body.params.product.id,
      "product_id",
      request.body.params.product.id,
      "product_id",
      request.body.params.product.id,
      "product_id",
      request.body.params.product.id,
    ]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Не удалось удалить товар",
          error: error,
        });
      } else {
        return response.status(200).json({ success: true });
      }
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "Ошибка при удалении товара",
      error: error,
    });
  }
};

export { getProducts, addProduct, updateProduct, deleteProduct };
