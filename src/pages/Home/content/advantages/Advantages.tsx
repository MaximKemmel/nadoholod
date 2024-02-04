import pageStyles from "../../Home.module.sass";
import styles from "./Advantages.module.sass";

import CarIcon from "../../../../assets/images/car.png";
import ShieldIcon from "../../../../assets/images/shield.png";
import VentilationIcon from "../../../../assets/images/ventilation.png";
import TimeIcon from "../../../../assets/images/time.png";
import ProcentsIcon from "../../../../assets/images/procents.png";
import ServiceIcon from "../../../../assets/images/service.png";

const Advantages = () => {
  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.container_content}>
        <h3>Преимущества</h3>
        <div className={styles.advantages}>
          <div className={styles.advantage}>
            <div className={styles.icon}>
              <img src={CarIcon} alt="" />
            </div>
            <div className={styles.description}>Доставка по всей России</div>
          </div>
          <div className={styles.advantage}>
            <div className={styles.icon}>
              <img src={ShieldIcon} alt="" />
            </div>
            <div className={styles.description}>Высококачественные материалы и технологии</div>
          </div>
          <div className={styles.advantage}>
            <div className={styles.icon}>
              <img src={VentilationIcon} alt="" />
            </div>
            <div className={styles.description}>Широкий ассортимент для различных отраслей промышленности</div>
          </div>
          <div className={styles.advantage}>
            <div className={styles.icon}>
              <img src={TimeIcon} alt="" />
            </div>
            <div className={styles.description}>Изготовление в кратчайшие сроки</div>
          </div>
          <div className={styles.advantage}>
            <div className={styles.icon}>
              <img src={ProcentsIcon} alt="" />
            </div>
            <div className={styles.description}>Гибкие условия сотрудничества</div>
          </div>
          <div className={styles.advantage}>
            <div className={styles.icon}>
              <img src={ServiceIcon} alt="" />
            </div>
            <div className={styles.description}>Сервисное обслуживание и постгарантийный ремонт</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advantages;
