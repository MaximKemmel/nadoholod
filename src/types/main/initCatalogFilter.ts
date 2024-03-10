import { ICatalogFilter } from "./catalogFilter";

export function initCatalogFilter(): ICatalogFilter {
  const defaults = {
    manufacturers: [] as number[],
    max_volume: 0,
    min_price: 0,
    max_price: 0,
    product_filters: [] as number[],
  };

  return {
    ...defaults,
  };
}
