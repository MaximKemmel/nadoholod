import styles from "./Header.module.sass";

import { productionCategoriesList } from "../../data/productionCategoriesList";

import { IProductionCategory } from "../../types/production/productionCategory";

import Logo from "../../assets/images/logo_white.png";

import { Search as SearchIcon } from "../../assets/svg/Search";
import { Arrow as ArrowIcon } from "../../assets/svg/Arrow";

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.logo_container}>
            <img src={Logo} alt="" />
            <div className={styles.company_content}>
              <div className={styles.name}>Холод PRO</div>
              <div className={styles.description}>
                Компания по производству, монтажу и обслуживанию холодильного оборудования
              </div>
            </div>
          </div>
          <div className={styles.actions_container}>
            <div className={styles.input_container}>
              <input placeholder="Найти..." />
              <SearchIcon />
            </div>
            <div className={styles.call_container}>
              <div className={styles.phone_number}>+7 913 234-97-54</div>
              <button type="button">Заказать звонок</button>
              <div className={styles.empty} />
            </div>
          </div>
        </div>
        <nav>
          <ul className={styles.main_menu}>
            <li>Главная</li>
            <li>
              Продукция <ArrowIcon />
              <ul className={styles.sub_menu}>
                {productionCategoriesList.map((productionCategory: IProductionCategory) => (
                  <li>
                    {productionCategory.full_name}
                    <ArrowIcon />
                    <ul className={styles.last_sub_menu}>
                      <li>Элемент 1</li>
                      <li>Элемент 2</li>
                      <li>Элемент 3</li>
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
