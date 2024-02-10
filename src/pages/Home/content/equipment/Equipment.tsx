import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import pageStyles from "../../Home.module.sass";
import styles from "./Equipment.module.sass";
import "../../../../slider.css";

import { equipmentsList } from "../../../../data/equipmentsList";

import { IEquipment } from "../../../../types/equipment/equipment";

import { ButtonArrow as ArrowIcon } from "../../../../assets/svg/ButtonArrow";

const Equipment = () => {
  const navigate = useNavigate();
  const slider = useRef(null as Slider);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    centerPadding: "30px",
    slidesToShow: 1,
    speed: 500,
  };

  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.container_content}>
        <div className={styles.content}>
          <div className={styles.equipments}>
            <h4>Холодильное оборудование для производства продукции</h4>
            <div className={styles.equipments_list}>
              {equipmentsList
                .filter((equipment: IEquipment) => equipment.type === 0)
                .map((equipment: IEquipment) => (
                  <div className={styles.equipment}>
                    <img src={`/uploads/equipments/${equipment.prefix}.png`} alt="" />
                    <div className={styles.about}>
                      <div className={styles.head}>{equipment.name}</div>
                      <div className={styles.button_block}>
                        <button type="button" onClick={() => navigate(`/equipment/${equipment.id}`)}>
                          Подробнее
                          <ArrowIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className={styles.slider}>
              <Slider ref={slider} {...settings}>
                {equipmentsList
                  .filter((equipment: IEquipment) => equipment.type === 0)
                  .map((equipment: IEquipment) => (
                    <div>
                      <div className={styles.equipment}>
                        <img src={`/uploads/equipments/${equipment.prefix}.png`} alt="" />
                        <div className={styles.about}>
                          <div className={styles.head}>{equipment.name}</div>
                          <div className={styles.button_block}>
                            <button type="button" onClick={() => navigate(`/equipment/${equipment.id}`)}>
                              Подробнее
                              <ArrowIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
          <div className={styles.equipments}>
            <h4>Холодильное оборудование для хранения продукции</h4>
            <div className={styles.equipments_list}>
              {equipmentsList
                .filter((equipment: IEquipment) => equipment.type === 1)
                .map((equipment: IEquipment) => (
                  <div className={styles.equipment} onClick={() => navigate(`/equipment/${equipment.id}`)}>
                    <img src={`/uploads/equipments/${equipment.prefix}.png`} alt="" />
                    <div className={styles.about}>
                      <div className={styles.head}>{equipment.name}</div>
                      <div className={styles.button_block}>
                        <button type="button" onClick={() => navigate(`/equipment/${equipment.id}`)}>
                          Подробнее
                          <ArrowIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className={styles.slider}>
              <Slider ref={slider} {...settings}>
                {equipmentsList
                  .filter((equipment: IEquipment) => equipment.type === 1)
                  .map((equipment: IEquipment) => (
                    <div>
                      <div className={styles.equipment}>
                        <img src={`/uploads/equipments/${equipment.prefix}.png`} alt="" />
                        <div className={styles.about}>
                          <div className={styles.head}>{equipment.name}</div>
                          <div className={styles.button_block}>
                            <button type="button" onClick={() => navigate(`/equipment/${equipment.id}`)}>
                              Подробнее
                              <ArrowIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equipment;
