export interface IProductionCategory {
  id: number;
  prefix: string;
  name: string;
  full_name: string;
  description: string;
  min_price: number;
  subcategories: IProductionCategory[];
}
