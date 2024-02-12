import { useEffect, useState } from "react";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSeletor";

import pageStyles from "../../Home.module.sass";
import styles from "./About.module.sass";

import { DoubleArrow as ArrowIcon } from "../../../../assets/svg/DoubleArrow";
import { Close as CloseIcon } from "../../../../assets/svg/Close";
import CompanyCardsImage from "../../../../assets/images/company_cards.png";
import CompetitionImage from "../../../../assets/images/competition.png";
import OrderImage from "../../../../assets/images/order_image.png";
import SnowImage from "../../../../assets/images/snow.png";

const About = () => {
  const { setIsNoScroll } = useActions();
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const [isOrderShow, setIsOrderShow] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  useEffect(() => {
    setIsNoScroll(isOrderShow);
  }, [isOrderShow]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setIsMessageVisible(true);
  };

  return (
    <div className={pageStyles.container} id="about_container">
      <div className={`${pageStyles.container} ${styles.relative}`}>
        <div className={pageStyles.container_content}>
          <div className={styles.content}>
            <div className={`${styles.head} ${styles.half}`}>
              <h3>О компании</h3>
              <div className={styles.about}>
                Инженерно-производственная компания с многолетним опытом производства холодильного оборудования. Наша
                компания производит и монтирует холодильное оборудование на всей территории России.
              </div>
            </div>
            <img className={styles.cards} src={CompanyCardsImage} alt="" />
            <div className={styles.evolution}>
              <div className={`${styles.title} ${styles.half}`}>Развитие компании</div>
              <div className={styles.stages}>
                <div className={`${styles.stage} ${styles.half}`}>
                  <div className={styles.num}>04</div>
                  <div className={styles.about}>Начало работы по производству и холодильных камер в Алтайском крае</div>
                </div>
                <div className={`${styles.stage} ${styles.tripple}`}>
                  <div className={styles.num}>03</div>
                  <div className={styles.about}>Начало работы по производству и холодильных камер в Алтайском крае</div>
                </div>
                <div className={`${styles.stage} ${styles.double}`}>
                  <div className={styles.num}>02</div>
                  <div className={styles.about}>Начало работы по производству и холодильных камер в Алтайском крае</div>
                </div>
                <div className={`${styles.stage} ${styles.first}`}>
                  <div className={styles.num}>01</div>
                  <div className={styles.about}>Начало работы по производству и холодильных камер в Алтайском крае</div>
                </div>
              </div>
            </div>
            <div className={styles.competition}>
              <div className={styles.description}>Первые по производству холодильных камер в Алтайском крае</div>
              <img src={CompetitionImage} alt="" />
            </div>
          </div>
        </div>
        <div className={styles.application_container} id="order_button">
          <div
            className={`${styles.application_button} ${isOrderShow ? styles.hidden : ""}`}
            onClick={() => {
              var orderButton = document.getElementById("order_button");
              var container = document.getElementById("about_container");
              window.scrollTo({
                top: container?.offsetTop! + orderButton?.offsetTop! - (windowSize.innerHeight - 615) / 2,
                behavior: "smooth",
              });
              setIsOrderShow(true);
            }}
          >
            <ArrowIcon />
            <div className={styles.button_text}>Подобрать оборудование</div>
          </div>
          <div className={`${styles.order} ${isOrderShow ? styles.active : ""}`}>
            <div className={styles.order_container}>
              <div className={styles.content}>
                <div className={styles.title}>Поможем подобрать холодильное оборудование!</div>
                <div className={styles.description}>Наш специалист свяжется с вами и уточнит детали заказа</div>
                <form onSubmit={handleOnSubmit}>
                  <input type="name" placeholder="Ваше имя" />
                  <input type="phone" placeholder="+7 (___) ___-__-__" />
                  <button type="submit" onClick={() => setIsMessageVisible(true)}>
                    Оставить заявку
                  </button>
                  <div className={styles.agreement}>
                    Продолжая, вы соглашаетесь{" "}
                    <span>со сбором и обработкой персональных данных и пользовательским соглашением</span>
                  </div>
                </form>
              </div>
              <div className={styles.image}>
                <img src={OrderImage} alt="" />
              </div>
              <div className={styles.close} onClick={() => setIsOrderShow(false)}>
                <CloseIcon />
              </div>
            </div>
          </div>
          <div className={`${styles.message} ${isMessageVisible ? styles.active : ""}`}>
            <div className={styles.message_container}>
              <div
                className={styles.close}
                onClick={() => {
                  setIsOrderShow(false);
                  setIsMessageVisible(false);
                }}
              >
                <CloseIcon />
              </div>
              <div className={styles.content}>
                <div className={styles.title}>Заявка успешно отправлена!</div>
                <div className={styles.description}>Наши менеджеры свяжутся с вами в ближайшее время</div>
              </div>
              <div className={styles.image}>
                <img src={SnowImage} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.overlay} ${isOrderShow ? styles.active : ""}`} />
    </div>
  );
};

export default About;
