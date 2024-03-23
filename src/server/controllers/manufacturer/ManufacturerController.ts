import { connectionPool } from "../../connectionPool";

import { IManufacturer } from "../../../types/manufacturer/manufacturer";

const mysql = require("mysql");

const getManufacturers = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM manufacturers", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Производители не найдены",
          error: error,
        });
      } else {
        const manufacturers = data as IManufacturer[];
        return response.json(manufacturers);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить производителей",
      error: error,
    });
  }
};

const addManufacturer = (request, response) => {
  try {
    const sql = "INSERT INTO manufacturers (??, ??) VALUES (?, ?);";
    const query = mysql.format(sql, [
      "manufacturer",
      "image_path",
      request.body.params.manufacturer.manufacturer,
      request.body.params.manufacturer.image_path,
    ]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Не удалось добавить производителя",
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
      message: "Ошибка при добавлении производителя",
      error: error,
    });
  }
};

const updateManufacturer = (request, response) => {
  try {
    const sql = "UPDATE manufacturers SET ?? = ?, ?? = ? WHERE ?? = ?;";
    const query = mysql.format(sql, [
      "manufacturer",
      request.body.params.manufacturer.manufacturer,
      "image_path",
      request.body.params.manufacturer.image_path,
      "id",
      request.body.params.manufacturer.id,
    ]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Не удалось обновить производителя",
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
      message: "Ошибка при обновлении производителя",
      error: error,
    });
  }
};

const deleteManufacturer = (request, response) => {
  try {
    const sql = "DELETE FROM manufacturers WHERE ?? = ?;";
    const query = mysql.format(sql, ["id", request.body.params.manufacturer.id]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Не удалось удалить производителя",
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
      message: "Ошибка при удалении производителя",
      error: error,
    });
  }
};

export { getManufacturers, addManufacturer, updateManufacturer, deleteManufacturer };
