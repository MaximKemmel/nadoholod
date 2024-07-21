import { connectionPool } from "../../connectionPool";

import { ISecondaryInfo } from "../../../types/secondaryInfo/secondaryInfo";

const mysql = require("mysql");

const getSecondaryInfo = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM secondary_info", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Второстепенная информация не найдена",
          error: error,
        });
      } else {
        const secondaryInfo = data as ISecondaryInfo[];
        return response.json(secondaryInfo);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить второстепенную информацию",
      error: error,
    });
  }
};

const updateSecondaryInfo = (request, response) => {
  try {
    const sql = "UPDATE secondary_info SET ?? = ?, ?? = ?, ?? = ? WHERE id = 1;";
    const query = mysql.format(sql, [
      "chillers_count",
      request.body.params.secondary_info.chillers_count,
      "cameras_count",
      request.body.params.secondary_info.cameras_count,
      "generators_count",
      request.body.params.secondary_info.generators_count,
    ]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Не удалось обновить второстепенную информацию",
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
      message: "Ошибка при обновлении второстепенной информации",
      error: error,
    });
  }
};

export { getSecondaryInfo, updateSecondaryInfo };
