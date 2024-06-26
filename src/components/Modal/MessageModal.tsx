import styles from "./Modal.module.sass";

import { Close as CloseIcon } from "../../assets/svg/Close";

interface IMessageModalProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  message: string;
}

const MessageModal: React.FC<IMessageModalProps> = ({ isShow, setIsShow, title, message }) => {
  return (
    <div className={`${styles.modal} ${isShow ? styles.active : ""}`}>
      <div className={`${styles.overlay} ${isShow ? styles.active : ""}`} onClick={() => setIsShow(false)} />
      <div className={`${styles.modal_content} ${styles.message}`}>
        <div className={styles.modal_close} onClick={() => setIsShow(false)}>
          <CloseIcon />
        </div>
        <div className={styles.content}>
          {title.length !== 0 ? <div className={styles.title}>{title}</div> : null}
          <div className={styles.message}>{message}</div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
