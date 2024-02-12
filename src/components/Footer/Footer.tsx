import { useNavigate } from "react-router-dom";

import styles from "./Footer.module.sass";

import Logo from "../../assets/images/logo_white.png";
import { Telegram as TelegramIcon } from "../../assets/svg/Telegram";
import { WhatsApp as WhatsAppIcon } from "../../assets/svg/WhatsApp";
import { Arrow as ArrowIcon } from "../../assets/svg/Arrow";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer>
      <div className={styles.container}>
        <div className={styles.company}>
          <div className={styles.logo}>
            <img src={Logo} alt="" />
          </div>
          <div className={styles.description}>
            <div className={styles.name}>Холод PRO</div>
            <div className={styles.about}>Компания по производству, монтажу и обслуживанию холодильного оборудования</div>
          </div>
        </div>
        <div className={styles.actions}>
          <div className={styles.navigation}>
            <div className={styles.column}>
              <div className={styles.head}>О компании</div>
              <div className={styles.links}>
                <div className={styles.link}>
                  <ArrowIcon />
                  Компания
                </div>
                <div className={styles.link}>
                  <ArrowIcon />
                  Этапы работы
                </div>
                <div className={styles.link}>
                  <ArrowIcon />
                  Области работы
                </div>
                <div className={styles.link}>
                  <ArrowIcon />
                  Клиенты
                </div>
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.head}>Каталог</div>
              <div className={styles.links}>
                <div className={styles.link} onClick={() => navigate(`/catalog/0`)}>
                  <ArrowIcon />
                  Камеры хранения готовой продукции
                </div>
                <div className={styles.link} onClick={() => navigate(`/catalog/0`)}>
                  <ArrowIcon />
                  Генераторы ледяной воды
                </div>
                <div className={styles.link} onClick={() => navigate(`/catalog/0`)}>
                  <ArrowIcon />
                  Чиллеры
                </div>
                <div className={styles.link} onClick={() => navigate(`/catalog/0`)}>
                  <ArrowIcon />
                  Центральное холодоснабжение
                </div>
                <div className={styles.link} onClick={() => navigate(`/catalog/0`)}>
                  <ArrowIcon />
                  Камеры сушки/вялки
                </div>
              </div>
            </div>
            <div className={`${styles.column} ${styles.desktop}`}>
              <div className={styles.head}>Услуги</div>
              <div className={styles.links}>
                <div className={styles.link}>
                  <ArrowIcon />
                  Производство
                </div>
                <div className={styles.link}>
                  <ArrowIcon />
                  Обслуживание
                </div>
                <div className={styles.link}>
                  <ArrowIcon />
                  Доставка
                </div>
                <div className={styles.link}>
                  <ArrowIcon />
                  Контакты
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.contacts}>
              <div className={styles.head}>Контакты</div>
              <div className={styles.contacts_list}>
                <div className={styles.phone}>+7 900 163-89-72</div>
                <div className={styles.phone}>+7 913 234-97-54</div>
                <div className={styles.address}>holodpro22@gmail.com</div>
                <div className={styles.address}>г.Барнаул, ул.Германа Титова 35а</div>
                <div className={styles.socials_list}>
                  <div className={styles.link}>
                    <TelegramIcon />
                  </div>
                  <div className={styles.link}>
                    <WhatsAppIcon />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.column} ${styles.mobile}`}>
              <div className={styles.head}>Услуги</div>
              <div className={styles.links}>
                <div className={styles.link}>
                  <ArrowIcon />
                  Производство
                </div>
                <div className={styles.link}>
                  <ArrowIcon />
                  Обслуживание
                </div>
                <div className={styles.link}>
                  <ArrowIcon />
                  Доставка
                </div>
                <div className={styles.link}>
                  <ArrowIcon />
                  Контакты
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
