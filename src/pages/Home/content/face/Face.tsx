import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Slider from "react-slick";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";

import { useTypedSelector } from "../../../../hooks/useTypedSeletor";

import styles from "./Face.module.sass";

import { ICategory } from "../../../../types/category/category";
import { initCategory } from "../../../../types/category/initCategory";

import FaceImage from "../../../../assets/images/face_image.png";
import { ButtonArrow as ArrowIcon } from "../../../../assets/svg/ButtonArrow";
import { IProduct } from "src/types/product/product";

const Face = () => {
  const secondaryInfo = useTypedSelector((state) => state.secondaryInfoReducer.secondaryInfo);
  const categories = useTypedSelector((state) => state.categoryReducer.categories);
  const products = useTypedSelector((state) => state.productReducer.products);
  const [currentCategory, setCurrentCategory] = useState(initCategory());
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
    centerPadding: "275px",
    variableHeight: true,
    swipeToSlide: false,
    slidesToShow: 1,
    speed: 400,
    cssEase: "ease-out",
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
    speed: 400,
    cssEase: "ease-out",
    initialSlide: 0,
    arrows: false,
  };

  useLayoutEffect(() => {
    if (windowSize.innerWidth > 1380) {
      setProductionsGap(30);
    } else {
      setProductionsGap(20);
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(categories) && categories !== undefined && categories.length > 0) {
      setCurrentCategory(categories[0]);
    }
  }, [categories]);

  useEffect(() => {
    if (windowSize.innerWidth > 1380) {
      setProductionsGap(30);
    } else if (windowSize.innerWidth < 1381 && windowSize.innerWidth > 625) {
      setProductionsGap(20);
    } else {
      setProductionsGap(10);
    }
  }, [windowSize]);

  const handleProductionOnClick = async (category: ICategory) => {
    setIsTransition(true);
    var indicator = document.getElementById("indicator");
    var production = document.getElementById("production");
    indicator!.style.marginLeft = `${
      (production!.clientWidth - indicator!.clientWidth) / 2 +
      (category.id - 1) * production!.clientWidth +
      (category.id - 1) * productionsGap
    }px`;
    await new Promise((res) => setTimeout(res, 200));
    setCurrentCategory(category);
    setIsTransition(false);
    sliderVertical?.current?.slickGoTo(category.id - 1);
    sliderHorizontal?.current?.slickGoTo(category.id - 1);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.face_container}>
        <div className={styles.container}>
          <div className={styles.title}>Продажа и производство холодильного оборудования любой сложности</div>
          <button type="button" onClick={() => navigate("/catalog/0")}>
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
              {secondaryInfo.cameras_count !== undefined ? (
                <div className={styles.about_item}>{`${secondaryInfo.cameras_count} холодильных камер`}</div>
              ) : null}
              {secondaryInfo.chillers_count !== undefined ? (
                <div className={styles.about_item}>{`${secondaryInfo.chillers_count} чиллеров`}</div>
              ) : null}
              {secondaryInfo.generators_count !== undefined ? (
                <div className={styles.about_item}>{`${secondaryInfo.generators_count} генераторов ледяной воды`}</div>
              ) : null}
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
              {Array.isArray(categories) && categories !== undefined && categories.length > 0 ? (
                <div className={styles.production_list}>
                  {categories
                    .filter((category: ICategory) => category.is_main)
                    .map((category: ICategory) => (
                      <div
                        className={styles.production_item}
                        id={category.id - 1 === 0 ? "production" : ""}
                        onClick={() => handleProductionOnClick(category)}
                      >
                        <img src={`/uploads/${category.img_path}`} alt="" />
                      </div>
                    ))}
                </div>
              ) : null}
              <div className={styles.indicator} id="indicator" />
            </div>
            <div className={styles.description_container}>
              <div className={styles.description}>
                <div className={styles.text}>
                  <div className={`${styles.name} ${!isTransition ? styles.active : ""}`}>{currentCategory.category}</div>
                  <div className={`${styles.about} ${!isTransition ? styles.active : ""}`}>
                    {parse(currentCategory.description)}
                  </div>
                  <div className={styles.bottom}>
                    <div className={`${styles.price} ${!isTransition ? styles.active : ""}`}>{`от ${
                      products.length > 0 &&
                      products.filter((product: IProduct) => product.category_id === currentCategory.id).length > 0
                        ? Math.min(
                            ...products
                              .filter((product: IProduct) => product.category_id === currentCategory.id)
                              .map((product: IProduct) => product.price)
                          ).toLocaleString()
                        : 0
                    }₽`}</div>
                    <button type="button" onClick={() => navigate(`/catalog/${currentCategory.id}`)}>
                      Перейти в каталог
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.slider} ${styles.vertical}`}>
            <div className={styles.overlay} />
            {Array.isArray(categories) && categories !== undefined && categories.length > 0 ? (
              <Slider ref={sliderVertical} {...settingsVertical}>
                {categories
                  .filter((category: ICategory) => category.is_main)
                  .map((category: ICategory) => (
                    <div>
                      <div className={styles.image}>
                        <img
                          className={category.id === currentCategory.id ? styles.active : ""}
                          src={`/uploads/${category.img_path}`}
                          alt=""
                        />
                      </div>
                    </div>
                  ))}
              </Slider>
            ) : null}
            <div className={`${styles.overlay} ${styles.bottom}`} />
          </div>
          <div className={`${styles.slider} ${styles.horizontal}`}>
            {Array.isArray(categories) && categories !== undefined && categories.length > 0 ? (
              <Slider ref={sliderHorizontal} {...settingsHorizontal}>
                {categories
                  .filter((category: ICategory) => category.is_main)
                  .map((category: ICategory) => (
                    <div>
                      <div className={styles.image}>
                        <img
                          className={category.id === currentCategory.id ? styles.active : ""}
                          src={`/uploads/${category.img_path}`}
                          alt=""
                        />
                      </div>
                    </div>
                  ))}
              </Slider>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Face;
