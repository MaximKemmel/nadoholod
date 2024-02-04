import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Equipments from "./pages/Equipment/Equipment";
import Header from "./components/Header/Header";
import ContactUs from "./components/ContactUs/ContactUs";
import Footer from "./components/Footer/Footer";

import "./App.module.sass";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipment/:id" element={<Equipments />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <ContactUs />
      <Footer />
    </>
  );
}

export default App;
