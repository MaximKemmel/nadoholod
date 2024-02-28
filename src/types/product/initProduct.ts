import { IProduct } from "./product";
import { IProductAttribute } from "./productAttribute";
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
    attributes: [] as IProductAttribute[],
  };

  return {
    ...defaults,
  };
}
