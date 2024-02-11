import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Slider from "react-slick";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";

import { useTypedSelector } from "../../../../hooks/useTypedSeletor";

import styles from "./Face.module.sass";

import { productionCategoriesList } from "../../../../data/productionCategoriesList";

import { IProductionCategory } from "../../../../types/production/productionCategory";

import FaceImage from "../../../../assets/images/face_image.png";
import { ButtonArrow as ArrowIcon } from "../../../../assets/svg/ButtonArrow";

const Face = () => {
  const [currentProductionCategory, setCurrentProductionCategory] = useState(productionCategoriesList[0]);
  const [isTransition, setIsTransition] = useState(false);
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const [productionsGap, setProductionsGap] = useState(30);
  const navigate = useNavigate();
  const sliderVertical = useRef(null as Slider);
  const sliderHorizontal = useRef(null as Slider);

  const settingsVertical = {
    className: "center",
    centerMode: true,
    infinite: true,
    autoplay: false,
    centerPadding: "350px",
    variableHeight: true,
    swipeToSlide: false,
    slidesToShow: 1,
    speed: 500,
    vertical: true,
    initialSlide: 0,
    verticalSwiping: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1380,
        settings: {
          centerPadding: "100px",
        },
      },
    ],
  };

  const settingsHorizontal = {
    className: "center",
    centerMode: true,
    infinite: true,
    autoplay: false,
    swipe: false,
    variableWidth: true,
    swipeToSlide: false,
    slidesToShow: 1,
    speed: 500,
    initialSlide: 0,
    arrows: false,
  };

  useLayoutEffect(() => {
    setCurrentProductionCategory(productionCategoriesList[0]);
    if (windowSize.innerWidth > 1380) {
      setProductionsGap(30);
    } else {
      setProductionsGap(20);
    }
  }, []);

  useEffect(() => {
    if (windowSize.innerWidth > 1380) {
      setProductionsGap(30);
    } else if (windowSize.innerWidth < 1381 && windowSize.innerWidth > 625) {
      setProductionsGap(20);
    } else {
      setProductionsGap(10);
    }
  }, [windowSize]);

  const handleProductionOnClick = async (productionCategory: IProductionCategory) => {
    setIsTransition(true);
    var indicator = document.getElementById("indicator");
    var production = document.getElementById("production");
    indicator!.style.marginLeft = `${
      (production!.clientWidth - indicator!.clientWidth) / 2 +
      productionCategory.id * production!.clientWidth +
      productionCategory.id * productionsGap
    }px`;
    await new Promise((res) => setTimeout(res, 200));
    setCurrentProductionCategory(productionCategory);
    setIsTransition(false);
    sliderVertical?.current?.slickGoTo(productionCategory.id);
    sliderHorizontal?.current?.slickGoTo(productionCategory.id);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.face_container}>
        <div className={styles.container}>
          <div className={styles.title}>Продажа и производство холодильного оборудования любой сложности</div>
          <button type="button">
            Продукция
            <ArrowIcon />
          </button>
          <div className={styles.separator}>
            <div className={styles.line} />
            <div className={styles.circle} />
          </div>
          <div className={styles.about}>
            <h5>Изготовили и установили</h5>
            <div className={styles.about_list}>
              <div className={styles.about_item}>2000 холодильных камер</div>
              <div className={styles.about_item}>500 чиллеров</div>
              <div className={styles.about_item}>1800 генераторов ледяной воды</div>
            </div>
          </div>
          <img src={FaceImage} alt="" />
        </div>
      </div>
      <div className={styles.slider_container}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.head}>
              <h1>Продукция</h1>
              <div className={styles.production_list}>
                {productionCategoriesList.map((productionCategory: IProductionCategory) => (
                  <div
                    className={styles.production_item}
                    id={productionCategory.id === 0 ? "production" : ""}
                    onClick={() => handleProductionOnClick(productionCategory)}
                  >
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
                    <button type="button" onClick={() => navigate(`/catalog/${currentProductionCategory.id}`)}>
                      Перейти в каталог
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.slider} ${styles.vertical}`}>
            <Slider ref={sliderVertical} {...settingsVertical}>
              {productionCategoriesList.map((productionCategory: IProductionCategory) => (
                <div>
                  <div className={styles.image}>
                    <img
                      className={currentProductionCategory.id === productionCategory.id ? styles.active : ""}
                      src={`/uploads/production/${productionCategory.prefix}.png`}
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className={`${styles.slider} ${styles.horizontal}`}>
            <Slider ref={sliderHorizontal} {...settingsHorizontal}>
              {productionCategoriesList.map((productionCategory: IProductionCategory) => (
                <div>
                  <div className={styles.image}>
                    <img
                      className={currentProductionCategory.id === productionCategory.id ? styles.active : ""}
                      src={`/uploads/production/${productionCategory.prefix}.png`}
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Face;
