import { useState } from "react";

import styles from "./Modal.module.sass";

import { Close as CloseIcon } from "../../assets/svg/Close";

interface IProductOrderModalProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: Function;
}

const ProductOrderModal: React.FC<IProductOrderModalProps> = ({ isShow, setIsShow, onSubmit }) => {
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setIsShow(false);
    onSubmit();
  };
  const [symbolsCount, setSymbolsCount] = useState(0);

  return (
    <div className={`${styles.modal} ${isShow ? styles.active : ""}`}>
      <div className={`${styles.overlay} ${isShow ? styles.active : ""}`} onClick={() => setIsShow(false)} />
      <div className={`${styles.modal_content} ${styles.product_order}`}>
        <div className={styles.modal_close} onClick={() => setIsShow(false)}>
          <CloseIcon />
        </div>
        <div className={styles.head}>
          <div className={styles.title}>Заказать расчёт стоимости оборудования</div>
          <div className={styles.message}>Мы не просто продаём, а подбираем для вас наилучшее решение в рамках бюджета</div>
        </div>
        <div className={styles.content}>
          <div className={styles.title}>Давайте созвонимся!</div>
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
    </div>
  );
};

export default ProductOrderModal;
