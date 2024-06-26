import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

import { useActions } from "../../../../hooks/useActions";

import pageStyles from "../../Home.module.sass";
import styles from "./Service.module.sass";
import "../../../../slider.css";

import OrderModal from "../../../../components/Modal/OrderModal";

import ShopImage from "../../../../assets/images/shop.png";
import WarehouseImage from "../../../../assets/images/warehouse.png";
import ChillerImage from "../../../../assets/images/chiller.png";

const Service = () => {
  const { setIsNoScroll } = useActions();
  const [isOrderShow, setIsOrderShow] = useState(false);
  const slider = useRef(null as Slider);

  useEffect(() => {
    setIsNoScroll(isOrderShow);
  }, [isOrderShow]);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    centerPadding: "50px",
    slidesToShow: 1,
    speed: 500,
  };

  return (
    <>
      <div className={pageStyles.container} id="service_container">
        <div className={pageStyles.container_content}>
          <h3>Обслуживание</h3>
          <div className={`${pageStyles.about} ${pageStyles.services}`}>
            Примеры стоимости ежемесячного обслуживания для разных объектов
          </div>
          <div className={styles.service_list}>
            <div className={styles.service_item}>
              <img src={ShopImage} alt="" />
              <div className={styles.description}>
                <div className={styles.name}>Продуктовый магазин</div>
                <div className={styles.more_info}>5-6 витрин</div>
                <div className={styles.price}>7 000 ₽/мес</div>{" "}
                <button type="button" onClick={() => setIsOrderShow(true)}>
                  Оставить заявку
                </button>
              </div>
            </div>
            <div className={styles.service_item}>
              <img src={WarehouseImage} alt="" />
              <div className={styles.description}>
                <div className={styles.name}>Склад (камера)</div>
                <div className={styles.more_info}>Склад до 100 м³</div>
                <div className={styles.price}>5 000 ₽/мес</div>
                <button type="button" onClick={() => setIsOrderShow(true)}>
                  Оставить заявку
                </button>
              </div>
            </div>
            <div className={styles.service_item}>
              <img src={ChillerImage} alt="" />
              <div className={styles.description}>
                <div className={styles.name}>Чиллер</div>
                <div className={styles.more_info}>до 30 кВт</div>
                <div className={styles.price}>20 000 ₽/мес</div>
                <button type="button" onClick={() => setIsOrderShow(true)}>
                  Оставить заявку
                </button>
              </div>
            </div>
          </div>
          <div className={styles.slider}>
            <Slider ref={slider} {...settings}>
              <div>
                <div className={styles.service_item}>
                  <img src={ShopImage} alt="" />
                  <div className={styles.description}>
                    <div className={styles.name}>Продуктовый магазин</div>
                    <div className={styles.more_info}>5-6 витрин</div>
                    <div className={styles.price}>7 000 ₽/мес</div>
                    <button type="button" onClick={() => setIsOrderShow(true)}>
                      Оставить заявку
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.service_item}>
                  <img src={WarehouseImage} alt="" />
                  <div className={styles.description}>
                    <div className={styles.name}>Склад (камера)</div>
                    <div className={styles.more_info}>Склад до 100 м³</div>
                    <div className={styles.price}>5 000 ₽/мес</div>
                    <button type="button" onClick={() => setIsOrderShow(true)}>
                      Оставить заявку
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.service_item}>
                  <img src={ChillerImage} alt="" />
                  <div className={styles.description}>
                    <div className={styles.name}>Чиллер</div>
                    <div className={styles.more_info}>до 30 кВт</div>
                    <div className={styles.price}>20 000 ₽/мес</div>
                    <button type="button" onClick={() => setIsOrderShow(true)}>
                      Оставить заявку
                    </button>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
      <OrderModal isShow={isOrderShow} setIsShow={setIsOrderShow} />
    </>
  );
};

export default Service;
