import { useEffect, useState } from "react";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSeletor";

import appStyles from "../../../../App.module.sass";
import pageStyles from "../../Admin.module.sass";

import MessageModal from "../../../../components/Modal/MessageModal";
import ConfirmModal from "../../../../components/Modal/ConfirmModal";

import { IAttribute } from "../../../../types/attribute/attribute";
import { ServerStatusType } from "../../../../enums/serverStatusType";
import { initServerStatus } from "../../../../types/main/serverStatus";

import { Plus as PlusIcon } from "../../../../assets/svg/Plus";
import { Delete as DeleteIcon } from "../../../../assets/svg/Delete";

const Attributes = () => {
  const { getAttributes, addAttributes, setAddAttributesStatus } = useActions();
  const attributes = useTypedSelector((state) => state.attributeReducer.attributes);
  const addAttributesStatus = useTypedSelector((state) => state.attributeReducer.addAttributesStatus);
  const [selectedAttribute, setSelectedAttribute] = useState({} as IAttribute);
  const [isCheckFields, setIsCheckFields] = useState(false);
  const [tmpAttributes, setTmpAttributes] = useState(attributes);
  const [isMessageShow, setIsMessageShow] = useState(false);
  const [isConfirmShow, setIsConfirmShow] = useState(false);
  const [titleMessage, setTitleMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    setTmpAttributes(attributes);
  }, [attributes]);

  useEffect(() => {
    if (addAttributesStatus.status === ServerStatusType.Success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      getAttributes();
      setTitleMessage("Успех!");
      setInfoMessage("Аттрибуты изменены");
      setIsMessageShow(true);
      setAddAttributesStatus(initServerStatus());
    }
    if (addAttributesStatus.status === ServerStatusType.Error) {
      setTitleMessage("Ошибка");
      setInfoMessage("Ошибка при изменении аттрибутов");
      setIsMessageShow(true);
      setAddAttributesStatus(initServerStatus());
    }
  }, [addAttributesStatus]);

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

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (!isCheckFields) {
      setIsCheckFields(true);
    }
    if (tmpAttributes.filter((attribute: IAttribute) => attribute.attribute.trim().length === 0).length === 0) {
      addAttributes({ attributes: tmpAttributes });
    } else {
      setTitleMessage("Внимание");
      setInfoMessage("Заполните все поля или удалите пустые");
      setIsMessageShow(true);
    }
  };

  const handleDeleteOnClick = (attribute: IAttribute) => {
    setSelectedAttribute(attribute);
    setIsConfirmShow(true);
  };

  const handleDeleteOnConfirm = () => {
    setTmpAttributes(tmpAttributes.filter((tmpAttribute: IAttribute) => tmpAttribute.id !== selectedAttribute.id));
    setIsConfirmShow(false);
  };

  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.head}>
        <div className={pageStyles.title}>Аттрибуты товара</div>
      </div>
      <div className={pageStyles.content}>
        <form className={`${pageStyles.form} ${pageStyles.secondary_form}`} onSubmit={handleOnSubmit}>
          <button className={pageStyles.add_button} type="button" onClick={handleAddOnClick}>
            <PlusIcon />
          </button>
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
          <button type="submit">Сохранить</button>
        </form>
      </div>
      <MessageModal isShow={isMessageShow} setIsShow={setIsMessageShow} title={titleMessage} message={infoMessage} />
      <ConfirmModal
        isShow={isConfirmShow}
        setIsShow={setIsConfirmShow}
        title="Подтвердите удаление"
        message="Вы действительно хотите удалить аттрибут?"
        handleConfirmOnClick={handleDeleteOnConfirm}
      />
    </div>
  );
};

export default Attributes;
