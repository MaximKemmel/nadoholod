import { ICategoryAttribute } from "./categoryAttribute";
import { ICategoryFilter } from "./categoryFilter";

export interface ICategory {
  id: number;
  category: string;
  description: string;
  parent_id: number;
  img_path: string;
  is_main: boolean;
  attributes: ICategoryAttribute[];
  filters: ICategoryFilter[];
}
