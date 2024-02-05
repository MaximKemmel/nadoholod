import { useLayoutEffect, useState } from "react";
import parse from "html-react-parser";

import styles from "./Face.module.sass";

import { productionCategoriesList } from "../../../../data/productionCategoriesList";

import { IProductionCategory } from "../../../../types/production/productionCategory";

const Face = () => {
  const [currentProductionCategory, setCurrentProductionCategory] = useState(productionCategoriesList[0]);
  const [isTransition, setIsTransition] = useState(false);

  useLayoutEffect(() => {
    setCurrentProductionCategory(productionCategoriesList[0]);
    var carousel = document.getElementById("carousel");
    var items = document.getElementsByClassName("carousel_item");
    carousel?.scrollTo({
      top: (items[0] as HTMLElement).offsetTop - 400,
      behavior: "smooth",
    });
  }, []);

  const handleProductionOnClick = async (productionCategory: IProductionCategory) => {
    setIsTransition(true);
    var carousel = document.getElementById("carousel");
    carousel!.style.removeProperty("transform");
    var items = document.getElementsByClassName("carousel_item");
    var sum = 750;
    for (let index = 0; index < productionCategory.id; index++) {
      sum += items[index].clientHeight;
    }
    sum = items[productionCategory.id].clientHeight;
    carousel?.scrollTo({
      top: (items[productionCategory.id] as HTMLElement).offsetTop - 500,
      behavior: "smooth",
    });
    var indicator = document.getElementById("indicator");
    indicator!.style.marginLeft = `${20 + productionCategory.id * 80 + productionCategory.id * 30}px`;
    await new Promise((res) => setTimeout(res, 200));
    setCurrentProductionCategory(productionCategory);
    setIsTransition(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.slider_container}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.head}>
              <h1>Продукция</h1>
              <div className={styles.production_list}>
                {productionCategoriesList.map((productionCategory: IProductionCategory) => (
                  <div className={styles.production_item} onClick={() => handleProductionOnClick(productionCategory)}>
                    <img src={`/uploads/production/${productionCategory.prefix}.png`} alt="" />
                  </div>
                ))}
              </div>
              <div className={styles.indicator} id="indicator" />
            </div>
            <div className={styles.description_container}>
              <div className={styles.description}>
                <div className={styles.text}>
                  <div className={`${styles.name} ${!isTransition ? styles.active : ""}`}>
                    {currentProductionCategory.full_name}
                  </div>
                  <div className={`${styles.about} ${!isTransition ? styles.active : ""}`}>
                    {parse(currentProductionCategory.description)}
                  </div>
                  <div className={styles.bottom}>
                    <div
                      className={`${styles.price} ${!isTransition ? styles.active : ""}`}
                    >{`от ${currentProductionCategory.min_price.toLocaleString()}₽`}</div>
                    <button type="button">Перейти в каталог</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.slider} id="carousel">
            <div className={styles.carousel}>
              <img
                className={"carousel_item_tmp"}
                src={`/uploads/production/${productionCategoriesList[productionCategoriesList.length - 1].prefix}.png`}
                alt=""
              />
              {productionCategoriesList.map((productionCategory: IProductionCategory) => (
                <img
                  className={`carousel_item ${currentProductionCategory.id === productionCategory.id ? styles.active : ""}`}
                  src={`/uploads/production/${productionCategory.prefix}.png`}
                  alt=""
                />
              ))}
              <img
                className={"carousel_item_tmp"}
                src={`/uploads/production/${productionCategoriesList[0].prefix}.png`}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Face;