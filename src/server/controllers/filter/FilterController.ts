import { connectionPool } from "../../connectionPool";

import { IFilter } from "../../../types/filter/filter";
import { IFilterItem } from "../../../types/filter/filterItem";

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

export { getFilters };
