import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSeletor";

import styles from "./Product.module.sass";

import ProductCard from "../../components/ProductCard/ProductCard";
import ProductMessageModal from "../../components/Modal/ProductMessageModal";
import ProductOrderModal from "../../components/Modal/ProductOrderModal";

import { IProduct } from "../../types/product/product";

import { Arrow as ArrowIcon } from "../../assets/svg/Arrow";
import CarIcon from "../../assets/images/car.png";
import TimeIcon from "../../assets/images/time.png";
import PdfIcon from "../../assets/images/pdf_icon.png";

const Product = () => {
  const { setIsNoScroll } = useActions();
  const products = useTypedSelector((state) => state.productReducer.products);
  const [mainPhoto, setMainPhoto] = useState("/uploads/products/product.png");
  const [activeTab, setActiveTab] = useState(0);
  const [isMessageShow, setIsMessageShow] = useState(false);
  const [isOrderShow, setIsOrderShow] = useState(false);
  const slider = useRef(null as Slider);

  const settings = {
    className: "center",
    infinite: true,
    autoplay: false,
    centerPadding: "30px",
    slidesToShow: 4,
    speed: 500,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    document.title = "Страница товара";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setIsNoScroll(isMessageShow || isOrderShow);
  }, [isMessageShow, isOrderShow]);

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
              {/*<img src={PolairImage} alt="" width={74} />*/}
              <div className={styles.description}>
                Камера предназначена для хранения продуктов, которым требуется умеренно низкая температура. Поддерживает
                температуру от 0-8 °С
              </div>
              <div className={styles.price_container}>
                <div className={styles.price}>{`${Number(106070).toLocaleString()}₽`}</div>
                <button type="button" onClick={() => setIsOrderShow(true)}>
                  Заказать товар
                </button>
                <div className={styles.warning}>*Актуальную цену можно уточнить у менеджера</div>
              </div>
              <div className={styles.advantages_list}>
                <div className={styles.advantage}>
                  <div className={styles.image}>
                    <img src={CarIcon} alt="" />
                  </div>
                  Доставка по всей России
                </div>
                <div className={styles.advantage}>
                  <div className={styles.image}>
                    <img src={TimeIcon} alt="" />
                  </div>
                  Изгоовление 2 недели
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
            {activeTab === 1 ? (
              <div className={styles.tab_view}>
                <div className={styles.description_list}>
                  <div className={styles.labels}>
                    <div className={styles.label}>Длина</div>
                    <div className={styles.label}>Ширина</div>
                    <div className={styles.label}>Высота</div>
                    <div className={styles.label}>Объем</div>
                    <div className={styles.label}>Объём холодильной камеры (куб.м)</div>
                  </div>
                  <div className={styles.values}>
                    <div className={styles.value}>1360 мм</div>
                    <div className={styles.value}>1360 мм</div>
                    <div className={styles.value}>2200 мм</div>
                    <div className={styles.value}>2,9 м²</div>
                    <div className={styles.value}>1,44</div>
                  </div>
                </div>
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
            {activeTab === 3 ? (
              <div className={styles.tab_view}>
                <div className={styles.link}>
                  <img src={PdfIcon} alt="" />
                  Холодильная камера 2.9 среднетемпературная
                </div>
              </div>
            ) : null}
          </div>
          {Array.isArray(products) && products !== undefined && products.length > 0 ? (
            <div className={styles.recommended_products}>
              <h4>Возможно вас заинтересует</h4>
              <div className={styles.recommended_products_list}>
                {Array(4)
                  .fill(products[0])
                  .map((product: IProduct) => (
                    <div className={styles.card}>
                      <ProductCard product={product} viewType={0} />
                    </div>
                  ))}
              </div>
              <div className={styles.slider}>
                <Slider ref={slider} {...settings}>
                  {Array(4)
                    .fill(products[0])
                    .map((product: IProduct) => (
                      <div>
                        <div className={styles.card}>
                          <ProductCard product={product} viewType={0} />
                        </div>
                      </div>
                    ))}
                </Slider>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <ProductMessageModal
        isShow={isMessageShow}
        setIsShow={setIsMessageShow}
        title="Спасибо за заявку!"
        message="Наш специалист свяжется с вами и уточнит детали заказа"
      />
      <ProductOrderModal isShow={isOrderShow} setIsShow={setIsOrderShow} onSubmit={() => setIsMessageShow(true)} />
    </div>
  );
};

export default Product;
