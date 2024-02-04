import { useEffect } from "react";

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

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
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
