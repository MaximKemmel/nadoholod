import { connectionPool } from "../../connectionPool";

import { IProduct } from "../../../types/product/product";
import { IProductImage } from "../../../types/product/productImage";

const getProducts = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM products; SELECT * FROM product_images", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Товары не найдены",
          error: error,
        });
      } else {
        const products = data[0] as IProduct[];
        const productImages = data[1] as IProductImage[];
        const productsList = [] as IProduct[];
        products.forEach((product: IProduct) => {
          productsList.push({
            ...product,
            images: productImages.filter((image: IProductImage) => image.product_id === product.id) as IProductImage[],
          });
        });
        return response.json(productsList);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить товары",
      error: error,
    });
  }
};

export { getProducts };
