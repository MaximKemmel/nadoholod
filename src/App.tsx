import { useEffect, useLayoutEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { useActions } from "./hooks/useActions";
import { useTypedSelector } from "./hooks/useTypedSeletor";
import { useDebounce } from "./hooks/useDebounce";

import styles from "./App.module.sass";

import Home from "./pages/Home/Home";
import Equipments from "./pages/Equipment/Equipment";
import Catalog from "./pages/Catalog/Catalog";
import Product from "./pages/Product/Product";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";

import Header from "./components/Header/Header";
import ContactUs from "./components/ContactUs/ContactUs";
import Footer from "./components/Footer/Footer";

import { ButtonArrow as ArrowIcon } from "./assets/svg/ButtonArrow";

function App() {
  const { setIsHomePage, setWindowSize, setWindowTopPosition, getCategories, getProducts } = useActions();
  const [isMoveUpActive, setIsMoveUpActive] = useState(false);
  const isNoScroll = useTypedSelector((state) => state.mainReducer.isNoScroll);
  const categroies = useTypedSelector((state) => state.categoryReducer.categories);
  const products = useTypedSelector((state) => state.productReducer.products);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    getWindowSize();
    if (!Array.isArray(categroies) || categroies === undefined || categroies.length === 0) {
      getCategories();
    }
    if (!Array.isArray(products) || products === undefined || products.length === 0) {
      getProducts();
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsHomePage(pathname === "/");
  }, [pathname]);

  useEffect(() => {
    if (isNoScroll) {
      const html = document.getElementById("html");
      html!.style.overflowY = "hidden";
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
      const html = document.getElementById("html");
      html!.style.overflowY = "auto";
    }
  }, [isNoScroll]);

  const handleScroll = async (_event) => {
    checkScrollValue(window.scrollY);
  };

  const checkScrollValue = useDebounce((value) => {
    setIsMoveUpActive(value > 150);
    setWindowTopPosition(value);
  }, 5);

  const handleWindowResize = async (_event) => {
    getWindowSize();
  };

  const getWindowSize = useDebounce(() => {
    const { innerWidth, innerHeight } = window;
    setWindowSize({ innerWidth, innerHeight });
  }, 5);

  return (
    <section className={`${styles.wrapper} ${isNoScroll ? styles.no_scroll : ""}`} onScroll={handleScroll}>
      {!pathname.includes("admin") ? <Header /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipment/:id" element={<Equipments />} />
        <Route path="/catalog/:id" element={<Catalog />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {!pathname.includes("admin") ? (
        <>
          <ContactUs />
          <Footer />
          <div
            className={`${styles.move_up} ${isMoveUpActive ? styles.active : ""}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowIcon />
          </div>
        </>
      ) : null}
    </section>
  );
}

export default App;
