import { connectionPool } from "../../connectionPool";

import { IFilter } from "../../../types/filter/filter";
import { IFilterItem } from "../../../types/filter/filterItem";

const mysql = require("mysql");

const getFilters = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM filters; SELECT * FROM filter_items;", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Фильтры не найдены",
          error: error,
        });
      } else {
        const filters = data[0] as IFilter[];
        const filterItems = data[1] as IFilterItem[];
        const filtersList = [] as IFilter[];
        filters.forEach((filter: IFilter) => {
          filtersList.push({
            ...filter,
            items: filterItems.filter((filterItem: IFilterItem) => filter.id === filterItem.filter_id) as IFilterItem[],
          });
        });
        return response.json(filtersList);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить аттрибуты",
      error: error,
    });
  }
};

const addFilter = (request, response) => {
  try {
    const sql = "INSERT INTO filters (??, ??) VALUES (?, ?);";
    const query = mysql.format(sql, [
      "filter",
      "is_main",
      request.body.params.filter.filter,
      request.body.params.filter.is_main,
    ]);
    connectionPool.query(query, (error, data) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Не удалось добавить фильтр",
          error: error,
        });
      } else {
        const filter_id = data["insertId"];
        let sqlSecond = "DELETE FROM filter_items WHERE ?? = ?; ";
        const values = ["filter_id", filter_id] as string[];
        request.body.params.filter.items.forEach((item) => {
          sqlSecond += "INSERT INTO filter_items (??, ??) VALUES (?, ?); ";
          values.push("filter_id", "filter_item", filter_id, item.filter_item);
        });
        const query = mysql.format(sqlSecond, values);
        connectionPool.query(query, (error) => {
          if (error) {
            return response.status(404).json({
              success: false,
              message: "Ошибка при добавлении фильтра",
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

const updateFilter = (request, response) => {
  try {
    const sql = "UPDATE filters SET ?? = ? WHERE ?? = ?;";
    const query = mysql.format(sql, ["filter", request.body.params.filter.filter, "id", request.body.params.filter.id]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Не удалось добавить категорию",
          error: error,
        });
      } else {
        let sqlSecond = "DELETE FROM filter_items WHERE ?? = ?; ";
        const values = ["filter_id", request.body.params.filter.id] as string[];
        request.body.params.filter.items.forEach((item) => {
          sqlSecond += "INSERT INTO filter_items (??, ??) VALUES (?, ?); ";
          values.push("filter_id", "filter_item", request.body.params.filter.id, item.filter_item);
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

const deleteFilter = (request, response) => {
  try {
    const sql = "DELETE FROM filters WHERE ?? = ?; DELETE FROM filter_items WHERE ?? = ?;";
    const query = mysql.format(sql, ["id", request.body.params.filter.id, "filter_id", request.body.params.filter.id]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Не удалось удалить фильтр",
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
      message: "Ошибка при удалении фильтра ",
      error: error,
    });
  }
};

export { getFilters, addFilter, updateFilter, deleteFilter };
