import { useState } from "react";

import styles from "./ContactUs.module.sass";

import SnowImage from "../../assets/images/snow.png";

const ContactUs = () => {
  const [symbolsCount, setSymbolsCount] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.head}>
          Узнать стоимость монтажа
          <br />и обслуживания для объекта
        </div>
        <div className={styles.description}>
          Мы не просто продаём, а подбираем для вас наилучшее решение в рамках бюджета
        </div>
      </div>
      <div className={styles.form}>
        <div className={styles.head}>Мы на связи!</div>
        <form>
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
            Продолжая, вы соглашаетесь <span>со сбором и обработкой персональных данных и пользовательским соглашением</span>
          </div>
        </form>
      </div>
      <img src={SnowImage} alt="" />
    </div>
  );
};

export default ContactUs;
