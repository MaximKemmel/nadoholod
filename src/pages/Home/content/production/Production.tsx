//import { useRef, useState } from "react";
//import Slider from "react-slick";

import pageStyles from "../../Home.module.sass";
import styles from "./Production.module.sass";

import SliderPhoto from "../../../../assets/images/production.png";

const Production = () => {
  /*const [currentIndex, setCurrentIndex] = useState(0);
  const slider = useRef(null as Slider);

  const settings = {
    className: "center",
    infinite: true,
    slidesToShow: 1,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    afterChange: (index) => {
      setCurrentIndex(index);
    },
  };*/

  return (
    <div className={pageStyles.container} id="production_container">
      <div className={styles.container_content}>
        <div className={styles.content}>
          <h3>Производство</h3>
          <div className={styles.about}>
            Изготавливаем холодильное оборудование для объектов малого, среднего и крупного бизнеса
          </div>
          <div className={styles.production_items}>
            <div className={styles.production_item}>
              <h5>{new Date().getFullYear() - 2016} лет</h5>
              <div className={styles.value}>На рынке производства холодильного оборудования</div>
            </div>
            <div className={styles.production_item}>
              <h5>500 поставок</h5>
              <div className={styles.value}>По всей России</div>
            </div>
            <div className={styles.production_item}>
              <h5>600 м³</h5>
              <div className={styles.value}>собственного производства</div>
            </div>
          </div>
        </div>
        <div className={styles.slider}>
          <img src={SliderPhoto} alt="" />
          {/*
          <Slider ref={slider} {...settings}>
            {Array(4)
              .fill(1)
              .map(() => (
                <img src={SliderPhoto} alt="" />
              ))}
          </Slider>
          <div className={styles.slider_actions}>
            {Array(4)
              .fill(1)
              .map((_value, index: number) => (
                <div
                  className={`${styles.action} ${index === currentIndex ? styles.active : ""}`}
                  onClick={() => slider?.current?.slickGoTo(index)}
                />
              ))}
          </div>
          */}
        </div>
      </div>
    </div>
  );
};

export default Production;
