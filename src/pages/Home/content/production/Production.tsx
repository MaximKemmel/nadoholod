import { useRef, useState } from "react";
import Slider from "react-slick";

import pageStyles from "../../Home.module.sass";
import styles from "./Production.module.sass";

import SliderPhoto from "../../../../assets/images/production.png";

const Production = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slider = useRef(null as Slider);

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "50px",
    slidesToShow: 1,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    afterChange: (index) => {
      console.log(currentIndex);
      setCurrentIndex(index);
    },
  };

  return (
    <div className={pageStyles.container}>
      <div className={styles.container_content}>
        <div className={styles.content}>
          <h3>Производство</h3>
          <div className={pageStyles.about}>
            Изготавливаем холодильное оборудование для объектов малого, среднего и крупного бизнеса
          </div>
          <div className={styles.production_items}>
            <div className={styles.production_item}>
              <div className={styles.label}>7 лет</div>
              <div className={styles.value}>На рынке производства холодильного оборудования</div>
            </div>
            <div className={styles.production_item}>
              <div className={styles.label}>500 поставок</div>
              <div className={styles.value}>По всей России</div>
            </div>
            <div className={styles.production_item}>
              <div className={styles.label}>600 м²</div>
              <div className={styles.value}>собственного производства</div>
            </div>
          </div>
        </div>
        <div className={styles.slider}>
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
        </div>
      </div>
    </div>
  );
};

export default Production;
