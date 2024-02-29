import { connectionPool } from "../../connectionPool";

import { IManufacturer } from "../../../types/manufacturer/manufacturer";

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

export { getManufacturers };
