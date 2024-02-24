import styles from "./Dropdown.module.sass";

import { IDropdownItem } from "../../types/main/dropdownItem";

import { Arrow as ArrowDownIcon } from "../../assets/svg/Arrow";

interface IDropdownProps {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  items: IDropdownItem[];
  onItemSelect: Function;
}

const Dropdown: React.FC<IDropdownProps> = ({ isActive, setIsActive, items, onItemSelect }) => {
  return (
    <div className={`${styles.dropdown} ${isActive ? styles.active : ""} ${styles.full_width}`}>
      <div className={`${styles.dropdown_button} ${styles.full_width}`} onClick={() => setIsActive(!isActive)}>
        {items.find((item: IDropdownItem) => item.is_selected)!.text}
        <div className={`${styles.arrow} ${isActive ? styles.active : ""}`}>
          <ArrowDownIcon />
        </div>
      </div>
      <div className={`${styles.dropdown_container} ${isActive ? styles.active : ""}`}>
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
