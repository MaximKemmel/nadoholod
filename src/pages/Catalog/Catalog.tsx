import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useTypedSelector } from "../../hooks/useTypedSeletor";

import styles from "./Catalog.module.sass";

//import ProductCard from "../../components/ProductCard/ProductCard";
import Slider from "../../components/Slider/Slider";
import MultiDropdown from "../../components/Dropdown/MultiDropdown";

//import { recommendedProductsList } from "../../data/recommendedProductsList";

import { ICategory } from "../../types/category/category";
import { initCategory } from "../../types/category/initCategory";
import { IProduct } from "../../types/product/product";
import { DropdownType } from "../../enums/dropdownType";
import { IDropdownItem } from "../../types/main/dropdownItem";

import { Arrow as ArrowIcon } from "../../assets/svg/Arrow";

const Catalog = () => {
  const { id } = useParams();
  const categories = useTypedSelector((state) => state.categoryReducer.categories);
  const products = useTypedSelector((state) => state.productReducer.products);
  const [category, setCategory] = useState(initCategory());
  const [categoryProducts, setCategoryProducts] = useState([] as IProduct[]);
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    if (id !== undefined) {
      if (
        !Number.isNaN(id) &&
        categories.length > 0 &&
        categories.filter((category: ICategory) => category.id === Number(id)).length > 0
      ) {
        setCategory(categories.find((category: ICategory) => category.id === Number(id))!);
      } else {
        navigate("/");
      }
    }
  }, [id, categories]);

  useEffect(() => {
    if (category.id !== -1 && products) {
      setCategoryProducts(products.filter((product: IProduct) => product.category_id === category.id));
    }
  }, [category, products]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.breadcumbs}>
          <div className={styles.breadcumb}>Главная</div>
          <ArrowIcon />
          <div className={styles.breadcumb}>Каталог</div>
          <ArrowIcon />
          {category.parent_id !== -1 &&
          categories.filter((categoryTmp: ICategory) => categoryTmp.id === category.parent_id).length > 0 ? (
            <>
              <div className={styles.breadcumb}>
                {categories.find((categoryTmp: ICategory) => categoryTmp.id === category.parent_id)!.category}
              </div>
              <ArrowIcon />
            </>
          ) : null}
          <div className={styles.breadcumb}>{category.category}</div>
        </div>
        <div className={styles.content}>
          <h3>{category.category}</h3>
          {categories.filter((categoryTmp: ICategory) => categoryTmp.parent_id === category.id).length > 0 ? (
            <div className={styles.subcategories_list}>
              {categories
                .filter((categoryTmp: ICategory) => categoryTmp.parent_id === category.id)
                .map((categoryTmp: ICategory) => (
                  <div className={styles.subcategory} onClick={() => navigate(`/catalog/${categoryTmp.id}`)}>
                    <img src={`/uploads/${category.img_path}`} alt="" />
                    <div className={styles.name}>{categoryTmp.category}</div>
                  </div>
                ))}
            </div>
          ) : (
            <>
              {categoryProducts.length > 0 ? (
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
                    {/*products.slice((currentPage - 1) * 12, (currentPage - 1) * 12 + 12).map((product: IProduct) => (
                      <ProductCard product={product} />
                    ))*/}
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
            </>
          )}
        </div>
        <div className={styles.recommended_products}>
          <h4>Возможно вас заинтересует</h4>
          <div className={styles.recommended_products_list}>
            {/*recommendedProductsList.map((product: IProduct) => (
              <ProductCard product={product} />
            ))*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
