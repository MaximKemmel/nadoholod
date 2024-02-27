import styles from "./MultiDropdown.module.sass";

import { DropdownType } from "../../enums/dropdownType";
import { IDropdownItem } from "../../types/main/dropdownItem";

import { Arrow as ArrowDownIcon } from "../../assets/svg/Arrow";
import { Check as CheckIcon } from "../../assets/svg/Check";

interface IMultiDropdownProps {
  dropdownType: number;
  activeComponent: number;
  setActiveComponent: React.Dispatch<React.SetStateAction<number>>;
  label: string;
  items: IDropdownItem[];
  onItemSelect: Function;
}

const MultiDropdown: React.FC<IMultiDropdownProps> = ({
  dropdownType,
  activeComponent,
  setActiveComponent,
  label,
  items,
  onItemSelect,
}) => {
  return (
    <div
      className={`${styles.dropdown} ${activeComponent === dropdownType ? styles.active : ""} ${
        label === "" ? styles.full_width : ""
      }`}
    >
      <div
        className={`${styles.dropdown_button} ${label === "" ? styles.full_width : ""}`}
        onClick={() => setActiveComponent(activeComponent === dropdownType ? DropdownType.None : dropdownType)}
      >
        {label}
        <div className={`${styles.arrow} ${activeComponent === dropdownType ? styles.active : ""}`}>
          <ArrowDownIcon />
        </div>
      </div>
      <div
        className={`${styles.dropdown_container} ${activeComponent === dropdownType ? styles.active : ""} ${
          label === "" ? styles.full_width : ""
        }`}
      >
        <div className={styles.dropdown_list}>
          {items.map((item: IDropdownItem) => (
            <div className={styles.dropdown_item}>
              <label className={styles.checkbox}>
                <input type="checkbox" />
                <span
                  className={`${styles.checkbox_mark} ${item.is_selected ? styles.active : ""}`}
                  aria-hidden="true"
                  onClick={() => onItemSelect(item)}
                >
                  {item.is_selected ? <CheckIcon /> : null}
                </span>
                <div className={styles.text}>{item.text}</div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiDropdown;
