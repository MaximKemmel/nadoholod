import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSeletor";

import appStyles from "../../App.module.sass";
import styles from "./Catalog.module.sass";

import ProductCard from "../../components/ProductCard/ProductCard";
import InputSlider from "../../components/InputSlider/InputSlider";
import MultiDropdown from "../../components/Dropdown/MultiDropdown";

import { ICategory } from "../../types/category/category";
import { initCategory } from "../../types/category/initCategory";
import { IProduct } from "../../types/product/product";
import { DropdownType } from "../../enums/dropdownType";
import { IDropdownItem } from "../../types/main/dropdownItem";
import { initCatalogFilter } from "../../types/main/initCatalogFilter";
import { ICategoryFilter } from "../../types/category/categoryFilter";
import { IManufacturer } from "../../types/manufacturer/manufacturer";
import { IFilter } from "../../types/filter/filter";
import { IFilterItem } from "../../types/filter/filterItem";
import { IProductFilter } from "../../types/product/productFilter";

import { Arrow as ArrowIcon } from "../../assets/svg/Arrow";
import { Check as CheckIcon } from "../../assets/svg/Check";
import { List as ListIcon } from "../../assets/svg/List";
import { Grid as GridIcon } from "../../assets/svg/Grid";
import { Filter as FilterIcon } from "../../assets/svg/Filter";
import { Close as CloseIcon } from "../../assets/svg/Close";
import { ButtonArrow as ButtonArrowIcon } from "../../assets/svg/ButtonArrow";

