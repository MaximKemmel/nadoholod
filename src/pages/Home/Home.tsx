import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

import About from "./content/about/About";
import Advantages from "./content/advantages/Advantages";
import Catalog from "./content/catalog/Catalog";
import Clients from "./content/clients/Clients";
import Contacts from "./content/contacts/Contacts";
import Delivery from "./content/delivery/Delivery";
import Equipment from "./content/equipment/Equipment";
import Production from "./content/production/Production";
import Service from "./content/service/Service";
import WorkStages from "./content/workStages/WorkStages";
import Face from "./content/face/Face";

const Home = () => {
  const { state } = useLocation();
  const { currentContainer } = state === null ? "" : state;

  useLayoutEffect(() => {
    document.title = "Главная";
    if (state !== undefined && currentContainer !== undefined && currentContainer !== "") {
      setTimeout(scrollToContainer, 500);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const scrollToContainer = () => {
    var element = document.getElementById(currentContainer);
    if (element !== null) {
      element!.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <Face />
      <Catalog />
      <About />
      <Advantages />
      <Equipment />
      <Clients />
      <Production />
      <Service />
      <WorkStages />
      <Delivery />
      <Contacts />
    </div>
  );
};

export default Home;
