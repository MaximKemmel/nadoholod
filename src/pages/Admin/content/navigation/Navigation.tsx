import { useActions } from "../../../../hooks/useActions";

import styles from "./Navigation.module.sass";

import LogoBlue from "../../../../assets/images/logo_blue.png";

interface INavigationProps {
  activeComponent: number;
  setActiveComponent: React.Dispatch<React.SetStateAction<number>>;
}

const Navigation: React.FC<INavigationProps> = ({ activeComponent, setActiveComponent }) => {
  const { logout } = useActions();

  return (
    <div className={styles.navigation}>
      <div className={styles.logo_container}>
        <img src={LogoBlue} alt="" />
        <div className={styles.title}>Панель управления</div>
      </div>
      <div className={styles.navigation_list}>
        <div className={styles.navigation_title}>Навигация</div>
        <div
          className={`${styles.navigation_item} ${activeComponent === 0 ? styles.active : ""}`}
          onClick={() => setActiveComponent(0)}
        >
          Категории
        </div>
        <div
          className={`${styles.navigation_item} ${activeComponent === 1 ? styles.active : ""}`}
          onClick={() => setActiveComponent(1)}
        >
          Товары
        </div>
        <div
          className={`${styles.navigation_item} ${activeComponent === 2 ? styles.active : ""}`}
          onClick={() => setActiveComponent(2)}
        >
          Аттрибуты
        </div>
        <div
          className={`${styles.navigation_item} ${activeComponent === 3 ? styles.active : ""}`}
          onClick={() => setActiveComponent(3)}
        >
          Фильтры
        </div>
        <div
          className={`${styles.navigation_item} ${activeComponent === 4 ? styles.active : ""}`}
          onClick={() => setActiveComponent(4)}
        >
          Производители
        </div>
        <div
          className={`${styles.navigation_item} ${activeComponent === 5 ? styles.active : ""}`}
          onClick={() => setActiveComponent(5)}
        >
          Другая информация
        </div>
      </div>
      <div className={styles.bottom_container}>
        <button type="button" onClick={() => logout()}>
          Выйти
        </button>
      </div>
    </div>
  );
};

export default Navigation;
