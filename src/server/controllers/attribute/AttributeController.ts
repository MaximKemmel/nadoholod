import { connectionPool } from "../../connectionPool";

import { IAttribute } from "../../../types/attribute/attribute";

const mysql = require("mysql");

const getAttributes = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM attributes ORDER BY position DESC", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Аттрибуты не найдены",
          error: error,
        });
      } else {
        const attributes = data as IAttribute[];
        return response.json(attributes);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить аттрибуты",
      error: error,
    });
  }
};

const addAttributes = (request, response) => {
  try {
    let sql = "DELETE FROM attributes;";
    const values = [] as string[];
    request.body.params.attributes.forEach((attribute) => {
      sql += "INSERT INTO attributes (??, ??, ??, ??) VALUES (?, ?, ?, ?); ";
      values.push(
        "id",
        "attribute",
        "is_main",
        "position",
        attribute.id,
        attribute.attribute,
        attribute.is_main,
        attribute.position
      );
    });
    const query = mysql.format(sql, values);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Не удалось сохранить аттрибуты",
          error: error,
        });
      } else {
        return response.status(200).json({ success: true });
      }
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Не удалось сохранить аттрибуты",
      error: error,
    });
  }
};

const updateAttributePosition = (request, response) => {
  try {
    const sql = "UPDATE attributes SET ?? = ? WHERE ?? = ?; UPDATE attributes SET ?? = ? WHERE ?? = ?;";
    const query = mysql.format(sql, [
      "position",
      request.body.params.old_position,
      "position",
      request.body.params.attribute.position,
      "position",
      request.body.params.attribute.position,
      "id",
      request.body.params.attribute.id,
    ]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Не удалось обновить позицию аттрибута",
          error: error,
        });
      } else {
        return response.status(200).json({ success: true });
      }
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Ошибка при обновлении позиции аттрибута",
      error: error,
    });
  }
};

export { getAttributes, addAttributes, updateAttributePosition };
