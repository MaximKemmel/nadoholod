import pageStyles from "../../Home.module.sass";
import styles from "./WorkStages.module.sass";

import WorkStagesImage from "../../../../assets/images/work_stages.png";

const WorkStages = () => {
  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.container_content}>
        <h3>Этапы работы</h3>
        <div className={pageStyles.about}>
          Для нас важен каждый клиент,вне зависимости от его масштабов и специализации, поэтому мы всегда предлагаем лучшие
          решения, рассчитанные на эффективную работу и долгосрочную перспективу роста.
        </div>
        <img className={styles.img} src={WorkStagesImage} alt="" />
      </div>
    </div>
  );
};

export default WorkStages;
