import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSeletor";

import appStyles from "../../App.module.sass";
import styles from "./Equipment.module.sass";

import MessageModal from "../../components/Modal/MessageModal";

import { equipmentsList } from "../../data/equipmentsList";

import { ServerStatusType } from "../../enums/serverStatusType";
import { initServerStatus } from "../../types/main/serverStatus";
import { IEquipment } from "../../types/equipment/equipment";
import { IEquipmentFeature } from "../../types/equipment/equipmentFeature";
import { IEquipmentPrice } from "../..//types/equipment/equipmentPrice";

import { Arrow as ArrowIcon } from "../../assets/svg/Arrow";
import { ButtonArrow as ButtonArrowIcon } from "../../assets/svg/ButtonArrow";
import { DoubleArrow as DoubleArrowIcon } from "../../assets/svg/DoubleArrow";
import { Close as CloseIcon } from "../../assets/svg/Close";
import CarIcon from "../../assets/images/car.png";
import ShieldIcon from "../../assets/images/shield.png";
import VentilationIcon from "../../assets/images/ventilation.png";
import TimeIcon from "../../assets/images/time.png";
import ProcentsIcon from "../../assets/images/procents.png";
import ServiceIcon from "../../assets/images/service.png";
import OrderImage from "../../assets/images/order_image.png";
import SnowImage from "../../assets/images/snow.png";

