import { connectionPool } from "../../connectionPool";

import { ICategory } from "../../../types/category/category";

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

export { getCategories };
