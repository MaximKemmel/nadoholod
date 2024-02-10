import { useEffect, useLayoutEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { useActions } from "./hooks/useActions";
import { useDebounce } from "./hooks/useDebounce";

import styles from "./App.module.sass";

import Home from "./pages/Home/Home";
import Equipments from "./pages/Equipment/Equipment";
import Catalog from "./pages/Catalog/Catalog";
import Product from "./pages/Product/Product";
import Header from "./components/Header/Header";
import ContactUs from "./components/ContactUs/ContactUs";
import Footer from "./components/Footer/Footer";

import { ButtonArrow as ArrowIcon } from "./assets/svg/ButtonArrow";

function App() {
  const { setIsHomePage, setWindowSize, setWindowTopPosition } = useActions();
  const [isMoveUpActive, setIsMoveUpActive] = useState(false);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    getWindowSize();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsHomePage(pathname === "/");
  }, [pathname]);

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
    <section className={`${styles.wrapper}`} onScroll={handleScroll}>
      <div className={styles.wrapper_section}>
        {/*<Header />*/}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipment/:id" element={<Equipments />} />
          <Route path="/catalog/:id" element={<Catalog />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="*" element={<Home />} />
        </Routes>
        {/*<ContactUs />
      <Footer />*/}
        <div
          className={`${styles.move_up} ${isMoveUpActive ? styles.active : ""}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowIcon />
        </div>
      </div>
    </section>
  );
}

export default App;
