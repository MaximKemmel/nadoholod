import { useNavigate } from "react-router-dom";

import { useTypedSelector } from "../../../../hooks/useTypedSeletor";

import { ICategory } from "../../../../types/category/category";

import pageStyles from "../../Home.module.sass";
import styles from "./Catalog.module.sass";

const Catalog = () => {
  const navigate = useNavigate();
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const categories = useTypedSelector((state) => state.categoryReducer.categories);

  return (
    <div className={pageStyles.container} id="catalog_container">
      <div className={pageStyles.container_content}>
        <h3>Каталог</h3>
        <div className={styles.content}>
          {Array.isArray(categories) && categories !== undefined && categories.length > 0 ? (
            <div className={styles.catalog_list}>
              {categories
                .filter((category: ICategory) => category.is_main)
                .map((category: ICategory) => (
                  <div
                    className={`${styles.item} ${category.id - 1 === 0 ? styles.big : ""}`}
                    onClick={() => navigate(`/catalog/${category.id}`)}
                  >
                    <div
                      className={styles.image}
                      style={{
                        backgroundImage: `${
                          windowSize.innerWidth < 1381 ? `url(/uploads/categories/${category.id}_main.png)` : ""
                        }`,
                      }}
                    >
                      {windowSize.innerWidth > 1380 ? (
                        <img src={`/uploads/categories/${category.id}_main.png`} alt="" />
                      ) : null}
                      <div className={styles.mask} />
                    </div>
                    <div className={styles.link}>{category.category}</div>
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
