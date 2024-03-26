import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSeletor";

import styles from "./Header.module.sass";

import OrderModal from "../Modal/OrderModal";

import { ICategory } from "../../types/category/category";

import Logo from "../../assets/images/logo_white.png";
import LogoBlue from "../../assets/images/logo_blue.png";
import { Search as SearchIcon } from "../../assets/svg/Search";
import { Arrow as ArrowIcon } from "../../assets/svg/Arrow";
import { Menu as MenuIcon } from "../../assets/svg/Menu";
import { Close as CloseIcon } from "../../assets/svg/Close";
import { IProduct } from "src/types/product/product";

const Header = () => {
  const { setIsNoScroll } = useActions();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHomePage = useTypedSelector((state) => state.mainReducer.isHomePage);
  const categories = useTypedSelector((state) => state.categoryReducer.categories);
  const products = useTypedSelector((state) => state.productReducer.products);
  const [isOrderShow, setIsOrderShow] = useState(false);
  const [isNavActive, setIsNavActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isSubNavActive, setIsSubNavActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setIsNoScroll(isOrderShow || isNavActive);
    if (isOrderShow) {
      setIsNavActive(false);
    }
    setIsSubNavActive(false);
  }, [isOrderShow, isNavActive]);

  useEffect(() => {
    if (isSearchActive) {
      const input = document.getElementById("searchInput");
      input?.focus();
    }
    setSearchValue("");
  }, [isSearchActive]);

  useEffect(() => {
    setSearchValue("");
    setIsSearchActive(false);
  }, [pathname]);

  const handleLinkOnClick = (link: string) => {
    setIsNavActive(false);
    if (isHomePage) {
      var element = document.getElementById(link);
      if (element !== null) {
        element!.scrollIntoView({
          behavior: "smooth",
        });
      }
    } else {
      navigate("/", { state: { currentContainer: link } });
    }
  };

  const unselectSearch = () => {
    setSearchValue("");
    setIsSearchActive(false);
  };

  return (
    <div className={`${styles.wrapper} ${isHomePage ? styles.home : ""}`}>
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.logo_container}>
            <img src={isHomePage ? Logo : LogoBlue} alt="" onClick={() => navigate("/")} />
            <div className={styles.company_content}>
              <div className={styles.name}>Холод PRO</div>
              <div className={styles.description}>
                Компания по производству, монтажу и обслуживанию холодильного оборудования
              </div>
            </div>
          </div>
          <div className={styles.actions_container}>
            <div className={styles.call_container}>
              <div className={styles.phone_number}>+7 913 234-97-54</div>
              <button type="button" onClick={() => setIsOrderShow(true)}>
                Заказать звонок
              </button>
              <div className={styles.empty} />
            </div>
            <div className={styles.input_container} onBlur={() => setTimeout(unselectSearch, 500)}>
              <input
                type="text"
                placeholder="Найти..."
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
              <SearchIcon />
              {searchValue.trim() !== "" &&
              Array.isArray(products) &&
              products !== undefined &&
              products.filter((product: IProduct) => product.name.toLowerCase().includes(searchValue.toLowerCase().trim()))
                .length > 0 ? (
                <div className={styles.search_values}>
                  {products
                    .filter((product: IProduct) => product.name.toLowerCase().includes(searchValue.toLowerCase().trim()))
                    .map((product: IProduct) => (
                      <div
                        className={styles.value}
                        onClick={() => {
                          navigate(`/product/${product.id}`);
                        }}
                      >
                        {product.name}
                      </div>
                    ))}
                </div>
              ) : (
                <>
                  {searchValue.trim() !== "" ? (
                    <div className={styles.search_values}>
                      <div className={styles.not_found}>Ничего не найдено</div>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles.mobile_head}>
          <div className={styles.menu_button} onClick={() => setIsNavActive(true)}>
            <MenuIcon />
          </div>
          <div className={styles.input_container} onBlur={() => setTimeout(unselectSearch, 500)}>
            <input
              type="text"
              placeholder="Найти..."
              onBlur={() => setIsSearchActive(false)}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <SearchIcon />
            {searchValue.trim() !== "" &&
            Array.isArray(products) &&
            products !== undefined &&
            products.filter((product: IProduct) => product.name.toLowerCase().includes(searchValue.toLowerCase().trim()))
              .length > 0 ? (
              <div className={styles.search_values}>
                {products
                  .filter((product: IProduct) => product.name.toLowerCase().includes(searchValue.toLowerCase().trim()))
                  .map((product: IProduct) => (
                    <div
                      className={styles.value}
                      onClick={() => {
                        navigate(`/product/${product.id}`);
                      }}
                    >
                      {product.name}
                    </div>
                  ))}
              </div>
            ) : (
              <>
                {searchValue.trim() !== "" ? (
                  <div className={styles.search_values}>
                    <div className={styles.not_found}>Ничего не найдено</div>
                  </div>
                ) : null}
              </>
            )}
          </div>
          <div className={styles.logo} onClick={() => navigate("/")}>
            <img src={isHomePage ? Logo : LogoBlue} alt="" />
          </div>
          <div className={styles.mob_search_container} onBlur={() => setTimeout(unselectSearch, 500)}>
            <div className={`${styles.input_container} ${isSearchActive ? styles.active : ""}`}>
              <input
                type="text"
                placeholder="Найти..."
                id="searchInput"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
              <SearchIcon />
              {searchValue.trim() !== "" &&
              Array.isArray(products) &&
              products !== undefined &&
              products.filter((product: IProduct) => product.name.toLowerCase().includes(searchValue.toLowerCase().trim()))
                .length > 0 ? (
                <div className={styles.search_values}>
                  {products
                    .filter((product: IProduct) => product.name.toLowerCase().includes(searchValue.toLowerCase().trim()))
                    .map((product: IProduct) => (
                      <div
                        className={styles.value}
                        onClick={() => {
                          navigate(`/product/${product.id}`);
                        }}
                      >
                        {product.name}
                      </div>
                    ))}
                </div>
              ) : (
                <>
                  {searchValue.trim() !== "" ? (
                    <div className={styles.search_values}>
                      <div className={styles.not_found}>Ничего не найдено</div>
                    </div>
                  ) : null}
                </>
              )}
            </div>
            <div
              className={`${styles.search_button} ${isSearchActive ? styles.close : ""}`}
              onClick={() => setIsSearchActive(!isSearchActive)}
            >
              {isSearchActive ? <CloseIcon /> : <SearchIcon />}
            </div>
          </div>
        </div>
        <nav className={isNavActive ? styles.active : ""}>
          <div className={styles.overlay} onClick={() => setIsNavActive(false)} />
          <ul className={`${styles.main_menu} ${!isSubNavActive ? styles.active : ""}`}>
            <div className={styles.close_button} onClick={() => setIsNavActive(false)}>
              <CloseIcon />
            </div>
            <li
              onClick={() => {
                setIsNavActive(false);
                navigate("/");
              }}
            >
              Главная
            </li>
            <li onClick={() => setIsSubNavActive(true)}>
              Продукция <ArrowIcon />
              {Array.isArray(categories) && categories !== undefined && categories.length > 0 ? (
                <ul className={styles.sub_menu}>
                  {categories
                    .filter((category: ICategory) => category.show_in_nav)
                    .map((category: ICategory, index: number) => (
                      <li
                        className={index ? styles.bordered : ""}
                        onClick={() => {
                          setIsNavActive(false);
                          navigate(`/catalog/${category.id}`);
                        }}
                      >
                        {category.category}
                        {/*
                        <ArrowIcon />
                        <ul className={styles.last_sub_menu}>
                          <li onClick={() => navigate(`/catalog/0`)}>
                            Элемент 1<ArrowIcon />
                          </li>
                          <li className={styles.bordered} onClick={() => navigate(`/catalog/0`)}>
                            Элемент 2<ArrowIcon />
                          </li>
                          <li className={styles.bordered} onClick={() => navigate(`/catalog/0`)}>
                            Элемент 3<ArrowIcon />
                          </li>
                        </ul>*/}
                      </li>
                    ))}
                </ul>
              ) : null}
            </li>
            <li onClick={() => handleLinkOnClick("about_container")}>Компания</li>
            <li onClick={() => handleLinkOnClick("equipment_container")}>Оборудование</li>
            <li onClick={() => handleLinkOnClick("production_container")}>Производство</li>
            <li onClick={() => handleLinkOnClick("service_container")}>Обслуживание</li>
            <li onClick={() => handleLinkOnClick("delivery_container")}>Доставка</li>
            <li onClick={() => handleLinkOnClick("contacts_container")}>Контакты</li>
            <div className={styles.contacts_block}>
              <div className={styles.phone_number}>+7 913 234-97-54</div>
              <button type="button" onClick={() => setIsOrderShow(true)}>
                Заказать звонок
              </button>
            </div>
          </ul>
          <ul className={`${styles.main_menu} ${isSubNavActive ? styles.active : ""} ${styles.mobile}`}>
            <div className={styles.close_button} onClick={() => setIsNavActive(false)}>
              <CloseIcon />
            </div>
            <li className={styles.reverse} onClick={() => setIsSubNavActive(false)}>
              <ArrowIcon />
              Продукция
            </li>
            {Array.isArray(categories) && categories !== undefined && categories.length > 0 ? (
              <>
                {categories
                  .filter((category: ICategory) => category.is_main)
                  .map((category: ICategory, index: number) => (
                    <li
                      className={index ? styles.bordered : ""}
                      onClick={() => {
                        setIsNavActive(false);
                        navigate(`/catalog/${category.id}`);
                      }}
                    >
                      {category.category}
                    </li>
                  ))}
              </>
            ) : null}
          </ul>
        </nav>
      </div>
      <OrderModal isShow={isOrderShow} setIsShow={setIsOrderShow} />
    </div>
  );
};

export default Header;