const Equipments = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setIsNoScroll, sendMail, setSendMailStatus } = useActions();
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const mailStatus = useTypedSelector((state) => state.mailReducer.sendMailStatus);
  const [isOrderShow, setIsOrderShow] = useState(false);
  const [checkFields, setCheckFields] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [isMessageShow, setIsMessageShow] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageText, setMessageText] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [equipment, setEquipment] = useState({ id: -1 } as IEquipment);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setIsNoScroll(isOrderShow);
  }, [isOrderShow]);

  useEffect(() => {
    if (id !== undefined) {
      const tmpEquipment = equipmentsList.find((item: IEquipment) => item.id === Number(id))!;
      setEquipment(tmpEquipment);
      document.title = tmpEquipment.name;
    }
  }, [id]);

  useEffect(() => {
    if (name.trim() !== "") {
      if (mailStatus.status === ServerStatusType.Success) {
        setName("");
        setPhone("");
        setCheckFields(false);
        setSendMailStatus(initServerStatus());
        setIsMessageVisible(true);
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
    <div className={styles.wrapper}>
      {equipment.id > -1 ? (
        <div className={styles.container}>
          <div className={styles.breadcumbs}>
            <div className={styles.link} onClick={() => navigate("/")}>
              Главная
            </div>
            <ArrowIcon />
            <div
              className={styles.link}
              onClick={() => navigate("/", { state: { currentContainer: "equipment_container" } })}
            >
              Оборудование
            </div>
            <ArrowIcon />
            <div className={styles.element}>{equipment.name}</div>
          </div>
          <div className={styles.about}>
            <div className={styles.content}>
              <h2>{equipment.full_name}</h2>
              <div className={styles.image_mobile}>
                <img src={`/uploads/equipments/${equipment.prefix}_main.png`} alt="" />
              </div>
              <div className={styles.description}>{parse(equipment.description)}</div>
              <button type="button" onClick={() => navigate("/catalog/0")}>
                Каталог
                <ButtonArrowIcon />
              </button>
            </div>
            <div className={styles.image}>
              <img src={`/uploads/equipments/${equipment.prefix}_main.png`} alt="" />
            </div>
          </div>
          <div className={styles.features}>
            <h3>{equipment.feature_title}</h3>
            <div className={styles.content}>
              <div className={styles.features_list}>
                {equipment.features.map((feature: IEquipmentFeature) => (
                  <div className={styles.feature}>
                    <div className={styles.num}>{`0${feature.id}`}</div>
                    <div className={styles.description}>{feature.description}</div>
                  </div>
                ))}
              </div>
              <div className={styles.image}>
                <img src={`/uploads/equipments/${equipment.prefix}_features.png`} alt="" />
              </div>
            </div>
          </div>
          <div className={styles.introductions}>
            <h4>Мы предлагаем</h4>
            <div className={styles.introductions_list}>
              <div className={styles.introduction}>
                <div className={styles.icon}>
                  <img src={CarIcon} alt="" />
                </div>
                <div className={styles.description}>Выезд замерщика на объект</div>
              </div>
              <div className={styles.introduction}>
                <div className={styles.icon}>
                  <img src={TimeIcon} alt="" />
                </div>
                <div className={styles.description}>Изготовление в кратчайшие сроки</div>
              </div>
              <div className={styles.introduction}>
                <div className={styles.icon}>
                  <img src={ShieldIcon} alt="" />
                </div>
                <div className={styles.description}>Согласование и проектирование работ под ваши нужды</div>
              </div>
              <div className={styles.introduction}>
                <div className={styles.icon}>
                  <img src={ProcentsIcon} alt="" />
                </div>
                <div className={styles.description}>Гибкие условия сотрудничества</div>
              </div>
              <div className={styles.introduction}>
                <div className={styles.icon}>
                  <img src={VentilationIcon} alt="" />
                </div>
                <div className={styles.description}>Доставка и монтажные работы</div>
              </div>
              <div className={styles.introduction}>
                <div className={styles.icon}>
                  <img src={ServiceIcon} alt="" />
                </div>
                <div className={styles.description}>Сервисное обслуживание и постгарантийный ремонт</div>
              </div>
            </div>
          </div>
          <div className={styles.prices}>
            <h5>Как производится расчет?</h5>
            <div className={styles.image_mobile}>
              <img src={`/uploads/equipments/${equipment.prefix}_schema.png`} alt="" />
            </div>
            <div className={styles.parameters}>{parse(equipment.parameters)}</div>
            <div className={styles.content}>
              <div className={styles.prices_content}>
                <div className={styles.prices_list}>
                  {equipment.prices.map((price: IEquipmentPrice) => (
                    <div className={styles.price}>
                      <div className={styles.position}>{price.position}:</div>
                      <div className={styles.value}>{price.min_price > 0 ? `от ${price.min_price}₽` : "0₽"}</div>
                    </div>
                  ))}
                </div>
                <div className={styles.sum}>
                  <div className={styles.position}>Итого</div>
                  <div className={styles.value}>{`от ${equipment.prices
                    .reduce((sum, element) => (sum += element.min_price), 0)
                    .toLocaleString()}₽`}</div>
                </div>
                <div className={styles.description}>
                  <p>На сайте указана средняя цена проекта, так-же у нас имеется уже готовое холодильное оборудование.</p>
                  <p>
                    Стоимость холодильной камеры зависит от многих факторов и просчитывается индивидуально в зависимости от
                    размеров, температуры, местонахождения объекта.
                  </p>
                  <p>Поэтому для уточнения заполните форму ниже, чтобы мы вам перезвонили и сориентировали по цене.</p>
                </div>
              </div>
              <div className={styles.image}>
                <img src={`/uploads/equipments/${equipment.prefix}_schema.png`} alt="" />
              </div>
            </div>
          </div>
          <div className={styles.application_container} id="order_button">
            <div
              className={`${styles.application_button} ${isOrderShow ? styles.hidden : ""}`}
              onClick={() => {
                var orderButton = document.getElementById("order_button");
                var container = document.getElementById("about_container");
                window.scrollTo({
                  top: container?.offsetTop! + orderButton?.offsetTop! - (windowSize.innerHeight - 615) / 2,
                  behavior: "smooth",
                });
                setIsOrderShow(true);
              }}
            >
              <DoubleArrowIcon />
              <div className={styles.button_text}>Подобрать камеру</div>
            </div>
            <div className={`${styles.order} ${isOrderShow ? styles.active : ""}`}>
              <div className={styles.order_container}>
                <div className={styles.content}>
                  <div className={styles.title}>Поможем подобрать холодильное оборудование!</div>
                  <div className={styles.description}>Наш специалист свяжется с вами и уточнит детали заказа</div>
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
                    <button type="submit" disabled={mailStatus.status !== ServerStatusType.None}>
                      Оставить заявку
                    </button>
                    <div className={styles.agreement}>
                      Продолжая, вы соглашаетесь{" "}
                      <span>со сбором и обработкой персональных данных и пользовательским соглашением</span>
                    </div>
                  </form>
                </div>
                <div className={styles.image}>
                  <img src={OrderImage} alt="" />
                </div>
                <div className={styles.close} onClick={() => setIsOrderShow(false)}>
                  <CloseIcon />
                </div>
              </div>
            </div>
            <div className={`${styles.message} ${isMessageVisible ? styles.active : ""}`}>
              <div className={styles.message_container}>
                <div
                  className={styles.close}
                  onClick={() => {
                    setIsOrderShow(false);
                    setIsMessageVisible(false);
                  }}
                >
                  <CloseIcon />
                </div>
                <div className={styles.content}>
                  <div className={styles.title}>Заявка успешно отправлена!</div>
                  <div className={styles.description}>Наши менеджеры свяжутся с вами в ближайшее время</div>
                </div>
                <div className={styles.image}>
                  <img src={SnowImage} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className={`${styles.overlay} ${isOrderShow ? styles.active : ""}`} />
      <MessageModal isShow={isMessageShow} setIsShow={setIsMessageShow} title={messageTitle} message={messageText} />
    </div>
  );
};

export default Equipments;
