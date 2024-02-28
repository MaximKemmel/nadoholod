import { IProductAttribute } from "./productAttribute";
import { IProductImage } from "./productImage";

export interface IProduct {
  id: number;
  category_id: number;
  name: string;
  description: string;
  full_description: string;
  price: number;
  delivery_info: string;
  instruction_path: string;
  images: IProductImage[];
  attributes: IProductAttribute[];
}
