import styles from "./Modal.module.sass";

import { Close as CloseIcon } from "../../assets/svg/Close";

interface IOrderModalProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: Function;
}

const OrderModal: React.FC<IOrderModalProps> = ({ isShow, setIsShow, onSubmit }) => {
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setIsShow(false);
    onSubmit();
  };

  return (
    <div className={`${styles.modal} ${isShow ? styles.active : ""}`}>
      <div className={`${styles.overlay} ${isShow ? styles.active : ""}`} onClick={() => setIsShow(false)} />
      <div className={`${styles.modal_content} ${styles.order}`}>
        <div className={styles.modal_close} onClick={() => setIsShow(false)}>
          <CloseIcon />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>Мы на связи!</div>
          <div className={styles.message}>Наш специалист свяжется с вами и подберёт выгодное предложение</div>
          <form onSubmit={handleOnSubmit}>
            <input type="name" placeholder="Ваше имя" />
            <input type="phone" placeholder="+7 (___) ___-__-__" />
            <button type="submit">Отправить заявку</button>
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

export default OrderModal;
