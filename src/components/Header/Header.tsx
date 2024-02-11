import { useNavigate } from "react-router-dom";

import { useTypedSelector } from "../../hooks/useTypedSeletor";

import styles from "./Header.module.sass";

import { productionCategoriesList } from "../../data/productionCategoriesList";

import { IProductionCategory } from "../../types/production/productionCategory";

import Logo from "../../assets/images/logo_white.png";
import LogoBlue from "../../assets/images/logo_blue.png";

import { Search as SearchIcon } from "../../assets/svg/Search";
import { Arrow as ArrowIcon } from "../../assets/svg/Arrow";
import { Menu as MenuIcon } from "../../assets/svg/Menu";

const Header = () => {
  const isHomePage = useTypedSelector((state) => state.mainReducer.isHomePage);
  const navigate = useNavigate();

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
              <button type="button">Заказать звонок</button>
              <div className={styles.empty} />
            </div>
            <div className={styles.input_container}>
              <input type="text" placeholder="Найти..." />
              <SearchIcon />
            </div>
          </div>
        </div>
        <div className={styles.mobile_head}>
          <div className={styles.menu_button}>
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
        <nav>
          <ul className={styles.main_menu}>
            <li onClick={() => navigate("/")}>Главная</li>
            <li>
              Продукция <ArrowIcon />
              <ul className={styles.sub_menu}>
                {productionCategoriesList.map((productionCategory: IProductionCategory, index: number) => (
                  <li className={index ? styles.bordered : ""}>
                    {productionCategory.full_name}
                    <ArrowIcon />
                    <ul className={styles.last_sub_menu}>
                      <li>
                        Элемент 1<ArrowIcon />
                      </li>
                      <li className={styles.bordered}>
                        Элемент 2<ArrowIcon />
                      </li>
                      <li className={styles.bordered}>
                        Элемент 3<ArrowIcon />
                      </li>
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
            <li>Компания</li>
            <li>Оборудование</li>
            <li>Производство</li>
            <li>Обслуживание</li>
            <li>Доставка</li>
            <li>Контакты</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
