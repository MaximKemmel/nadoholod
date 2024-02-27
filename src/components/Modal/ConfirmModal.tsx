import styles from "./Modal.module.sass";

import { Close as CloseIcon } from "../../assets/svg/Close";

interface IConfirmModalProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  message: string;
  handleConfirmOnClick: Function;
}

const ConfirmModal: React.FC<IConfirmModalProps> = ({ isShow, setIsShow, title, message, handleConfirmOnClick }) => {
  return (
    <div className={`${styles.modal} ${isShow ? styles.active : ""}`}>
      <div className={`${styles.overlay} ${isShow ? styles.active : ""}`} onClick={() => setIsShow(false)} />
      <div className={`${styles.modal_content} ${styles.message}`}>
        <div className={styles.modal_close} onClick={() => setIsShow(false)}>
          <CloseIcon />
        </div>
        <div className={`${styles.content} ${styles.confirm}`}>
          {title.length !== 0 ? <div className={styles.title}>{title}</div> : null}
          <div className={styles.message}>{message}</div>
          <div className={styles.buttons}>
            <button type="button" onClick={() => setIsShow(false)}>
              Отмена
            </button>
            <button type="button" onClick={() => handleConfirmOnClick()}>
              Подтвердить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
