import { useNavigate } from "react-router-dom";

import { useTypedSelector } from "../../hooks/useTypedSeletor";

import styles from "./Footer.module.sass";

import { ICategory } from "../../types/category/category";

import Logo from "../../assets/images/logo_white.png";
import { Telegram as TelegramIcon } from "../../assets/svg/Telegram";
import { WhatsApp as WhatsAppIcon } from "../../assets/svg/WhatsApp";
import { Arrow as ArrowIcon } from "../../assets/svg/Arrow";

const Footer = () => {
  const navigate = useNavigate();
  const isHomePage = useTypedSelector((state) => state.mainReducer.isHomePage);
  const categories = useTypedSelector((state) => state.categoryReducer.categories);

  const handleLinkOnClick = (link: string) => {
    if (isHomePage) {
      var element = document.getElementById(link);
      if (element !== null) {
        element!.scrollIntoView({
          behavior: "smooth",
        });
      }
    } else {
      navigate("/", { state: { currentContainer: link } });
    }
  };

  return (
    <footer>
      <div className={styles.container}>
        <div className={styles.company}>
          <div className={styles.logo}>
            <img src={Logo} alt="" />
          </div>
          <div className={styles.description}>
            <div className={styles.name}>Холод PRO</div>
            <div className={styles.about}>Компания по производству, поставке и обслуживанию холодильного оборудования</div>
          </div>
        </div>
        <div className={styles.actions}>
          <div className={styles.navigation}>
            <div className={styles.column}>
              <div className={styles.head}>О компании</div>
              <div className={styles.links}>
                <div className={styles.link} onClick={() => handleLinkOnClick("about_container")}>
                  <ArrowIcon />
                  Компания
                </div>
                <div className={styles.link} onClick={() => handleLinkOnClick("stages_container")}>
                  <ArrowIcon />
                  Этапы работы
                </div>
                <div className={styles.link} onClick={() => handleLinkOnClick("catalog_container")}>
                  <ArrowIcon />
                  Области работы
                </div>
                <div className={styles.link} onClick={() => handleLinkOnClick("clients_container")}>
                  <ArrowIcon />
                  Клиенты
                </div>
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.head}>Каталог</div>
              {Array.isArray(categories) && categories !== undefined && categories.length > 0 ? (
                <div className={styles.links}>
                  {categories
                    .filter((category: ICategory) => category.show_in_nav)
                    .map((category: ICategory) => (
                      <div className={styles.link} onClick={() => navigate(`/catalog/${category.id}`)}>
                        <ArrowIcon />
                        {category.category}
                      </div>
                    ))}
                </div>
              ) : null}
            </div>
            <div className={`${styles.column} ${styles.desktop}`}>
              <div className={styles.head}>Услуги</div>
              <div className={styles.links}>
                <div className={styles.link} onClick={() => handleLinkOnClick("production_container")}>
                  <ArrowIcon />
                  Производство
                </div>
                <div className={styles.link} onClick={() => handleLinkOnClick("service_container")}>
                  <ArrowIcon />
                  Обслуживание
                </div>
                <div className={styles.link} onClick={() => handleLinkOnClick("delivery_container")}>
                  <ArrowIcon />
                  Доставка
                </div>
                <div className={styles.link} onClick={() => handleLinkOnClick("contacts_container")}>
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
                <a className={styles.phone} href="tel:79001638972">
                  +7 900 163-89-72
                </a>
                <a className={styles.phone} href="tel:79132349754">
                  +7 913 234-97-54
                </a>
                <a className={styles.address} href="mailto:holodpro22@gmail.com">
                  holodpro22@gmail.com
                </a>
                <div className={styles.address}>г.Барнаул, ул.Германа Титова 35а</div>
                <div className={styles.socials_list}>
                  <a
                    href={`https://t.me/+79001638972`}
                    target="_blank"
                    title={"Написать в Telegram"}
                    className={styles.link}
                  >
                    <TelegramIcon />
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send/?phone=79001638972`}
                    target="_blank"
                    title={"Написать в WhatsApp"}
                    className={styles.link}
                  >
                    <WhatsAppIcon />
                  </a>
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
