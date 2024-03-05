import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

import { useTypedSelector } from "../../hooks/useTypedSeletor";

import styles from "./ProductCard.module.sass";

import { IProduct } from "../../types/product/product";
import { IProductImage } from "../../types/product/productImage";
import { IManufacturer } from "../../types/manufacturer/manufacturer";

interface IProductCardProps {
  product: IProduct;
  viewType: number;
}

const ProductCard: React.FC<IProductCardProps> = ({ product, viewType }) => {
  const navigate = useNavigate();
  const manufacturers = useTypedSelector((state) => state.manufacturerReducer.manufacturers);

  return (
    <div
      className={`${styles.card} ${viewType === 1 ? styles.list : ""}`}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {product.images.length > 0 && product.images.filter((image: IProductImage) => image.is_main).length > 0 ? (
        <img src={`/uploads/${product.images.find((image: IProductImage) => image.is_main)!.path}`} alt="" />
      ) : null}
      <div className={styles.info_block}>
        <div className={styles.description}>
          <div className={styles.name}>{product.name}</div>
          <div className={styles.brand}>
            {product.manufacturer_id !== -1 && manufacturers.length > 0 ? (
              <img
                src={`/uploads/${
                  manufacturers.find((manufacturer: IManufacturer) => manufacturer.id === product.manufacturer_id)!
                    .image_path
                }`}
                alt=""
              />
            ) : null}
          </div>
          <div className={styles.description}>{parse(product.description)}</div>
        </div>
        <div className={styles.actions}>
          <div className={styles.container}>
            <div className={styles.price}>{`${product.price.toLocaleString()}₽`}</div>
            <button type="button" onClick={() => navigate(`/product/${product.id}`)}>
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
