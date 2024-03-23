import { IManufacturer } from "./manufacturer";

export function initManufacturer(): IManufacturer {
  const defaults = {
    id: -1,
    manufacturer: "",
    image_path: "",
  };

  return {
    ...defaults,
  };
}
