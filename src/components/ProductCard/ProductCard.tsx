import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

import styles from "./ProductCard.module.sass";

import { IProduct } from "../../types/product/product";
import PolairImage from "../../assets/images/manufacturer/polair.png";

interface IProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <img
        src={
          product.category_id === -1
            ? `/uploads/production/${product.prefix}_card.png`
            : "/uploads/products/product_card.png"
        }
        alt=""
      />
      <div className={styles.description}>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.brand}>
          <img src={PolairImage} alt="" />
        </div>
        <div className={styles.description}>{parse(product.card_description)}</div>
      </div>
      <div className={styles.actions}>
        <div className={styles.container}>
          <div className={styles.price}>{`${product.price.toLocaleString()}₽`}</div>
          <button type="button" onClick={() => navigate("/product/1")}>
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
