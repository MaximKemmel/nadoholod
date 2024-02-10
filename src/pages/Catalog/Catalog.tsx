import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./Catalog.module.sass";

import ProductCard from "../../components/ProductCard/ProductCard";

import { productionCategoriesList } from "../../data/productionCategoriesList";
import { recommendedProductsList } from "../../data/recommendedProductsList";

import { IProductionCategory } from "../../types/production/productionCategory";
import { IProduct } from "../../types/product/product";

import { Arrow as ArrowIcon } from "../../assets/svg/Arrow";
import MultiDropdown from "../../components/Dropdown/MultiDropdown";
import { DropdownType } from "../../enums/dropdownType";
import { IDropdownItem } from "../../types/main/dropdownItem";
import Slider from "../../components/Slider/Slider";

const Catalog = () => {
  const { id } = useParams();
  const [productionCategory, setProductionCategory] = useState({ id: -1 } as IProductionCategory);
  const [type, setType] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(DropdownType.None);
  const [manufacturers, setManufacturers] = useState([
    { id: 0, text: "Polair", is_selected: false } as IDropdownItem,
    { id: 1, text: "Север", is_selected: false } as IDropdownItem,
  ] as IDropdownItem[]);
  const [voltages, setVoltages] = useState([
    { id: 0, text: "220В", is_selected: false } as IDropdownItem,
    { id: 1, text: "360В", is_selected: false } as IDropdownItem,
  ] as IDropdownItem[]);
  const [sizes, setSizes] = useState([
    { id: 0, text: "80мм", is_selected: false } as IDropdownItem,
    { id: 1, text: "100мм", is_selected: false } as IDropdownItem,
  ] as IDropdownItem[]);
  const [temperatures, setTemperatures] = useState([
    { id: 0, text: "-5°С; +10°С", is_selected: false } as IDropdownItem,
    { id: 1, text: "-20°С; -15°С", is_selected: false } as IDropdownItem,
    { id: 2, text: "-15°С; -25°С", is_selected: false } as IDropdownItem,
  ] as IDropdownItem[]);
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    ...Array(18).fill({
      id: -1,
      name: "Холодильная камера 2.9",
      manufacturer: "polair",
      price: 0,
      category_id: 1,
      card_description: "Температура от +10°С до — 25°С<br/>Толщина сэндвич-панели 100мм",
    } as IProduct),
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    if (products[0].price === 0) {
      const tmpProducts = products.map((value: IProduct) => {
        return {
          ...value,
          price: Math.floor(Math.random() * (3000000 - 10000 + 1)) + 10000,
        };
      });
      setProducts(tmpProducts);
    }
  }, [products]);

  useEffect(() => {
    if (id !== undefined) {
      setType(Number(id));
      if (Number(id) < 10) {
        const tmpProductionCategory = productionCategoriesList.find((item: IProductionCategory) => item.id === Number(id))!;
        setProductionCategory(tmpProductionCategory);
      } else {
        const tmpProductionCategory = productionCategoriesList.find(
          (item: IProductionCategory) =>
            item.subcategories.filter((subcategory: IProductionCategory) => subcategory.id === Number(id)).length > 0
        )!;
        const tmpSubcategory = tmpProductionCategory.subcategories.find(
          (subcategory: IProductionCategory) => subcategory.id === Number(id)
        )!;
        setProductionCategory(tmpSubcategory);
      }
    }
  }, [id]);

  return (
    <div className={styles.wrapper}>
      {type === 0 || type === 10 || type === 11 ? (
        <div className={styles.container}>
          <div className={styles.breadcumbs}>
            <div className={styles.breadcumb}>Главная</div>
            <ArrowIcon />
            <div className={styles.breadcumb}>Каталог</div>
            <ArrowIcon />
            <div className={type === 0 ? styles.element : styles.breadcumb}>Холодильные камеры</div>
            {type === 10 || type === 11 ? (
              <>
                <ArrowIcon />
                <div className={styles.element}>
                  {type === 10 ? "Камеры хранения готовой продукции" : type === 11 ? "Холодильное оборудование" : ""}
                </div>
              </>
            ) : null}
          </div>
          <div className={styles.content}>
            <h3>
              {type === 0
                ? "Холодильные камеры"
                : type === 10
                ? "Камеры хранения готовой продукции"
                : type === 11
                ? "Холодильное оборудование"
                : ""}
            </h3>
            {type === 0 ? (
              <div className={styles.subcategories_list}>
                {productionCategory.subcategories.map((category: IProductionCategory) => (
                  <div className={styles.subcategory} onClick={() => navigate(`/catalog/${category.id}`)}>
                    <img src={`/uploads/production/${category.prefix}.png`} alt="" />
                    <div className={styles.name}>{category.name}</div>
                  </div>
                ))}
              </div>
            ) : null}
            {type === 10 ? (
              <div className={styles.products_wrapper}>
                <div className={styles.filters}>
                  <MultiDropdown
                    dropdownType={DropdownType.ManufacturerSelector}
                    activeComponent={activeDropdown}
                    setActiveComponent={setActiveDropdown}
                    label="Производитель"
                    items={manufacturers}
                    onItemSelect={(item: IDropdownItem) => {
                      const tmpManufacturers = manufacturers.map((value: IDropdownItem) => {
                        return {
                          ...value,
                          is_selected: item.id === value.id ? !value.is_selected : value.is_selected,
                        };
                      });
                      setManufacturers(tmpManufacturers);
                    }}
                  />
                  <MultiDropdown
                    dropdownType={DropdownType.VoltageSelector}
                    activeComponent={activeDropdown}
                    setActiveComponent={setActiveDropdown}
                    label="Напряжение"
                    items={voltages}
                    onItemSelect={(item: IDropdownItem) => {
                      const tmpVoltages = voltages.map((value: IDropdownItem) => {
                        return {
                          ...value,
                          is_selected: item.id === value.id ? !value.is_selected : value.is_selected,
                        };
                      });
                      setVoltages(tmpVoltages);
                    }}
                  />
                  <MultiDropdown
                    dropdownType={DropdownType.SizeSelector}
                    activeComponent={activeDropdown}
                    setActiveComponent={setActiveDropdown}
                    label="Толщина сэндвич-панели"
                    items={sizes}
                    onItemSelect={(item: IDropdownItem) => {
                      const tmpSizes = sizes.map((value: IDropdownItem) => {
                        return {
                          ...value,
                          is_selected: item.id === value.id ? !value.is_selected : value.is_selected,
                        };
                      });
                      setSizes(tmpSizes);
                    }}
                  />
                  <MultiDropdown
                    dropdownType={DropdownType.TemperaturesSelector}
                    activeComponent={activeDropdown}
                    setActiveComponent={setActiveDropdown}
                    label="Температура"
                    items={temperatures}
                    onItemSelect={(item: IDropdownItem) => {
                      const tmpTemperatures = temperatures.map((value: IDropdownItem) => {
                        return {
                          ...value,
                          is_selected: item.id === value.id ? !value.is_selected : value.is_selected,
                        };
                      });
                      setTemperatures(tmpTemperatures);
                    }}
                  />
                  <div className={styles.main_filter}>
                    <div className={styles.filter}>
                      <Slider min={2} max={50} label="Объем, м³" unit="м³" />
                    </div>
                    <div className={styles.filter}>
                      Цена, ₽
                      <div className={styles.inputs}>
                        <input type="text" placeholder="от 50 000" />
                        <input type="text" placeholder="до 500 000" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.products_list}>
                  {products.slice((currentPage - 1) * 12, (currentPage - 1) * 12 + 12).map((product: IProduct) => (
                    <ProductCard product={product} />
                  ))}
                </div>
                {products.length > 12 ? (
                  <div className={styles.pagination}>
                    {Math.ceil(products.length / 12) > 0 ? (
                      <>
                        {currentPage !== 1 ? (
                          <div className={styles.prev_button} onClick={() => setCurrentPage(currentPage - 1)}>
                            <ArrowIcon />
                          </div>
                        ) : null}
                        {Array(Math.ceil(products.length / 12))
                          .fill(1)
                          .map((_value, index: number) => (
                            <div
                              className={`${styles.page} ${currentPage === index + 1 ? styles.active : ""}`}
                              onClick={() => setCurrentPage(index + 1)}
                            >
                              {index + 1}
                            </div>
                          ))}
                        {currentPage !== Math.ceil(products.length / 12) ? (
                          <div className={styles.next_button} onClick={() => setCurrentPage(currentPage + 1)}>
                            <ArrowIcon />
                          </div>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
          <div className={styles.recommended_products}>
            <h4>Возможно вас заинтересует</h4>
            <div className={styles.recommended_products_list}>
              {recommendedProductsList.map((product: IProduct) => (
                <ProductCard product={product} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Catalog;
