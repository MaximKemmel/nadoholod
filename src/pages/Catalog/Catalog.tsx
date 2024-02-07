import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./Catalog.module.sass";

import ProductCard from "../../components/ProductCard/ProductCard";

import { productionCategoriesList } from "../../data/productionCategoriesList";
import { recommendedProductsList } from "../../data/recommendedProductsList";

import { IProductionCategory } from "../../types/production/productionCategory";
import { IProduct } from "../../types/product/product";

import { Arrow as ArrowIcon } from "../../assets/svg/Arrow";

const Catalog = () => {
  const { id } = useParams();
  const [productionCategory, setProductionCategory] = useState({ id: -1 } as IProductionCategory);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      if (Number(id) < 10) {
        const tmpProductionCategory = productionCategoriesList.find((item: IProductionCategory) => item.id === Number(id))!;
        setProductionCategory(tmpProductionCategory);
        document.title = tmpProductionCategory.name;
      } else {
        const tmpProductionCategory = productionCategoriesList.find(
          (item: IProductionCategory) =>
            item.subcategories.filter((subcategory: IProductionCategory) => subcategory.id === Number(id)).length > 0
        )!;
        const tmpSubcategory = tmpProductionCategory.subcategories.find(
          (subcategory: IProductionCategory) => subcategory.id === Number(id)
        )!;
        setProductionCategory(tmpSubcategory);
        document.title = tmpSubcategory.name;
      }
    }
  }, [id]);

  return (
    <div className={styles.wrapper}>
      {productionCategory.id > -1 ? (
        <div className={styles.container}>
          <div className={styles.breadcumbs}>
            <div className={styles.breadcumb}>Главная</div>
            <ArrowIcon />
            <div className={styles.breadcumb}>Каталог</div>
            <ArrowIcon />
            <div className={styles.element}>{productionCategory.name}</div>
          </div>
          <div className={styles.content}>
            <h3>{productionCategory.name}</h3>
            {productionCategory.subcategories !== undefined && productionCategory.subcategories.length > 0 ? (
              <div className={styles.subcategories_list}>
                {productionCategory.subcategories.map((category: IProductionCategory) => (
                  <div className={styles.subcategory} onClick={() => navigate(`/catalog/${category.id}`)}>
                    <img src={`/uploads/production/${category.prefix}.png`} alt="" />
                    <div className={styles.name}>{category.name}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div className={styles.recommended_products}>
            <h4>Возможно вас заинтересует</h4>
            <div className={styles.recommended_products_list}>
              {recommendedProductsList.map((product: IProduct) => (
                <ProductCard product={product} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Catalog;
