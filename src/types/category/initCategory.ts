import { ICategory } from "./category";
import { ICategoryAttribute } from "./categoryAttribute";

export function initCategory(): ICategory {
  const defaults = {
    id: -1,
    category: "",
    description: "",
    parent_id: -1,
    img_path: "",
    is_main: false,
    attributes: [] as ICategoryAttribute[],
  };

  return {
    ...defaults,
  };
}
