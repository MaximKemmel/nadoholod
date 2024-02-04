import { useNavigate } from "react-router-dom";

import pageStyles from "../../Home.module.sass";
import styles from "./Equipment.module.sass";

import { equipmentsList } from "../../../../data/equipmentsList";

import { IEquipment } from "../../../../types/equipment/equipment";

import { ButtonArrow as ArrowIcon } from "../../../../assets/svg/ButtonArrow";

const Equipment = () => {
  const navigate = useNavigate();

  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.container_content}>
        <div className={styles.content}>
          <div className={styles.equipments}>
            <div className={styles.title}>Холодильное оборудование для производства продукции</div>
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
          </div>
          <div className={styles.equipments}>
            <div className={styles.title}>Холодильное оборудование для хранения продукции</div>
            <div className={styles.equipments_list}>
              {equipmentsList
                .filter((equipment: IEquipment) => equipment.type === 1)
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equipment;
