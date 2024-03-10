import { useRef, useState } from "react";
import styles from "./InputSlider.module.sass";

interface IInputSliderProps {
  min: number;
  max: number;
  label: string;
  unit: string;
  onChange: Function;
}

const InputSlider: React.FC<IInputSliderProps> = ({ min, max, label, unit, onChange }) => {
  const [value, setValue] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.slider_wrapper}>
      <div className={styles.label}>{label}</div>
      <div className={styles.container}>
        <div className={styles.value_container} id="value">
          <div className={styles.value}>{`${value === 0 ? min : value}${unit}`}</div>
          <div className={styles.triangle} />
        </div>
        <div className={styles.slider}>
          <div className={styles.min_max}>{min}</div>
          <div className={styles.input_container}>
            <input
              type="range"
              min={0}
              max={max}
              step={5}
              ref={inputRef}
              defaultValue={0}
              onInput={() => {
                setValue(Number(inputRef.current?.value));
                var valueElement = document.getElementById("value");
                if (valueElement !== null) {
                  valueElement.style.marginLeft = `${
                    inputRef.current?.value === "0" ? 3 : (205 * Number(inputRef.current?.value)) / max + 7
                  }px`;
                  var selector = document.getElementById("selector");
                  if (selector !== null) {
                    selector.style.left = `${
                      inputRef.current?.value === "0" ? -4 : (205 * Number(inputRef.current?.value)) / max
                    }px`;
                  }
                  if (inputRef.current !== null) {
                    inputRef.current.style.background = `linear-gradient(90deg, #0B6886 ${
                      (Number(inputRef.current?.value) * 100) / max
                    }%, #01AAC133 0%)`;
                  }
                }
                onChange(Number(inputRef.current?.value));
              }}
            />
            <div className={styles.marks_list}>
              {...Array(max / 5 + 1)
                .fill(1)
                .map((_value, index: number) => (
                  <div
                    className={`${styles.mark} ${index * 5 === value ? styles.empty : ""} ${
                      index * 5 > value ? styles.future : ""
                    }`}
                  />
                ))}
            </div>
            <div className={styles.selector} id="selector">
              <div className={styles.selector_background} />
              <div className={styles.selector_button} />
            </div>
          </div>
          <div className={styles.min_max}>{max}</div>
        </div>
      </div>
    </div>
  );
};

export default InputSlider;
