import { useEffect, useState } from "react";
import InputMask from "react-input-mask";

import { useTypedSelector } from "../../hooks/useTypedSeletor";
import { useActions } from "../../hooks/useActions";

import appStyles from "../../App.module.sass";
import styles from "./Modal.module.sass";

import MessageModal from "../Modal/MessageModal";
import ProductMessageModal from "../Modal/ProductMessageModal";

import { ServerStatusType } from "../../enums/serverStatusType";
import { initServerStatus } from "../../types/main/serverStatus";

import { Close as CloseIcon } from "../../assets/svg/Close";

interface IProductOrderModalProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  productName: string;
}

const ProductOrderModal: React.FC<IProductOrderModalProps> = ({ isShow, setIsShow, productName }) => {
  const { sendMail, setSendMailStatus } = useActions();
  const mailStatus = useTypedSelector((state) => state.mailReducer.sendMailStatus);
  const [checkFields, setCheckFields] = useState(false);
  const [isProductMessageShow, setIsProductMessageShow] = useState(false);
  const [isMessageShow, setIsMessageShow] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageText, setMessageText] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (name.trim() !== "") {
      if (mailStatus.status === ServerStatusType.Success) {
        setName("");
        setPhone("");
        setComment("");
        setCheckFields(false);
        setSendMailStatus(initServerStatus());
        setIsShow(false);
        setIsProductMessageShow(true);
      }
      if (mailStatus.status === ServerStatusType.Error) {
        setMessageTitle("Ошибка!");
        setMessageText("При отправке письма возникла ошибка. Попробуйте еще раз");
        setIsMessageShow(true);
      }
    }
  }, [mailStatus]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (!checkFields) {
      setCheckFields(true);
    }
    if (name.trim() !== "" && phone.length === 18) {
      sendMail({ name: name, phone: phone, message: comment, description: `Заявка с сайта (${productName})` });
    } else {
      setMessageTitle("Внимание!");
      setMessageText("Заполните все поля");
      setIsMessageShow(true);
    }
  };

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
            <input
              type="name"
              placeholder="Ваше имя"
              className={checkFields && name.trim() === "" ? appStyles.wrong : ""}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <InputMask
              className={checkFields && phone.length < 18 ? appStyles.wrong : ""}
              placeholder="+7 (___) ___-__-__"
              type="text"
              mask="+7 (999) 999-99-99"
              maskPlaceholder="0"
              maskChar={""}
              onChange={(event) => setPhone(event.target.value.trim())}
              value={phone}
              required
            />
            <div className={styles.textarea_field}>
              <textarea
                placeholder="Комментарий к заказу"
                maxLength={100}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
              <div className={styles.count}>{`${comment.length}/100`}</div>
            </div>
            <button type="submit" disabled={mailStatus.status !== ServerStatusType.None}>
              Оставить заявку
            </button>
            <div className={styles.agreement}>
              Продолжая, вы соглашаетесь{" "}
              <span>со сбором и обработкой персональных данных и пользовательским соглашением</span>
            </div>
          </form>
        </div>
      </div>
      <MessageModal isShow={isMessageShow} setIsShow={setIsMessageShow} title={messageTitle} message={messageText} />
      <ProductMessageModal
        isShow={isProductMessageShow}
        setIsShow={setIsProductMessageShow}
        title={"Спасибо за заявку!"}
        message={"Наш специалист свяжется с вами и уточнит детали заказа"}
      />
    </div>
  );
};

export default ProductOrderModal;
