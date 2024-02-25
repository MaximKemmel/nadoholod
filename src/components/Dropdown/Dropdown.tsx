import styles from "./Dropdown.module.sass";

import { DropdownType } from "../../enums/dropdownType";
import { IDropdownItem } from "../../types/main/dropdownItem";

import { Arrow as ArrowDownIcon } from "../../assets/svg/Arrow";

interface IDropdownProps {
  dropdownType: number;
  activeComponent: number;
  setActiveComponent: React.Dispatch<React.SetStateAction<number>>;
  items: IDropdownItem[];
  onItemSelect: Function;
}

const Dropdown: React.FC<IDropdownProps> = ({ dropdownType, activeComponent, setActiveComponent, items, onItemSelect }) => {
  return (
    <div className={`${styles.dropdown} ${activeComponent === dropdownType ? styles.active : ""} ${styles.full_width}`}>
      <div
        className={`${styles.dropdown_button} ${styles.full_width}`}
        onClick={() => setActiveComponent(activeComponent === dropdownType ? DropdownType.None : dropdownType)}
      >
        {items.find((item: IDropdownItem) => item.is_selected)!.text}
        <div className={`${styles.arrow} ${activeComponent === dropdownType ? styles.active : ""}`}>
          <ArrowDownIcon />
        </div>
      </div>
      <div className={`${styles.dropdown_container} ${activeComponent === dropdownType ? styles.active : ""}`}>
        <div className={styles.dropdown_list}>
          {items.map((item: IDropdownItem) => (
            <div className={styles.dropdown_item} onClick={() => onItemSelect(item)}>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
