import { IProduct } from "./product";
import { IProductAttribute } from "./productAttribute";
import { IProductFilter } from "./productFilter";
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
    manufacturer_id: -1,
    images: [] as IProductImage[],
    attributes: [] as IProductAttribute[],
    filters: [] as IProductFilter[],
  };

  return {
    ...defaults,
  };
}
