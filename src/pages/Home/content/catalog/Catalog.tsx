import { useNavigate } from "react-router-dom";

import pageStyles from "../../Home.module.sass";
import styles from "./Catalog.module.sass";

import { productionCategoriesList } from "../../../../data/productionCategoriesList";

import { IProductionCategory } from "../../../../types/production/productionCategory";

const Catalog = () => {
  const navigate = useNavigate();

  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.container_content}>
        <h3>Каталог</h3>
        <div className={styles.content}>
          <div className={styles.catalog_list}>
            {productionCategoriesList.map((productionCategory: IProductionCategory) => (
              <div className={styles.item} onClick={() => navigate(`/catalog/${productionCategory.id}`)}>
                <div className={styles.image}>
                  <img src={`/uploads/production/${productionCategory.prefix}_main.png`} alt="" />
                  <div className={styles.mask} />
                </div>
                <div className={styles.link}>{productionCategory.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
