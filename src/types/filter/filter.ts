import { IFilterItem } from "./filterItem";

export interface IFilter {
  id: number;
  filter: string;
  is_main: boolean;
  items: IFilterItem[];
}
