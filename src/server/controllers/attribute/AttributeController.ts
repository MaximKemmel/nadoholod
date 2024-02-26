import { connectionPool } from "../../connectionPool";

import { IAttribute } from "../../../types/attribute/attribute";

const getAttributes = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM attributes", (error, data) => {
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

export { getAttributes };
