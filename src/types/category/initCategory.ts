import { ICategory } from "./category";

export function initCategory(): ICategory {
  const defaults = {
    id: -1,
    category: "",
    description: "",
    parent_id: -1,
    img_path: "",
    is_main: false,
  };

  return {
    ...defaults,
  };
}
