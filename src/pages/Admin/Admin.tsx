import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSeletor";

import styles from "./Admin.module.sass";

import Navigation from "./content/navigation/Navigation";
import Categories from "./content/categories/Categories";
import Products from "./content/products/Products";

const Admin = () => {
  const navigate = useNavigate();
  const { getCategories } = useActions();
  const isAuth = useTypedSelector((state) => state.userReducer.isAuth);
  const [activeComponent, setActiveComponent] = useState(-1);
  const pageSections = [<Categories />, <Products />] as JSX.Element[];

  useEffect(() => {
    document.title = "Панель управления";
    getCategories();
  }, []);

  useEffect(() => {
    if (!isAuth) {
      navigate("/admin/login");
    } else {
      getCategories();
    }
  }, [isAuth]);

  return (
    <div className={styles.wrapper}>
      <Navigation activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      {activeComponent !== -1 ? pageSections[activeComponent] : null}
    </div>
  );
};

export default Admin;
