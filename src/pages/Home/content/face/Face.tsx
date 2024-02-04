import { useRef, useState } from "react";
import Slider from "react-slick";
import parse from "html-react-parser";

import styles from "./Face.module.sass";

import { productionCategoriesList } from "../../../../data/productionCategoriesList";

import { IProductionCategory } from "../../../../types/production/productionCategory";

const Face = () => {
  const [currentProductionCategory, setCurrentProductionCategory] = useState(productionCategoriesList[0]);
  const slider = useRef(null as Slider);

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "50px",
    centerMode: true,
    vertical: true,
    slidesToShow: 3,
    swipeToSlide: false,
    autoplay: false,
    arrows: false,
    variableWidth: true,
  };

  const handleProductionOnClick = (productionCategory: IProductionCategory) => {
    setCurrentProductionCategory(productionCategory);
    var indicator = document.getElementById("indicator");
    indicator!.style.marginLeft = `${20 + productionCategory.id * 80 + productionCategory.id * 30}px`;
    slider?.current?.slickGoTo(productionCategory.id);
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
                <div className={styles.name}>{currentProductionCategory.name}</div>
                <div className={styles.about}>{parse(currentProductionCategory.description)}</div>
                <div className={styles.bottom}></div>
              </div>
            </div>
          </div>
          <div className={styles.slider}>
            <Slider ref={slider} {...settings}>
              {productionCategoriesList.map((productionCategory: IProductionCategory) => (
                <img
                  src={`/uploads/production/${productionCategory.prefix}.png`}
                  className={currentProductionCategory.id === productionCategory.id ? styles.active : ""}
                  alt=""
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Face;
