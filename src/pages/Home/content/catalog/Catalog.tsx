import { useNavigate } from "react-router-dom";

import { useTypedSelector } from "../../../../hooks/useTypedSeletor";

import pageStyles from "../../Home.module.sass";
import styles from "./Catalog.module.sass";

import { productionCategoriesList } from "../../../../data/productionCategoriesList";

import { IProductionCategory } from "../../../../types/production/productionCategory";

const Catalog = () => {
  const navigate = useNavigate();
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);

  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.container_content}>
        <h3>Каталог</h3>
        <div className={styles.content}>
          <div className={styles.catalog_list}>
            {productionCategoriesList.map((productionCategory: IProductionCategory) => (
              <div
                className={`${styles.item} ${productionCategory.id === 0 ? styles.big : ""}`}
                onClick={() => navigate(`/catalog/0`)}
              >
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `${
                      windowSize.innerWidth < 1381 ? `url(/uploads/production/${productionCategory.prefix}_main.png)` : ""
                    }`,
                  }}
                >
                  {windowSize.innerWidth > 1380 ? (
                    <img src={`/uploads/production/${productionCategory.prefix}_main.png`} alt="" />
                  ) : null}
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
