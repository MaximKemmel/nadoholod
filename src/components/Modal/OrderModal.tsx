import { useEffect, useState } from "react";
import InputMask from "react-input-mask";

import { useTypedSelector } from "../../hooks/useTypedSeletor";
import { useActions } from "../../hooks/useActions";

import appStyles from "../../App.module.sass";
import styles from "./Modal.module.sass";

import MessageModal from "../Modal/MessageModal";

import { ServerStatusType } from "../../enums/serverStatusType";
import { initServerStatus } from "../../types/main/serverStatus";

import { Close as CloseIcon } from "../../assets/svg/Close";

interface IOrderModalProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderModal: React.FC<IOrderModalProps> = ({ isShow, setIsShow }) => {
  const { setIsNoScroll, sendMail, setSendMailStatus } = useActions();
  const mailStatus = useTypedSelector((state) => state.mailReducer.sendMailStatus);
  const [checkFields, setCheckFields] = useState(false);
  const [isMessageShow, setIsMessageShow] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageText, setMessageText] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (name.trim() !== "") {
      if (mailStatus.status === ServerStatusType.Success) {
        setName("");
        setPhone("");
        setCheckFields(false);
        setSendMailStatus(initServerStatus());
        setMessageTitle("Заявка успешно отправлена!");
        setMessageText("Наш специалист свяжется с вами и уточнит детали заказа");
        setIsShow(false);
        setIsMessageShow(true);
      }
      if (mailStatus.status === ServerStatusType.Error) {
        setMessageTitle("Ошибка!");
        setMessageText("При отправке письма возникла ошибка. Попробуйте еще раз");
        setIsMessageShow(true);
      }
    }
  }, [mailStatus]);

  useEffect(() => {
    setIsNoScroll(isShow || isMessageShow);
  }, [isShow, isMessageShow]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (!checkFields) {
      setCheckFields(true);
    }
    if (name.trim() !== "" && phone.length === 18) {
      sendMail({ name: name, phone: phone, message: "", description: "Заявка с сайта" });
    } else {
      setMessageTitle("Внимание!");
      setMessageText("Заполните все поля");
      setIsMessageShow(true);
    }
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
            <button type="submit">Отправить заявку</button>
            <div className={styles.agreement}>
              Продолжая, вы соглашаетесь{" "}
              <span>со сбором и обработкой персональных данных и пользовательским соглашением</span>
            </div>
          </form>
        </div>
      </div>
      <MessageModal isShow={isMessageShow} setIsShow={setIsMessageShow} title={messageTitle} message={messageText} />
    </div>
  );
};

export default OrderModal;
