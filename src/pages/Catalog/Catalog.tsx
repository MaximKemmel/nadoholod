import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";

import { useTypedSelector } from "../../hooks/useTypedSeletor";

import styles from "./Catalog.module.sass";

import ProductCard from "../../components/ProductCard/ProductCard";
import InputSlider from "../../components/InputSlider/InputSlider";
import MultiDropdown from "../../components/Dropdown/MultiDropdown";

import { ICategory } from "../../types/category/category";
import { initCategory } from "../../types/category/initCategory";
import { IProduct } from "../../types/product/product";
import { DropdownType } from "../../enums/dropdownType";
import { IDropdownItem } from "../../types/main/dropdownItem";

import { Arrow as ArrowIcon } from "../../assets/svg/Arrow";
import { Check as CheckIcon } from "../../assets/svg/Check";
import { List as ListIcon } from "../../assets/svg/List";
import { Grid as GridIcon } from "../../assets/svg/Grid";
import { Filter as FilterIcon } from "../../assets/svg/Filter";
import { Close as CloseIcon } from "../../assets/svg/Close";
import { ButtonArrow as ButtonArrowIcon } from "../../assets/svg/ButtonArrow";

const Catalog = () => {
  const { id } = useParams();
  const categories = useTypedSelector((state) => state.categoryReducer.categories);
  const products = useTypedSelector((state) => state.productReducer.products);
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const [category, setCategory] = useState(initCategory());
  const [categoryProducts, setCategoryProducts] = useState([] as IProduct[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(DropdownType.None);
  const [isSortSelected, setIsSortSelected] = useState(false);
  const [isFiltersActive, setIsFiltersActive] = useState(false);
  const [viewType, setViewType] = useState(0);
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
  const slider = useRef(null as Slider);

  const settings = {
    className: "center",
    infinite: true,
    autoplay: false,
    centerPadding: "30px",
    slidesToShow: 4,
    speed: 500,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    if (id !== undefined && categories !== undefined && Array.isArray(categories)) {
      if (!Number.isNaN(id) && categories.length > 0) {
        if (categories.filter((category: ICategory) => category.id === Number(id)).length > 0) {
          setCategory(categories.find((category: ICategory) => category.id === Number(id))!);
        } else if (Number(id) == 0) {
          setCategory({ ...initCategory(), category: "Каталог" });
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    }
  }, [id, categories]);

  useEffect(() => {
    if (category.id !== -1 && products) {
      //setCategoryProducts(products.filter((product: IProduct) => product.category_id === category.id));
      setCategoryProducts(Array(23).fill(products[0]));
    }
  }, [category, products]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.breadcumbs}>
          <div className={styles.link} onClick={() => navigate("/")}>
            Главная
          </div>
          <ArrowIcon />
          {category.category !== "Каталог" ? (
            <>
              <div className={styles.link} onClick={() => navigate("/catalog/0")}>
                Каталог
              </div>
              <ArrowIcon />
            </>
          ) : null}
          {category.category !== "" &&
          categories.filter((categoryTmp: ICategory) => categoryTmp.id === category.parent_id).length > 0 ? (
            <>
              <div
                className={styles.link}
                onClick={() =>
                  navigate(
                    `/catalog/${categories.find((categoryTmp: ICategory) => categoryTmp.id === category.parent_id)!.id}`
                  )
                }
              >
                {categories.find((categoryTmp: ICategory) => categoryTmp.id === category.parent_id)!.category}
              </div>
              <ArrowIcon />
            </>
          ) : null}
          <div className={styles.element}>{category.category}</div>
        </div>
        <div className={styles.content}>
          <h3>{category.category}</h3>
          {categories.filter((categoryTmp: ICategory) => categoryTmp.parent_id === category.id).length > 0 ? (
            <div className={styles.subcategories_list}>
              {categories
                .filter((categoryTmp: ICategory) => categoryTmp.parent_id === category.id)
                .map((categoryTmp: ICategory) => (
                  <div className={styles.subcategory} onClick={() => navigate(`/catalog/${categoryTmp.id}`)}>
                    <img src={`/uploads/${categoryTmp.img_path}`} alt="" />
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
                      isFullWidth={false}
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
                      isFullWidth={false}
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
                      isFullWidth={false}
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
                      isFullWidth={false}
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
                        <InputSlider min={2} max={50} label="Объем, м³" unit="м³" />
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
                  <div className={styles.filters_container}>
                    <div className={styles.sort}>
                      Сортировка:
                      <label className={styles.checkbox}>
                        <input type="checkbox" />
                        <span
                          className={`${styles.checkbox_mark} ${isSortSelected ? styles.active : ""}`}
                          aria-hidden="true"
                          onClick={() => setIsSortSelected(!isSortSelected)}
                        >
                          {isSortSelected ? <CheckIcon /> : null}
                        </span>
                        <div className={styles.text}>По цене</div>
                      </label>
                    </div>
                    <div
                      className={`${styles.filter_button} ${viewType === 1 ? styles.list : ""}`}
                      onClick={() => setViewType(viewType === 0 ? 1 : 0)}
                    >
                      {viewType === 0 ? <GridIcon /> : <ListIcon />}
                    </div>
                    <div className={styles.filter_button} onClick={() => setIsFiltersActive(!isFiltersActive)}>
                      <FilterIcon />
                    </div>
                  </div>
                  <div className={styles.products_list}>
                    {categoryProducts.slice((currentPage - 1) * 12, (currentPage - 1) * 12 + 12).map((product: IProduct) => (
                      <div className={styles.card}>
                        <ProductCard product={product} viewType={windowSize.innerWidth < 361 ? viewType : 0} />
                      </div>
                    ))}
                  </div>
                  {categoryProducts.length > 12 ? (
                    <div className={styles.pagination}>
                      {Math.ceil(categoryProducts.length / 12) > 0 ? (
                        <>
                          {currentPage !== 1 ? (
                            <div className={styles.prev_button} onClick={() => setCurrentPage(currentPage - 1)}>
                              <ArrowIcon />
                            </div>
                          ) : null}
                          {Array(Math.ceil(categoryProducts.length / 12))
                            .fill(1)
                            .map((_value, index: number) => (
                              <div
                                className={`${styles.page} ${currentPage === index + 1 ? styles.active : ""}`}
                                onClick={() => setCurrentPage(index + 1)}
                              >
                                {index + 1}
                              </div>
                            ))}
                          {currentPage !== Math.ceil(categoryProducts.length / 12) ? (
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
        {Array.isArray(products) && products !== undefined && products.length > 0 ? (
          <div className={styles.recommended_products}>
            <h4>Возможно вас заинтересует</h4>
            <div className={styles.recommended_products_list}>
              {Array(4)
                .fill(products[0])
                .map((product: IProduct) => (
                  <div className={styles.card}>
                    <ProductCard product={product} viewType={0} />
                  </div>
                ))}
            </div>
            <div className={styles.slider}>
              <Slider ref={slider} {...settings}>
                {Array(4)
                  .fill(products[0])
                  .map((product: IProduct) => (
                    <div>
                      <div className={styles.card}>
                        <ProductCard product={product} viewType={0} />
                      </div>
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        ) : null}
      </div>
      <div className={`${styles.filters_wrapper} ${isFiltersActive ? styles.active : ""}`}>
        <div className={styles.overlay} onClick={() => setIsFiltersActive(false)} />
        <div className={styles.wrapper_content}>
          <div className={styles.close_button} onClick={() => setIsFiltersActive(false)}>
            <CloseIcon />
          </div>
          <div className={styles.back_button} onClick={() => setIsFiltersActive(false)}>
            <ButtonArrowIcon />
            Фильтр
          </div>
          <div className={styles.filters_list}>
            <MultiDropdown
              dropdownType={DropdownType.ManufacturerSelector}
              activeComponent={activeDropdown}
              setActiveComponent={setActiveDropdown}
              label="Производитель"
              items={manufacturers}
              isFullWidth={true}
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
              isFullWidth={true}
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
              isFullWidth={true}
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
              isFullWidth={true}
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
            <div />
            Цена, ₽
            <input type="text" placeholder="от 50 000" />
            <input type="text" placeholder="до 500 000" />
            <div className={styles.filter}></div>
          </div>
          <div className={styles.clear_filters}>
            <CloseIcon /> Очистить фильтр
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
