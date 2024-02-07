import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { useActions } from "./hooks/useActions";

import Home from "./pages/Home/Home";
import Equipments from "./pages/Equipment/Equipment";
import Catalog from "./pages/Catalog/Catalog";
import Header from "./components/Header/Header";
import ContactUs from "./components/ContactUs/ContactUs";
import Footer from "./components/Footer/Footer";

import "./App.module.sass";

function App() {
  const { setIsHomePage } = useActions();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsHomePage(pathname === "/");
  }, [pathname]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipment/:id" element={<Equipments />} />
        <Route path="/catalog/:id" element={<Catalog />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <ContactUs />
      <Footer />
    </>
  );
}

export default App;
