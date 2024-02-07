import { useEffect, useState } from "react";

import styles from "./Product.module.sass";

import ProductCard from "../../components/ProductCard/ProductCard";

import { recommendedProductsList } from "../../data/recommendedProductsList";

import { IProduct } from "../../types/product/product";

import { Arrow as ArrowIcon } from "../../assets/svg/Arrow";
import PolairImage from "../../assets/images/manufacturer/polair.png";
import CarIcon from "../../assets/images/car.png";
import TimeIcon from "../../assets/images/time.png";
import ServiceIcon from "../../assets/images/service.png";

const Product = () => {
  const [mainPhoto, setMainPhoto] = useState("/uploads/products/product.png");
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.breadcumbs}>
          <div className={styles.breadcumb}>Главная</div>
          <ArrowIcon />
          <div className={styles.breadcumb}>Каталог</div>
          <ArrowIcon />
          <div className={styles.element}>Холодильная камера 2.9</div>
        </div>
        <div className={styles.content}>
          <h3>Среднетемпературные ХК</h3>
          <div className={styles.main_container}>
            <div className={styles.photos_container}>
              <div className={styles.photos_list}>
                <img
                  src="/uploads/products/product_one.png"
                  alt=""
                  onClick={() => setMainPhoto("/uploads/products/product_one.png")}
                />
                <img
                  src="/uploads/products/product_two.png"
                  alt=""
                  onClick={() => setMainPhoto("/uploads/products/product_two.png")}
                />
                <img
                  src="/uploads/products/product.png"
                  alt=""
                  onClick={() => setMainPhoto("/uploads/products/product.png")}
                />
              </div>
              <img className={styles.main_photo} src={mainPhoto} alt="" />
            </div>
            <div className={styles.info_container}>
              <h5>Холодильная камера 2.9</h5>
              <img src={PolairImage} alt="" width={74} />
              <div className={styles.description}>
                Камера предназначена для хранения продуктов, которым требуется умеренно низкая температура. Поддерживает
                температуру от 0-8 °С
              </div>
              <div className={styles.price_container}>
                <div className={styles.price}>{`${Number(106070).toLocaleString()}₽`}</div>
                <button type="button">Заказать товар</button>
                <div className={styles.warning}>*Актуальную цену можно уточнить у менеджера</div>
              </div>
              <div className={styles.advantages_list}>
                <div className={styles.advantage}>
                  <img src={CarIcon} alt="" />
                  Доставка по всей России
                </div>
                <div className={styles.advantage}>
                  <img src={TimeIcon} alt="" />
                  Изгоовление 2 недели
                </div>
                <div className={styles.advantage}>
                  <img src={ServiceIcon} alt="" />
                  Гарантия 5 лет
                </div>
              </div>
            </div>
          </div>
          <div className={styles.tabs_container}>
            <div className={styles.tabs_list}>
              <div className={`${styles.tab} ${activeTab === 0 ? styles.active : ""}`} onClick={() => setActiveTab(0)}>
                Описание
              </div>
              <div className={`${styles.tab} ${activeTab === 1 ? styles.active : ""}`} onClick={() => setActiveTab(1)}>
                Характеристики
              </div>
              <div className={`${styles.tab} ${activeTab === 2 ? styles.active : ""}`} onClick={() => setActiveTab(2)}>
                Доставка
              </div>
              <div className={`${styles.tab} ${activeTab === 3 ? styles.active : ""}`} onClick={() => setActiveTab(3)}>
                Инструкция
              </div>
            </div>
            {activeTab === 0 ? (
              <div className={styles.tab_view}>
                <p>
                  Холодильные камеры марки «СЕВЕР» обеспечивают хранение продуктов при средних и низких температурах.
                  Применяются в торгово-складских помещениях, продовольственных рынках, в столовых, барах, ресторанах,
                  аптеках, на пищевых производствах, используются для хранения цветов и т.д.
                </p>
                <p>
                  Сборка камер не требует специальных инструментов. Камеры без труда собираются из готовых панелей за счет
                  пластиковых боковых профилей типа «шип-паз».
                </p>
                <p>
                  Модульная конструкция позволяет в дальнейшем изменять объём и форму камеры путем добавления типовых
                  панелей, что обеспечивает широкий ряд типоразмеров камер.
                </p>
                <p>
                  В стандартной комплектации панели состоят из слоя заливной теплоизоляции (пенополиуретан HUNTSMAN),
                  покрытого с двух сторон оцинкованным стальным листом, толщиной 0,45-0,5, с полимерным покрытием RAL 9003 и
                  защитной пленкой, удаляемой после монтажа. По желанию заказчика цвет исполнения камеры может быть изменен.
                  Также покрытие может быть выполнено из пищевой нержавеющей стали.
                </p>
              </div>
            ) : null}
            {activeTab === 2 ? (
              <div className={styles.tab_view}>
                <p>
                  Для наших клиентов мы транспортируем торговое оборудование в любые города России через транспортные
                  компании-партнёры.
                </p>
                <p>
                  Доставка стеллажей и торгового оборудования производится по тарифам транспортных компаний-партнёров на день
                  отгрузки.
                </p>
                <p>
                  Стоимость доставки зависит от местоположения Заказчика, количества, веса и объёма заказанного товара.
                  Услуга по доставке товара со склада включает в себя доставку торгового оборудования до подъезда(склада)
                  Заказчика.
                </p>
              </div>
            ) : null}
          </div>
          <div className={styles.recommended_products}>
            <h4>Похожие товары</h4>
            <div className={styles.recommended_products_list}>
              {recommendedProductsList.map((product: IProduct) => (
                <ProductCard product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
