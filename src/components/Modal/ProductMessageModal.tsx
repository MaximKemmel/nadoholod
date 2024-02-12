import styles from "./Modal.module.sass";

import { Close as CloseIcon } from "../../assets/svg/Close";

interface IProductMessageModalProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  message: string;
}

const ProductMessageModal: React.FC<IProductMessageModalProps> = ({ isShow, setIsShow, title, message }) => {
  return (
    <div className={`${styles.modal} ${isShow ? styles.active : ""}`}>
      <div className={`${styles.overlay} ${isShow ? styles.active : ""}`} onClick={() => setIsShow(false)} />
      <div className={`${styles.modal_content} ${styles.product_message}`}>
        <div className={styles.modal_close} onClick={() => setIsShow(false)}>
          <CloseIcon />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.message}>{message}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductMessageModal;
