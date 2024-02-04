import pageStyles from "../../Home.module.sass";
import styles from "./Clients.module.sass";

import AsmAcroLogo from "../../../../assets/images/asm_acro.png";
import AltayskoeLogo from "../../../../assets/images/altayskoe.png";
import AnikomLogo from "../../../../assets/images/anikom.png";
import AkbarsLogo from "../../../../assets/images/akbars.png";
import RussianCheezeLogo from "../../../../assets/images/russian_cheeze.png";
import SpzpkLogo from "../../../../assets/images/spzpk.png";
import SybirianProductLogo from "../../../../assets/images/sybirian_product.png";
import AltanLogo from "../../../../assets/images/altan.png";
import SherlockLogo from "../../../../assets/images/sherlock.png";

const Clients = () => {
  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.container_content}>
        <h3>Клиенты</h3>
        <div className={styles.clients}>
          <div className={styles.client}>
            <img src={AsmAcroLogo} alt="" height={58} />
          </div>
          <div className={styles.client}>
            <img src={AltayskoeLogo} alt="" height={75} />
          </div>
          <div className={styles.client}>
            <img src={AnikomLogo} alt="" height={31} />
          </div>
          <div className={styles.client}>
            <img src={AkbarsLogo} alt="" height={56} />
          </div>
          <div className={styles.client}>
            <img src={RussianCheezeLogo} alt="" height={50} />
          </div>
          <div className={styles.client}>
            <img src={SpzpkLogo} alt="" height={68} />
          </div>
          <div className={styles.client}>
            <img src={SybirianProductLogo} alt="" height={34} />
          </div>
          <div className={styles.client}>
            <img src={AltanLogo} alt="" height={49} />
          </div>
          <div className={styles.client}>
            <img src={SherlockLogo} alt="" height={68} />
          </div>
          <div className={styles.client} />
        </div>
      </div>
    </div>
  );
};

export default Clients;
