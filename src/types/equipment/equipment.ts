import { IEquipmentFeature } from "./equipmentFeature";
import { IEquipmentPrice } from "./equipmentPrice";

export interface IEquipment {
  id: number;
  type: number;
  prefix: string;
  name: string;
  full_name: string;
  description: string;
  feature_title: string;
  features: IEquipmentFeature[];
  parameters: string;
  prices: IEquipmentPrice[];
}
