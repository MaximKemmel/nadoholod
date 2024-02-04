import pageStyles from "../../Home.module.sass";
import styles from "./Delivery.module.sass";

import MapImage from "../../../../assets/images/map.png";

const Delivery = () => {
  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.container_content}>
        <h3>Доставка</h3>
        <div className={pageStyles.about}>
          Наши специалисты проконсультируют по вопросам наличия товара на складе, отгрузки позиций, расскажут о технических
          особенностях интересующего оборудовани
        </div>
        <div className={styles.content}>
          <div className={styles.delivery}>
            <div className={styles.delivery_item}>
              <div className={styles.label}>{">"}1000 доставок по России</div>
              <div className={styles.value}>
                Наша компания осуществляет доставку приобретённого оборудования в любую точку России.
              </div>
            </div>
            <div className={styles.delivery_item}>
              <div className={styles.label}>12 месяцев гарантии</div>
              <div className={styles.value}>
                Обращаем ваше внимание, что на все типы оборудования и услуги наша компания предоставляет гарантию 12
                месяцев, поэтому убедительно просим вас сохранять все полученные от нас документы
              </div>
            </div>
            <div className={styles.delivery_phone}>+7 913 234-97-54</div>
            <div className={styles.delivery_item}>
              <div className={styles.value}>
                Для получения информации о сроках поставки конкретного наименования позвоните по контактным телефонам.
              </div>
            </div>
            <button type="button">Оставить заявку</button>
          </div>
          <div className={styles.map_container}>
            <div className={styles.title}>Нам доверяют. Мы производим.</div>
            <img src={MapImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