const Catalog = () => {
  const { id } = useParams();
  const { setIsNoScroll } = useActions();
  const categories = useTypedSelector((state) => state.categoryReducer.categories);
  const products = useTypedSelector((state) => state.productReducer.products);
  const manufacturers = useTypedSelector((state) => state.manufacturerReducer.manufacturers);
  const filters = useTypedSelector((state) => state.filterReducer.filters);
  const [catalogFilter, setCatalogFilter] = useState(initCatalogFilter());
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const [category, setCategory] = useState(initCategory());
  const [categoryProducts, setCategoryProducts] = useState([] as IProduct[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(DropdownType.None);
  const [isSortSelected, setIsSortSelected] = useState(false);
  const [isFiltersActive, setIsFiltersActive] = useState(false);
  const [viewType, setViewType] = useState(0);
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
    document.title = "Каталог";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    if (id !== undefined && categories !== undefined && Array.isArray(categories) && categories.length > 0) {
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
      setCategoryProducts(products.filter((product: IProduct) => product.category_id === category.id));
      setCatalogFilter(initCatalogFilter());
    }
  }, [category, products]);

  useEffect(() => {
    var tmpCategoryProducts = products.filter((product: IProduct) => product.category_id === category.id);
    if (catalogFilter.product_filters.length > 0) {
      var tmpFilters = [] as IFilter[];
      catalogFilter.product_filters.map((catalogItem: number) => {
        var filter_id = filters.find(
          (filter: IFilter) => filter.items.filter((item: IFilterItem) => item.id === catalogItem).length > 0
        )!.id;
        if (tmpFilters.filter((filter: IFilter) => filter.id === filter_id).length > 0) {
          tmpFilters = tmpFilters.map((filter: IFilter) => {
            if (filter.id !== filter_id) {
              return filter;
            } else {
              return { ...filter, items: [...filter.items, { id: catalogItem } as IFilterItem] };
            }
          });
        } else {
          tmpFilters = [...tmpFilters, { id: filter_id, items: [{ id: catalogItem } as IFilterItem] } as IFilter];
        }
      });
      tmpFilters.map((filter: IFilter) => {
        var tmpProducts = [] as IProduct[];
        tmpCategoryProducts.map((product: IProduct) => {
          var isOk = false;
          if (product.filters.filter((productfilter: IProductFilter) => productfilter.filter_id === filter.id).length > 0) {
            filter.items.map((item: IFilterItem) => {
              if (product.filters.filter((filter: IProductFilter) => filter.filter_item_id === item.id).length > 0) {
                isOk = true;
              }
            });
          }
          if (isOk) {
            tmpProducts.push(product);
          }
        });
        tmpCategoryProducts = tmpProducts;
      });
    } else {
      tmpCategoryProducts = products.filter((product: IProduct) => product.category_id === category.id);
    }
    if (catalogFilter.manufacturers.length > 0) {
      tmpCategoryProducts = tmpCategoryProducts.filter((product: IProduct) =>
        catalogFilter.manufacturers.includes(product.manufacturer_id)
      );
    } else {
      tmpCategoryProducts = tmpCategoryProducts.filter((product: IProduct) => product.manufacturer_id > -2);
    }
    if (catalogFilter.max_volume > 2) {
      tmpCategoryProducts = tmpCategoryProducts.filter((product: IProduct) => product.volume <= catalogFilter.max_volume);
    } else {
      tmpCategoryProducts = tmpCategoryProducts.filter((product: IProduct) => product.volume >= 0);
    }
    if (
      catalogFilter.min_price >= 50000 &&
      (catalogFilter.min_price <= catalogFilter.max_price || catalogFilter.max_price === 0)
    ) {
      tmpCategoryProducts = tmpCategoryProducts.filter((product: IProduct) => product.price >= catalogFilter.min_price);
    } else {
      tmpCategoryProducts = tmpCategoryProducts.filter((product: IProduct) => product.price >= 0);
    }
    if (
      catalogFilter.max_price >= 50000 &&
      catalogFilter.max_price <= 500000 &&
      catalogFilter.min_price <= catalogFilter.max_price
    ) {
      tmpCategoryProducts = tmpCategoryProducts.filter((product: IProduct) => product.price <= catalogFilter.max_price);
    } else {
      tmpCategoryProducts = tmpCategoryProducts.filter((product: IProduct) => product.price <= 500000000);
    }
    setCurrentPage(1);
    setCategoryProducts(tmpCategoryProducts);
  }, [catalogFilter]);

  useEffect(() => {
    if (isSortSelected) {
      setCategoryProducts(
        categoryProducts.sort((productOne: IProduct, productTwo: IProduct) => productOne.price - productTwo.price)
      );
    } else {
      setCategoryProducts(products.filter((product: IProduct) => product.category_id === category.id));
    }
  }, [isSortSelected]);

  useEffect(() => {
    setIsNoScroll(isFiltersActive);
  }, [isFiltersActive]);

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
          ) : null}
          {products.filter((product: IProduct) => product.category_id === category.id).length > 0 ? (
            <div className={styles.products_wrapper}>
              <div className={styles.filters}>
                <div className={styles.filter}>
                  {category.filters.filter((filter: ICategoryFilter) => filter.filter_id === 0).length > 0 ? (
                    <MultiDropdown
                      dropdownType={DropdownType.ManufacturerSelector}
                      activeComponent={activeDropdown}
                      setActiveComponent={setActiveDropdown}
                      label="Производитель"
                      items={
                        manufacturers.map((manufacturer: IManufacturer) => {
                          return {
                            id: manufacturer.id,
                            text: manufacturer.manufacturer,
                            is_selected: catalogFilter.manufacturers.includes(manufacturer.id),
                          } as IDropdownItem;
                        }) as IDropdownItem[]
                      }
                      isFullWidth={true}
                      onItemSelect={(item: IDropdownItem) => {
                        if (catalogFilter.manufacturers.includes(item.id)) {
                          setCatalogFilter({
                            ...catalogFilter,
                            manufacturers: catalogFilter.manufacturers.filter((value: number) => value !== item.id),
                          });
                        } else {
                          setCatalogFilter({
                            ...catalogFilter,
                            manufacturers: [...catalogFilter.manufacturers, item.id],
                          });
                        }
                        setActiveDropdown(DropdownType.None);
                      }}
                    />
                  ) : null}
                </div>
                {category.filters.filter((filter: ICategoryFilter) => filter.filter_id > 1).length > 0 ? (
                  <>
                    {category.filters
                      .filter((filter: ICategoryFilter) => filter.filter_id > 1)
                      .map((categoryFilter: ICategoryFilter) => (
                        <div className={styles.filter}>
                          {filters.filter((filter: IFilter) => filter.id === categoryFilter.filter_id).length > 0 ? (
                            <MultiDropdown
                              dropdownType={categoryFilter.id + 50}
                              activeComponent={activeDropdown}
                              setActiveComponent={setActiveDropdown}
                              label={`${filters.find((filter: IFilter) => filter.id === categoryFilter.filter_id)!.filter}`}
                              items={
                                filters
                                  .find((filter: IFilter) => filter.id === categoryFilter.filter_id)!
                                  .items.map((filterItem: IFilterItem) => {
                                    return {
                                      id: filterItem.id,
                                      text: filterItem.filter_item,
                                      is_selected: catalogFilter.product_filters.includes(filterItem.id),
                                    } as IDropdownItem;
                                  }) as IDropdownItem[]
                              }
                              isFullWidth={true}
                              onItemSelect={(item: IDropdownItem) => {
                                if (catalogFilter.product_filters.includes(item.id)) {
                                  setCatalogFilter({
                                    ...catalogFilter,
                                    product_filters: catalogFilter.product_filters.filter(
                                      (value: number) => value !== item.id
                                    ),
                                  });
                                } else {
                                  setCatalogFilter({
                                    ...catalogFilter,
                                    product_filters: [...catalogFilter.product_filters, item.id],
                                  });
                                }
                              }}
                            />
                          ) : null}
                        </div>
                      ))}
                  </>
                ) : null}
                <div className={`${styles.main_filter} ${styles.slider}`}>
                  {category.filters.filter((filter: ICategoryFilter) => filter.filter_id === 1).length > 0 ? (
                    <div className={styles.filter}>
                      <InputSlider
                        min={2}
                        max={50}
                        label="Объем, м³"
                        unit="м³"
                        onChange={(value) => setCatalogFilter({ ...catalogFilter, max_volume: value })}
                      />
                    </div>
                  ) : null}
                  <div className={`${styles.filter} ${styles.price}`}>
                    Цена, ₽
                    <div className={styles.inputs}>
                      <input
                        type="text"
                        placeholder="от 50 000"
                        value={catalogFilter.min_price === 0 ? "" : catalogFilter.min_price}
                        className={
                          (catalogFilter.min_price < 50000 && catalogFilter.min_price > 0) ||
                          (catalogFilter.max_price > 0 && catalogFilter.min_price > catalogFilter.max_price)
                            ? appStyles.wrong
                            : ""
                        }
                        onChange={(event) =>
                          setCatalogFilter({
                            ...catalogFilter,
                            min_price:
                              Number.isNaN(Number(event.target.value)) || Number(event.target.value) < 0
                                ? catalogFilter.min_price
                                : Number(event.target.value),
                          })
                        }
                      />
                      <input
                        type="text"
                        placeholder="до 500 000"
                        value={catalogFilter.max_price === 0 ? "" : catalogFilter.max_price}
                        className={
                          catalogFilter.max_price > 500000 ||
                          (catalogFilter.max_price < 50000 && catalogFilter.max_price > 0) ||
                          (catalogFilter.max_price > 0 && catalogFilter.min_price > catalogFilter.max_price)
                            ? appStyles.wrong
                            : ""
                        }
                        onChange={(event) =>
                          setCatalogFilter({
                            ...catalogFilter,
                            max_price:
                              Number.isNaN(Number(event.target.value)) || Number(event.target.value) < 0
                                ? catalogFilter.max_price
                                : Number(event.target.value),
                          })
                        }
                      />
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
              {categoryProducts.length > 0 ? (
                <div className={styles.products_list}>
                  {categoryProducts.slice((currentPage - 1) * 12, (currentPage - 1) * 12 + 12).map((product: IProduct) => (
                    <div className={styles.card}>
                      <ProductCard product={product} viewType={windowSize.innerWidth < 361 ? viewType : 0} />
                    </div>
                  ))}
                </div>
              ) : null}
              {categoryProducts.length > 12 ? (
                <>
                  {currentPage !== 1 ? (
                    <div className={styles.prev_button} onClick={() => setCurrentPage(currentPage - 1)}>
                      <ArrowIcon />
                    </div>
                  ) : null}
                  {Math.ceil(categoryProducts.length / 12) > 7 ? (
                    <div className={styles.pagination}>
                      <div
                        className={`${styles.page} ${currentPage === 1 ? styles.active : ""}`}
                        onClick={() => setCurrentPage(1)}
                      >
                        1
                      </div>
                      {currentPage < 4 ? (
                        <div
                          className={`${styles.page} ${currentPage === 2 ? styles.active : ""}`}
                          onClick={() => setCurrentPage(2)}
                        >
                          2
                        </div>
                      ) : (
                        <div className={styles.separator}>...</div>
                      )}
                      <>
                        {currentPage < 4
                          ? Array(3)
                              .fill(1)
                              .map((_value, index: number) => (
                                <div
                                  className={`${styles.page} ${currentPage === 3 + index ? styles.active : ""}`}
                                  onClick={() => setCurrentPage(3 + index)}
                                >
                                  {3 + index}
                                </div>
                              ))
                          : null}
                        {currentPage > Math.ceil(categoryProducts.length / 12) - 3
                          ? Array(3)
                              .fill(1)
                              .map((_value, index: number) => (
                                <div
                                  className={`${styles.page} ${
                                    currentPage === Math.ceil(categoryProducts.length / 12) - 4 + index ? styles.active : ""
                                  }`}
                                  onClick={() => setCurrentPage(categoryProducts.length / 12 - 4 + index)}
                                >
                                  {categoryProducts.length / 12 - 4 + index}
                                </div>
                              ))
                          : null}
                        {currentPage > 3 && currentPage < Math.ceil(categoryProducts.length / 12) - 2
                          ? Array(3)
                              .fill(1)
                              .map((_value, index: number) => (
                                <div
                                  className={`${styles.page} ${
                                    currentPage === currentPage - 1 + index ? styles.active : ""
                                  }`}
                                  onClick={() => setCurrentPage(currentPage - 1 + index)}
                                >
                                  {currentPage - 1 + index}
                                </div>
                              ))
                          : null}
                      </>
                      {currentPage > Math.ceil(categoryProducts.length / 12) - 3 ? (
                        <div
                          className={`${styles.page} ${
                            currentPage === Math.ceil(categoryProducts.length / 12) - 1 ? styles.active : ""
                          }`}
                          onClick={() => setCurrentPage(categoryProducts.length / 12 - 1)}
                        >
                          {categoryProducts.length / 12 - 1}
                        </div>
                      ) : (
                        <div className={styles.separator}>...</div>
                      )}
                      <div
                        className={`${styles.page} ${
                          currentPage === Math.ceil(categoryProducts.length / 12) ? styles.active : ""
                        }`}
                        onClick={() => setCurrentPage(categoryProducts.length / 12)}
                      >
                        {categoryProducts.length / 12}
                      </div>
                    </div>
                  ) : (
                    <div className={styles.pagination}>
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
                    </div>
                  )}
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
        {Array.isArray(products) &&
        products !== undefined &&
        products.filter((product: IProduct) => product.is_recomendated).length > 0 ? (
          <div className={styles.recommended_products}>
            <h4>Возможно вас заинтересует</h4>
            <div className={styles.recommended_products_list}>
              {products
                .filter((product: IProduct) => product.is_recomendated)
                .map((product: IProduct) => (
                  <div className={styles.card}>
                    <ProductCard product={product} viewType={0} />
                  </div>
                ))}
            </div>
            <div className={styles.slider}>
              {products.filter((product: IProduct) => product.is_recomendated).length === 1 ? (
                <div className={styles.card}>
                  <ProductCard product={products.filter((product: IProduct) => product.is_recomendated)[0]} viewType={0} />
                </div>
              ) : (
                <Slider ref={slider} {...settings}>
                  {products
                    .filter((product: IProduct) => product.is_recomendated)
                    .map((product: IProduct) => (
                      <div>
                        <div className={styles.card}>
                          <ProductCard product={product} viewType={0} />
                        </div>
                      </div>
                    ))}
                </Slider>
              )}
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
            {category.filters.filter((filter: ICategoryFilter) => filter.filter_id === 0).length > 0 ? (
              <MultiDropdown
                dropdownType={DropdownType.ManufacturerSelector}
                activeComponent={activeDropdown}
                setActiveComponent={setActiveDropdown}
                label="Производитель"
                items={
                  manufacturers.map((manufacturer: IManufacturer) => {
                    return {
                      id: manufacturer.id,
                      text: manufacturer.manufacturer,
                      is_selected: catalogFilter.manufacturers.includes(manufacturer.id),
                    } as IDropdownItem;
                  }) as IDropdownItem[]
                }
                isFullWidth={true}
                onItemSelect={(item: IDropdownItem) => {
                  if (catalogFilter.manufacturers.includes(item.id)) {
                    setCatalogFilter({
                      ...catalogFilter,
                      manufacturers: catalogFilter.manufacturers.filter((value: number) => value !== item.id),
                    });
                  } else {
                    setCatalogFilter({
                      ...catalogFilter,
                      manufacturers: [...catalogFilter.manufacturers, item.id],
                    });
                  }
                  setActiveDropdown(DropdownType.None);
                }}
              />
            ) : null}
            {category.filters.filter((filter: ICategoryFilter) => filter.filter_id > 1).length > 0 ? (
              <>
                {category.filters
                  .filter((filter: ICategoryFilter) => filter.filter_id > 1)
                  .map((categoryFilter: ICategoryFilter) => (
                    <>
                      {filters.filter((filter: IFilter) => filter.id === categoryFilter.filter_id).length > 0 ? (
                        <MultiDropdown
                          dropdownType={categoryFilter.id + 50}
                          activeComponent={activeDropdown}
                          setActiveComponent={setActiveDropdown}
                          label={`${filters.find((filter: IFilter) => filter.id === categoryFilter.filter_id)!.filter}`}
                          items={
                            filters
                              .find((filter: IFilter) => filter.id === categoryFilter.filter_id)!
                              .items.map((filterItem: IFilterItem) => {
                                return {
                                  id: filterItem.id,
                                  text: filterItem.filter_item,
                                  is_selected: catalogFilter.product_filters.includes(filterItem.id),
                                } as IDropdownItem;
                              }) as IDropdownItem[]
                          }
                          isFullWidth={true}
                          onItemSelect={(item: IDropdownItem) => {
                            if (catalogFilter.product_filters.includes(item.id)) {
                              setCatalogFilter({
                                ...catalogFilter,
                                product_filters: catalogFilter.product_filters.filter((value: number) => value !== item.id),
                              });
                            } else {
                              setCatalogFilter({
                                ...catalogFilter,
                                product_filters: [...catalogFilter.product_filters, item.id],
                              });
                            }
                          }}
                        />
                      ) : null}
                    </>
                  ))}
              </>
            ) : null}
            <div />
            Цена, ₽
            <input
              type="text"
              placeholder="от 50 000"
              value={catalogFilter.min_price === 0 ? "" : catalogFilter.min_price}
              className={
                (catalogFilter.min_price < 50000 && catalogFilter.min_price > 0) ||
                (catalogFilter.max_price > 0 && catalogFilter.min_price > catalogFilter.max_price)
                  ? appStyles.wrong
                  : ""
              }
              onChange={(event) =>
                setCatalogFilter({
                  ...catalogFilter,
                  min_price:
                    Number.isNaN(Number(event.target.value)) || Number(event.target.value) < 0
                      ? catalogFilter.min_price
                      : Number(event.target.value),
                })
              }
            />
            <input
              type="text"
              placeholder="до 500 000"
              value={catalogFilter.max_price === 0 ? "" : catalogFilter.max_price}
              className={
                catalogFilter.max_price > 500000 ||
                (catalogFilter.max_price < 50000 && catalogFilter.max_price > 0) ||
                (catalogFilter.max_price > 0 && catalogFilter.min_price > catalogFilter.max_price)
                  ? appStyles.wrong
                  : ""
              }
              onChange={(event) =>
                setCatalogFilter({
                  ...catalogFilter,
                  max_price:
                    Number.isNaN(Number(event.target.value)) || Number(event.target.value) < 0
                      ? catalogFilter.max_price
                      : Number(event.target.value),
                })
              }
            />
            <div className={styles.filter}></div>
          </div>
          <div className={styles.clear_filters} onClick={() => setCatalogFilter(initCatalogFilter())}>
            <CloseIcon /> Очистить фильтр
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
