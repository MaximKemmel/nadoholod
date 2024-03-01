import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSeletor";

import styles from "./Header.module.sass";

import MessageModal from "../Modal/MessageModal";
import OrderModal from "../Modal/OrderModal";

import { ICategory } from "../../types/category/category";

import Logo from "../../assets/images/logo_white.png";
import LogoBlue from "../../assets/images/logo_blue.png";
import { Search as SearchIcon } from "../../assets/svg/Search";
import { Arrow as ArrowIcon } from "../../assets/svg/Arrow";
import { Menu as MenuIcon } from "../../assets/svg/Menu";
import { Close as CloseIcon } from "../../assets/svg/Close";

const Header = () => {
  const { setIsNoScroll } = useActions();
  const navigate = useNavigate();
  const isHomePage = useTypedSelector((state) => state.mainReducer.isHomePage);
  const categories = useTypedSelector((state) => state.categoryReducer.categories);
  const [isMessageShow, setIsMessageShow] = useState(false);
  const [isOrderShow, setIsOrderShow] = useState(false);
  const [isNavActive, setIsNavActive] = useState(false);
  const [isSubNavActive, setIsSubNavActive] = useState(false);

  useEffect(() => {
    setIsNoScroll(isMessageShow || isOrderShow || isNavActive);
    if (isOrderShow || isMessageShow) {
      setIsNavActive(false);
    }
    setIsSubNavActive(false);
  }, [isMessageShow, isOrderShow, isNavActive]);

  return (
    <div className={`${styles.wrapper} ${isHomePage ? styles.home : ""}`}>
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.logo_container}>
            <img src={isHomePage ? Logo : LogoBlue} alt="" />
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
            <div className={styles.input_container}>
              <input type="text" placeholder="Найти..." />
              <SearchIcon />
            </div>
          </div>
        </div>
        <div className={styles.mobile_head}>
          <div className={styles.menu_button} onClick={() => setIsNavActive(true)}>
            <MenuIcon />
          </div>
          <div className={styles.input_container}>
            <input type="text" placeholder="Найти..." />
            <SearchIcon />
          </div>
          <div className={styles.logo}>
            <img src={isHomePage ? Logo : LogoBlue} alt="" />
          </div>
          <div className={styles.search_button}>
            <SearchIcon />
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
            <li>Компания</li>
            <li>Оборудование</li>
            <li>Производство</li>
            <li>Обслуживание</li>
            <li>Доставка</li>
            <li>Контакты</li>
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
      <MessageModal
        isShow={isMessageShow}
        setIsShow={setIsMessageShow}
        title="Заявка успешно отправлена!"
        message="Наш специалист свяжется с вами и уточнит детали заказа"
      />
      <OrderModal isShow={isOrderShow} setIsShow={setIsOrderShow} onSubmit={() => setIsMessageShow(true)} />
    </div>
  );
};

export default Header;
