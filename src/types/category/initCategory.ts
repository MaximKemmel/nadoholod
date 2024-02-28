import { ICategory } from "./category";
import { ICategoryAttribute } from "./categoryAttribute";
import { ICategoryFilter } from "./categoryFilter";

export function initCategory(): ICategory {
  const defaults = {
    id: -1,
    category: "",
    description: "",
    parent_id: -1,
    img_path: "",
    is_main: false,
    attributes: [] as ICategoryAttribute[],
    filters: [] as ICategoryFilter[],
  };

  return {
    ...defaults,
  };
}
