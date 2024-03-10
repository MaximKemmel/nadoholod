import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import parse from "html-react-parser";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSeletor";

import styles from "./Product.module.sass";

import ProductCard from "../../components/ProductCard/ProductCard";
import ProductMessageModal from "../../components/Modal/ProductMessageModal";
import ProductOrderModal from "../../components/Modal/ProductOrderModal";

import { IProduct } from "../../types/product/product";
import { initProduct } from "../../types/product/initProduct";

import { Arrow as ArrowIcon } from "../../assets/svg/Arrow";
import CarIcon from "../../assets/images/car.png";
import TimeIcon from "../../assets/images/time.png";
import PdfIcon from "../../assets/images/pdf_icon.png";
import { IProductImage } from "src/types/product/productImage";
import { IManufacturer } from "src/types/manufacturer/manufacturer";
import { IProductAttribute } from "src/types/product/productAttribute";
import { IAttribute } from "src/types/attribute/attribute";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setIsNoScroll } = useActions();
  const products = useTypedSelector((state) => state.productReducer.products);
  const manufacturers = useTypedSelector((state) => state.manufacturerReducer.manufacturers);
  const attributes = useTypedSelector((state) => state.attributeReducer.attributes);
  const [product, setProduct] = useState(initProduct());
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
    if (id !== undefined && products !== undefined && Array.isArray(products) && products.length > 0) {
      if (
        !Number.isNaN(id) &&
        [products].length > 0 &&
        products.filter((tmpProduct: IProduct) => tmpProduct.id === Number(id)).length > 0
      ) {
        setProduct(products.find((tmpProduct: IProduct) => tmpProduct.id === Number(id))!);
      } else {
        navigate("/");
      }
    }
  }, [id, products]);

  useEffect(() => {
    setIsNoScroll(isMessageShow || isOrderShow);
  }, [isMessageShow, isOrderShow]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.breadcumbs}>
          <div className={styles.link} onClick={() => navigate("/")}>
            Главная
          </div>
          <ArrowIcon />
          <div className={styles.link} onClick={() => navigate("/catalog/0")}>
            Каталог
          </div>
          <ArrowIcon />
          <div className={styles.element}>{product.name}</div>
        </div>
        {product.name !== "" ? (
          <div className={styles.content}>
            <h3>{product.name}</h3>
            <div className={styles.main_container}>
              <div className={styles.photos_container}>
                {product.images.length > 0 ? (
                  <div className={styles.photos_list}>
                    <img
                      src={`/uploads/${product.images.find((image: IProductImage) => image.is_main)!.path}`}
                      alt=""
                      onClick={() =>
                        setMainPhoto(`/uploads/${product.images.find((image: IProductImage) => image.is_main)!.path}`)
                      }
                    />
                    {product.images.filter((image: IProductImage) => !image.is_main).length > 0 ? (
                      <>
                        {product.images
                          .filter((image: IProductImage) => !image.is_main)
                          .map((image: IProductImage) => (
                            <img
                              src={`/uploads/${image.path}`}
                              alt=""
                              onClick={() => setMainPhoto(`/uploads/${image.path}`)}
                            />
                          ))}
                      </>
                    ) : null}
                  </div>
                ) : null}
                <img className={styles.main_photo} src={mainPhoto} alt="" />
              </div>
              <div className={styles.info_container}>
                <h5>{product.name}</h5>
                {product.manufacturer_id > -1 &&
                manufacturers !== undefined &&
                manufacturers.length > 0 &&
                manufacturers.filter((manufacturer: IManufacturer) => manufacturer.id === product.manufacturer_id).length >
                  0 ? (
                  <img
                    src={`/uploads/${
                      manufacturers.find((manufacturer: IManufacturer) => manufacturer.id === product.manufacturer_id)!
                        .image_path
                    }`}
                    alt=""
                    width={74}
                  />
                ) : null}
                <div className={styles.description}>{parse(product.description)}</div>
                <div className={styles.price_container}>
                  <div className={styles.price}>{`${product.price.toLocaleString()}₽`}</div>
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
                    Изготовление 2 недели
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
              {activeTab === 0 ? <div className={styles.tab_view}>{parse(product.full_description)}</div> : null}
              {activeTab === 1 ? (
                <div className={styles.tab_view}>
                  {product.attributes.filter((attribute: IProductAttribute) => attribute.attribute_id > 0).length > 0 &&
                  attributes.length > 0 ? (
                    <div className={styles.description_list}>
                      {product.attributes.filter((attribute: IProductAttribute) => attribute.attribute_id === 1).length >
                        0 && attributes.filter((attribute: IAttribute) => attribute.id === 1).length > 0 ? (
                        <div className={styles.attribute}>
                          <div className={styles.label}>
                            {attributes.find((attribute: IAttribute) => attribute.id === 1)?.attribute}
                          </div>
                          <div className={styles.value}>
                            {Number(product.volume).toLocaleString()}
                            м²
                          </div>
                        </div>
                      ) : null}
                      {product.attributes.filter((attribute: IProductAttribute) => attribute.attribute_id > 1).length > 0 ? (
                        <>
                          {product.attributes
                            .filter((attribute: IProductAttribute) => attribute.attribute_id > 1)
                            .map((productAttribute: IProductAttribute) => (
                              <>
                                {attributes.filter((attribute: IAttribute) => attribute.id === productAttribute.attribute_id)
                                  .length > 0 ? (
                                  <div className={styles.attribute}>
                                    <div className={styles.label}>
                                      {
                                        attributes.find(
                                          (attribute: IAttribute) => attribute.id === productAttribute.attribute_id
                                        )?.attribute
                                      }
                                    </div>
                                    <div className={styles.value}>{productAttribute.value}</div>
                                  </div>
                                ) : null}
                              </>
                            ))}
                        </>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : null}
              {activeTab === 2 ? <div className={styles.tab_view}>{parse(product.delivery_info)}</div> : null}
              {activeTab === 3 ? (
                <div className={styles.tab_view}>
                  {product.instruction_path !== "" ? (
                    <div className={styles.link}>
                      <img src={PdfIcon} alt="" />
                      <a href={`/uploads/${product.instruction_path}`} target="blank">
                        {product.instruction_path.split("/")[2]}
                      </a>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
            {Array.isArray(products) &&
            products !== undefined &&
            products.filter((product: IProduct) => product.is_recomendated).length > 0 ? (
              <div className={styles.recommended_products}>
                <h4>Возможно вас заинтересует</h4>
                <div className={styles.recommended_products_list}>
                  {products
                    .filter((product: IProduct) => product.is_recomendated)
                    .map((product: IProduct) => (
                      <div className={styles.card}>
                        <ProductCard product={product} viewType={0} />
                      </div>
                    ))}
                </div>
                <div className={styles.slider}>
                  {products.filter((product: IProduct) => product.is_recomendated).length === 1 ? (
                    <div className={styles.card}>
                      <ProductCard
                        product={products.filter((product: IProduct) => product.is_recomendated)[0]}
                        viewType={0}
                      />
                    </div>
                  ) : (
                    <Slider ref={slider} {...settings}>
                      {products
                        .filter((product: IProduct) => product.is_recomendated)
                        .map((product: IProduct) => (
                          <div>
                            <div className={styles.card}>
                              <ProductCard product={product} viewType={0} />
                            </div>
                          </div>
                        ))}
                    </Slider>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <ProductMessageModal
        isShow={isMessageShow}
        setIsShow={setIsMessageShow}
        title="Спасибо за заявку!"
        message="Наш специалист свяжется с вами и уточнит детали заказа"
      />
      <ProductOrderModal isShow={isOrderShow} setIsShow={setIsOrderShow} productName={product.name} />
    </div>
  );
};

export default Product;
