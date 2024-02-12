import { useEffect, useState } from "react";

import { useTypedSelector } from "../../hooks/useTypedSeletor";
import { useActions } from "../../hooks/useActions";

import styles from "./ContactUs.module.sass";

import MessageModal from "../Modal/MessageModal";
import OrderModal from "../Modal/OrderModal";

import SnowImage from "../../assets/images/snow.png";
import { Close as CloseIcon } from "../../assets/svg/Close";

const ContactUs = () => {
  const { setIsNoScroll } = useActions();
  const [symbolsCount, setSymbolsCount] = useState(0);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const [isMessageShow, setIsMessageShow] = useState(false);
  const [isOrderShow, setIsOrderShow] = useState(false);

  useEffect(() => {
    setIsNoScroll(isMessageShow || isOrderShow);
  }, [isMessageShow, isOrderShow]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (windowSize.innerWidth > 1024) {
      setIsMessageVisible(true);
    } else {
      setIsOrderShow(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content_wrapper}>
        <div className={styles.content}>
          <h4>
            Узнать стоимость монтажа
            <br />и обслуживания для объекта
            {windowSize.innerWidth < 1025 ? (
              <>
                .{windowSize.innerWidth > 1024 ? <br /> : " "}
                Мы на связи!
              </>
            ) : null}
          </h4>
          <div className={styles.description}>
            Мы не просто продаём, а подбираем для вас наилучшее решение в рамках бюджета
          </div>
        </div>
        <div className={styles.form}>
          <h5>Мы на связи!</h5>
          <form onSubmit={handleOnSubmit}>
            <input type="name" placeholder="Ваше имя" />
            <input type="phone" placeholder="+7 (___) ___-__-__" />
            <div className={styles.textarea_field}>
              <textarea
                placeholder="Комментарий к заказу"
                maxLength={100}
                onChange={(event) => setSymbolsCount(event.target.value.length)}
              />
              <div className={styles.count}>{`${symbolsCount}/100`}</div>
            </div>
            <button type="submit">Оставить заявку</button>
            <div className={styles.agreement}>
              Продолжая, вы соглашаетесь{" "}
              <span>со сбором и обработкой персональных данных и пользовательским соглашением</span>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.image}>
        <img src={SnowImage} alt="" />
      </div>
      <div className={`${styles.message} ${isMessageVisible ? styles.active : ""}`}>
        <div className={styles.message_container}>
          <div className={styles.close} onClick={() => setIsMessageVisible(false)}>
            <CloseIcon />
          </div>
          <div className={styles.title}>Заявка успешно отправлена!</div>
          <div className={styles.description}>Наши менеджеры свяжутся с вами в ближайшее время</div>
        </div>
      </div>
      <MessageModal
        isShow={isMessageShow}
        setIsShow={setIsMessageShow}
        title="Заявка успешно отправлена!"
        message="Наш специалист свяжется с вами и уточнит детали заказа"
      />
      <OrderModal isShow={isOrderShow} setIsShow={setIsOrderShow} onSubmit={() => setIsMessageShow(true)} />
    </div>
  );
};

export default ContactUs;
