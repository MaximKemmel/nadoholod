import { connectionPool } from "../../connectionPool";

import { ICategory } from "../../../types/category/category";

const mysql = require("mysql");

const getCategories = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM categories", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Категории не найдены",
          error: error,
        });
      } else {
        const categories = data as ICategory[];
        return response.json(categories);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить категории",
      error: error,
    });
  }
};

const addCategory = (request, response) => {
  try {
    const sql = "INSERT INTO categories (??, ??, ??, ??) VALUES (?, ?, ?, ?);";
    const query = mysql.format(sql, [
      "parent_id",
      "category",
      "description",
      "img_path",
      request.body.params.category.parent_id,
      request.body.params.category.category,
      request.body.params.category.description,
      request.body.params.category.img_path,
    ]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Не удалось добавить категорию",
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
      message: "Ошибка при добавлении категории",
      error: error,
    });
  }
};

const updateCategory = (request, response) => {
  try {
    const sql = "UPDATE categories SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?;";
    const query = mysql.format(sql, [
      "parent_id",
      request.body.params.category.parent_id,
      "category",
      request.body.params.category.category,
      "description",
      request.body.params.category.description,
      "img_path",
      request.body.params.category.img_path,
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
        return response.status(200).json({ success: true });
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
    const sql = "DELETE FROM categories WHERE ?? = ?;";
    const query = mysql.format(sql, ["id", request.body.params.category.id]);
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
