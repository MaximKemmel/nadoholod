import { useEffect, useState } from "react";
import { useTypedSelector } from "../../../../hooks/useTypedSeletor";

import appStyles from "../../../../App.module.sass";
import pageStyles from "../../Admin.module.sass";

import { IAttribute } from "../../../../types/attribute/attribute";

import { Plus as PlusIcon } from "../../../../assets/svg/Plus";
import { Delete as DeleteIcon } from "../../../../assets/svg/Delete";

const Attributes = () => {
  const attributes = useTypedSelector((state) => state.attributeReducer.attributes);
  const [isCheckFields, setIsCheckFields] = useState(false);
  const [tmpAttributes, setTmpAttributes] = useState(attributes);

  useEffect(() => {
    setTmpAttributes(attributes);
  }, [attributes]);

  const handleAddOnClick = () => {
    setTmpAttributes([
      ...tmpAttributes,
      {
        id:
          attributes.length === 0
            ? tmpAttributes.length === 0
              ? 0
              : tmpAttributes[tmpAttributes.length - 1].id + 1
            : attributes[attributes.length - 1].id + 1,
        attribute: "",
      } as IAttribute,
    ]);
  };

  const handleDeleteOnClick = (attribute: IAttribute) => {
    setTmpAttributes(tmpAttributes.filter((tmpAttribute: IAttribute) => tmpAttribute.id !== attribute.id));
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (!isCheckFields) {
      setIsCheckFields(true);
    }
  };

  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.head}>
        <div className={pageStyles.title}>Аттрибуты товара</div>
      </div>
      <div className={pageStyles.content}>
        <form className={`${pageStyles.form} ${pageStyles.secondary_form}`} onSubmit={handleOnSubmit}>
          {Array.isArray(tmpAttributes) && tmpAttributes.length > 0 ? (
            <>
              <div className={pageStyles.row}>
                <div className={pageStyles.fields}>
                  {tmpAttributes.map((attribute: IAttribute) => (
                    <div className={pageStyles.input_field}>
                      <div className={pageStyles.label}>Аттрибут</div>
                      <input
                        className={attribute.attribute.trim().length === 0 && isCheckFields ? pageStyles.wrong : ""}
                        type="text"
                        placeholder="Аттрибут"
                        value={attribute.attribute}
                        onChange={(event) =>
                          setTmpAttributes(
                            tmpAttributes.map((attributeTmp: IAttribute) => {
                              if (attributeTmp.id === attribute.id) {
                                return {
                                  ...attributeTmp,
                                  attribute: event.target.value,
                                };
                              } else return attributeTmp;
                            })
                          )
                        }
                      />
                      <button type="button" className={appStyles.wrong} onClick={() => handleDeleteOnClick(attribute)}>
                        <DeleteIcon />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
          <button type="button" onClick={handleAddOnClick}>
            <PlusIcon />
          </button>
          <button type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  );
};

export default Attributes;
