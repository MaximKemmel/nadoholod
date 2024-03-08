import { IFilter } from "./filter";
import { IFilterItem } from "./filterItem";

export function initFilter(): IFilter {
  const defaults = {
    id: -1,
    filter: "",
    is_main: false,
    items: [] as IFilterItem[],
  };

  return {
    ...defaults,
  };
}
