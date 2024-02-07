import parse from "html-react-parser";

import styles from "./ProductCard.module.sass";

import { IProduct } from "../../types/product/product";

interface IProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  return (
    <div className={styles.card}>
      <img src={product.category_id === -1 ? `/uploads/production/${product.prefix}_card.png` : ""} alt="" />
      <div className={styles.description}>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.description}>{parse(product.card_description)}</div>
      </div>
      <div className={styles.actions}>
        <div className={styles.container}>
          <div className={styles.price}>{`${product.price.toLocaleString()}₽`}</div>
          <button type="button">Подробнее</button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
