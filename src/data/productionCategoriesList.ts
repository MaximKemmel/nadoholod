import { IProductionCategory } from "../types/production/productionCategory";

export const productionCategoriesList = [
  {
    id: 0,
    prefix: "cold_storage_chamber",
    name: "Холодильные камеры",
    full_name: "Камеры хранения готовой продукции",
    description:
      "<p>камеры объёмом от 6 до 20м³</p><p>камеры объёмом от 50 до 100м³ и высотой более 2м</p><p>камеры большого объёма — свыше 100м³</p>",
    min_price: 67667,
  } as IProductionCategory,
  {
    id: 1,
    prefix: "ice_water_generator",
    name: "Генераторы холодной воды",
    full_name: "Генераторы холодной воды",
    description:
      "ГЛВ — установка, позволяющая получать воду до Т=0,5 С в замкнутой системе, используя преждевременно накопленный лёд.",
    min_price: 1555148,
  } as IProductionCategory,
  {
    id: 2,
    prefix: "chillers",
    name: "Чиллеры",
    full_name: "Чиллеры",
    description:
      "Благодаря особой конструкции чиллеров их можно эксплуатировать в круглогодичном режиме, при этом процесс полностью автоматизирован.",
    min_price: 67667,
  } as IProductionCategory,
  {
    id: 3,
    prefix: "drying_chamber",
    name: "Камеры сушки/вялки",
    full_name: "Камеры сушки/вялки",
    description:
      "Оборудование для вяления и сушки рыбы представляет собой специальные сушильные камеры с постоянной циркуляцией воздуха. В зависимости от режимов сушки и вяления, внутри камеры поддерживается определённый температурный режим.",
    min_price: 67667,
  } as IProductionCategory,
  {
    id: 4,
    prefix: "central_cooling",
    name: "Центральное холодоснабжение",
    full_name: "Центральное холодоснабжение",
    description:
      "Целесообразно монтировать централизованное холодоснабжение при объёме обслуживаемых площадей от 400м².<br/>Это многокомпрессорные агрегаты, компрессоры в которых подключены параллельно и функционируют в одном температурном режиме.",
    min_price: 67667,
  } as IProductionCategory,
] as IProductionCategory[];
