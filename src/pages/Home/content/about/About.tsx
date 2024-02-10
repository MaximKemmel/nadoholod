import pageStyles from "../../Home.module.sass";
import styles from "./About.module.sass";

import { DoubleArrow as ArrowIcon } from "../../../../assets/svg/DoubleArrow";
import CompanyCardsImage from "../../../../assets/images/company_cards.png";
import CompetitionImage from "../../../../assets/images/competition.png";

const About = () => {
  return (
    <div className={`${pageStyles.container} ${styles.relative}`}>
      <div className={pageStyles.container_content}>
        <div className={styles.content}>
          <div className={`${styles.head} ${styles.half}`}>
            <h3>О компании</h3>
            <div className={styles.about}>
              Инженерно-производственная компания с многолетним опытом производства холодильного оборудования. Наша компания
              производит и монтирует холодильное оборудование на всей территории России.
            </div>
          </div>
          <img className={styles.cards} src={CompanyCardsImage} alt="" />
          <div className={styles.evolution}>
            <div className={`${styles.title} ${styles.half}`}>Развитие компании</div>
            <div className={styles.stages}>
              <div className={`${styles.stage} ${styles.half}`}>
                <div className={styles.num}>04</div>
                <div className={styles.about}>Начало работы по производству и холодильных камер в Алтайском крае</div>
              </div>
              <div className={`${styles.stage} ${styles.tripple}`}>
                <div className={styles.num}>03</div>
                <div className={styles.about}>Начало работы по производству и холодильных камер в Алтайском крае</div>
              </div>
              <div className={`${styles.stage} ${styles.double}`}>
                <div className={styles.num}>02</div>
                <div className={styles.about}>Начало работы по производству и холодильных камер в Алтайском крае</div>
              </div>
              <div className={`${styles.stage} ${styles.first}`}>
                <div className={styles.num}>01</div>
                <div className={styles.about}>Начало работы по производству и холодильных камер в Алтайском крае</div>
              </div>
            </div>
          </div>
          <div className={styles.competition}>
            <div className={styles.description}>Первые по производству холодильных камер в Алтайском крае</div>
            <img src={CompetitionImage} alt="" />
          </div>
        </div>
      </div>
      <div className={styles.application_container}>
        <div className={styles.application_button}>
          <ArrowIcon />
          <div className={styles.button_text}>Подобрать оборудование</div>
        </div>
      </div>
    </div>
  );
};

export default About;
