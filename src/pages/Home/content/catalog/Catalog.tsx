import pageStyles from "../../Home.module.sass";
import styles from "./Catalog.module.sass";

import ColdStorageImage from "../../../../assets/images/cold_storage.png";
import IceWaterGeneratorImage from "../../../../assets/images/ice_water_generator.png";
import ChillerImage from "../../../../assets/images/chiller_catalog.png";
import DryingChamberImage from "../../../../assets/images/drying_chamber.png";
import CentralCoolingImage from "../../../../assets/images/central_cooling.png";

const Catalog = () => {
  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.container_content}>
        <h3>Каталог</h3>
        <div className={styles.content}>
          <div className={styles.catalog_list}>
            <div className={styles.item}>
              <div className={styles.image}>
                <img src={ColdStorageImage} alt="" />
                <div className={styles.mask} />
              </div>
              <div className={styles.link}>Холодильные камеры</div>
            </div>
            <div className={styles.item}>
              <div className={styles.image}>
                <img src={IceWaterGeneratorImage} alt="" />
                <div className={styles.mask} />
              </div>
              <div className={styles.link}>Генератор ледяной воды</div>
            </div>
            <div className={styles.item}>
              <div className={styles.image}>
                <img src={ChillerImage} alt="" />
                <div className={styles.mask} />
              </div>
              <div className={styles.link}>Чиллеры</div>
            </div>
            <div className={styles.item}>
              <div className={styles.image}>
                <img src={DryingChamberImage} alt="" />
                <div className={styles.mask} />
              </div>
              <div className={styles.link}>Камеры сушки/вялки</div>
            </div>
            <div className={styles.item}>
              <div className={styles.image}>
                <img src={CentralCoolingImage} alt="" />
                <div className={styles.mask} />
              </div>
              <div className={styles.link}>Центральное холодоснабжение</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
