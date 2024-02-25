import { IProduct } from "./product";
import { IProductImage } from "./productImage";

export function initProduct(): IProduct {
  const defaults = {
    id: -1,
    category_id: -1,
    name: "",
    description: "",
    full_description: "",
    price: 0,
    delivery_info: "",
    instruction_path: "",
    images: [] as IProductImage[],
  };

  return {
    ...defaults,
  };
}
