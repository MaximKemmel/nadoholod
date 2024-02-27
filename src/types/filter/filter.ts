import { IFilterItem } from "./filterItem";

export interface IFilter {
  id: number;
  filter: string;
  items: IFilterItem[];
}
