import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

import styles from "./Equipment.module.sass";

import { equipmentsList } from "../../data/equipmentsList";

import { IEquipment } from "../../types/equipment/equipment";
import { IEquipmentFeature } from "../../types/equipment/equipmentFeature";

import { Arrow as ArrowIcon } from "../../assets/svg/Arrow";
import { ButtonArrow as ButtonArrowIcon } from "../../assets/svg/ButtonArrow";
import CarIcon from "../../assets/images/car.png";
import ShieldIcon from "../../assets/images/shield.png";
import VentilationIcon from "../../assets/images/ventilation.png";
import TimeIcon from "../../assets/images/time.png";
import ProcentsIcon from "../../assets/images/procents.png";
import ServiceIcon from "../../assets/images/service.png";
import { IEquipmentPrice } from "src/types/equipment/equipmentPrice";

const Equipments = () => {
  const { id } = useParams();
  const [equipment, setEquipment] = useState({ id: -1 } as IEquipment);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      const tmpEquipment = equipmentsList.find((item: IEquipment) => item.id === Number(id))!;
      setEquipment(tmpEquipment);
      document.title = tmpEquipment.name;
    }
  }, [id]);

  return (
    <div className={styles.wrapper}>
      {equipment.id > -1 ? (
        <div className={styles.container}>
          <div className={styles.breadcumbs}>
            <div className={styles.breadcumb}>Главная</div>
            <ArrowIcon />
            <div className={styles.breadcumb}>Оборудование</div>
            <ArrowIcon />
            <div className={styles.element}>{equipment.name}</div>
          </div>
          <div className={styles.about}>
            <div className={styles.content}>
              <h2>{equipment.full_name}</h2>
              <div className={styles.description}>{parse(equipment.description)}</div>
              <button type="button">
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
        </div>
      ) : null}
    </div>
  );
};

export default Equipments;
