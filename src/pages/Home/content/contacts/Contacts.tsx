/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { YMaps, Map, ZoomControl, Placemark } from "@pbe/react-yandex-maps";

import pageStyles from "../../Home.module.sass";
import styles from "./Contacts.module.sass";
import "../../../../mapStyles.css";

import PlacemarkIcon from "../../../../assets/images/placemark.png";

const Contacts = () => {
  const mapObject = useRef() as any;

  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.container_content}>
        <h3>Контакты</h3>
        <div className={styles.content}>
          <div className={styles.contacts}>
            <div className={styles.contact}>
              <div className={styles.label}>Адрес:</div>
              <div className={styles.value}>Барнаул, ул. Германа Титова 35а</div>
            </div>
            <div className={styles.contact}>
              <div className={styles.label}>График работы:</div>
              <div className={styles.value}>Пн-Пт 9:00–18:00; Сб-Вс-выходной</div>
            </div>
            <div className={styles.contact}>
              <div className={styles.label}>Email:</div>
              <div className={styles.value}>holodpro22@gmail.com</div>
            </div>
            <div className={styles.contact}>
              <div className={styles.label}>+7 913 234-97-54</div>
              <div className={styles.label}>+7 900 163-89-72</div>
            </div>
          </div>
          <div className={styles.map_container}>
            <YMaps version={"2.1.79"} query={{ apikey: "1e5e91fd-e3dd-44ff-8839-58a989e560ee" }}>
              <Map
                defaultState={{ center: [53.381856, 83.707003], zoom: 17, controls: [] }}
                className="map"
                instanceRef={mapObject}
              >
                <ZoomControl />
                <Placemark
                  geometry={[53.381856, 83.707003]}
                  key="company"
                  options={{
                    iconLayout: "default#image",
                    iconImageHref: PlacemarkIcon,
                    iconImageSize: [67.78, 80],
                    iconImageOffset: [-33, -40],
                  }}
                />
              </Map>
            </YMaps>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
