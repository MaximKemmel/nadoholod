import { useEffect, useState } from "react";
import InputMask from "react-input-mask";

import { useTypedSelector } from "../../hooks/useTypedSeletor";
import { useActions } from "../../hooks/useActions";

import appStyles from "../../App.module.sass";
import styles from "./ContactUs.module.sass";

import MessageModal from "../Modal/MessageModal";

import { ServerStatusType } from "../../enums/serverStatusType";
import { initServerStatus } from "../../types/main/serverStatus";

import SnowImage from "../../assets/images/snow.png";
import { Close as CloseIcon } from "../../assets/svg/Close";

const ContactUs = () => {
  const { setIsNoScroll, sendMail, setSendMailStatus } = useActions();
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const mailStatus = useTypedSelector((state) => state.mailReducer.sendMailStatus);
  const [checkFields, setCheckFields] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [isMessageShow, setIsMessageShow] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageText, setMessageText] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    setIsNoScroll(isMessageShow);
  }, [isMessageShow]);

  useEffect(() => {
    if (name.trim() !== "") {
      if (mailStatus.status === ServerStatusType.Success) {
        setName("");
        setPhone("");
        setComment("");
        setCheckFields(false);
        setSendMailStatus(initServerStatus());
        if (windowSize.innerWidth > 1024) {
          setIsMessageVisible(true);
        } else {
          setMessageTitle("Заявка успешно отправлена!");
          setMessageText("Наш специалист свяжется с вами и уточнит детали заказа");
          setIsMessageShow(true);
        }
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
      sendMail({ name: name, phone: phone, message: comment, description: "Заявка с сайта" });
    } else {
      setMessageTitle("Внимание!");
      setMessageText("Заполните все поля");
      setIsMessageShow(true);
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
      <MessageModal isShow={isMessageShow} setIsShow={setIsMessageShow} title={messageTitle} message={messageText} />
    </div>
  );
};

export default ContactUs;
