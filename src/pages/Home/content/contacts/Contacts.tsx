/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { YMaps, Map, ZoomControl, Placemark } from "@pbe/react-yandex-maps";

import { useTypedSelector } from "../../../../hooks/useTypedSeletor";

import pageStyles from "../../Home.module.sass";
import styles from "./Contacts.module.sass";
import "../../../../mapStyles.css";

import PlacemarkIcon from "../../../../assets/images/placemark.png";

const Contacts = () => {
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const mapObject = useRef() as any;
  const [iconSize, setIconSize] = useState([67.78, 80]);

  useEffect(() => {
    if (windowSize.innerWidth > 1024) {
      setIconSize([67.78, 80]);
    } else if (windowSize.innerWidth < 1025 && windowSize.innerWidth > 360) {
      setIconSize([46, 60]);
    } else {
      setIconSize([27, 34]);
    }
  }, [windowSize]);

  return (
    <div className={pageStyles.container} id="contacts_container">
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
                    iconImageSize: iconSize,
                    iconImageOffset: [-iconSize[0] / 2, -iconSize[1] / 2],
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
