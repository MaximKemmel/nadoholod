import { connectionPool } from "../../connectionPool";

import { ICategory } from "../../../types/category/category";
import { ICategoryAttribute } from "../../../types/category/categoryAttribute";
import { ICategoryFilter } from "../../../types/category/categoryFilter";

const mysql = require("mysql");

const getCategories = (_request, response) => {
  try {
    connectionPool.query(
      "SELECT * FROM categories; SELECT * FROM category_attributes; SELECT * FROM category_filters;",
      (error, data) => {
        if (error) {
          return response.status(404).json({
            message: "Категории не найдены",
            error: error,
          });
        } else {
          const categories = data[0] as ICategory[];
          const categoryAttributes = data[1] as ICategoryAttribute[];
          const categoryFilters = data[2] as ICategoryFilter[];
          const categoriesList = [] as ICategory[];
          categories.forEach((category: ICategory) => {
            categoriesList.push({
              ...category,
              attributes: categoryAttributes.filter(
                (attribute: ICategoryAttribute) => attribute.category_id === category.id
              ) as ICategoryAttribute[],
              filters: categoryFilters.filter(
                (filter: ICategoryFilter) => filter.category_id === category.id
              ) as ICategoryFilter[],
            });
          });
          return response.json(categoriesList);
        }
      }
    );
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить категории",
      error: error,
    });
  }
};

const addCategory = (request, response) => {
  try {
    const sql = "INSERT INTO categories (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?);";
    const query = mysql.format(sql, [
      "parent_id",
      "category",
      "description",
      "img_path",
      "show_in_nav",
      request.body.params.category.parent_id,
      request.body.params.category.category,
      request.body.params.category.description,
      request.body.params.category.img_path,
      request.body.params.category.show_in_nav,
    ]);
    connectionPool.query(query, (error, data) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Не удалось добавить категорию",
          error: error,
        });
      } else {
        const category_id = data["insertId"];
        let sqlSecond = "DELETE FROM category_attributes WHERE ?? = ?; DELETE FROM category_filters WHERE ?? = ?; ";
        const values = ["category_id", category_id, "category_id", category_id] as string[];
        request.body.params.category.attributes.forEach((attribute) => {
          sqlSecond += "INSERT INTO category_attributes (??, ??) VALUES (?, ?); ";
          values.push("category_id", "attribute_id", category_id, attribute.attribute_id);
        });
        request.body.params.category.filters.forEach((filter) => {
          sqlSecond += "INSERT INTO category_filters (??, ??) VALUES (?, ?); ";
          values.push("category_id", "filter_id", category_id, filter.filter_id);
        });
        const query = mysql.format(sqlSecond, values);
        connectionPool.query(query, (error) => {
          if (error) {
            return response.status(404).json({
              success: false,
              message: "Ошибка при добавлении категории",
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
      message: "Ошибка при добавлении категории",
      error: error,
    });
  }
};

const updateCategory = (request, response) => {
  try {
    const sql = "UPDATE categories SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?;";
    const query = mysql.format(sql, [
      "parent_id",
      request.body.params.category.parent_id,
      "category",
      request.body.params.category.category,
      "description",
      request.body.params.category.description,
      "img_path",
      request.body.params.category.img_path,
      "show_in_nav",
      request.body.params.category.show_in_nav,
      "id",
      request.body.params.category.id,
    ]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Не удалось добавить категорию",
          error: error,
        });
      } else {
        let sqlSecond = "DELETE FROM category_attributes WHERE ?? = ?; DELETE FROM category_filters WHERE ?? = ?; ";
        const values = [
          "category_id",
          request.body.params.category.id,
          "category_id",
          request.body.params.category.id,
        ] as string[];
        request.body.params.category.attributes.forEach((attribute) => {
          sqlSecond += "INSERT INTO category_attributes (??, ??) VALUES (?, ?); ";
          values.push("category_id", "attribute_id", request.body.params.category.id, attribute.attribute_id);
        });
        request.body.params.category.filters.forEach((filter) => {
          sqlSecond += "INSERT INTO category_filters (??, ??) VALUES (?, ?); ";
          values.push("category_id", "filter_id", request.body.params.category.id, filter.filter_id);
        });
        const query = mysql.format(sqlSecond, values);
        connectionPool.query(query, (error) => {
          if (error) {
            return response.status(404).json({
              success: false,
              message: "Ошибка при обновлении категории",
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
      message: "Ошибка при добавлении категории",
      error: error,
    });
  }
};

const deleteCategory = (request, response) => {
  try {
    const sql = "DELETE FROM categories WHERE ?? = ?; DELETE FROM category_attributes WHERE ?? = ?;";
    const query = mysql.format(sql, ["id", request.body.params.category.id, "category_id", request.body.params.category.id]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Не удалось удалить категорию",
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
      message: "Ошибка при удалении категории",
      error: error,
    });
  }
};

export { getCategories, addCategory, updateCategory, deleteCategory };
