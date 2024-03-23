import { useEffect, useRef, useState } from "react";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSeletor";

import appStyles from "../../../../App.module.sass";
import pageStyles from "../../Admin.module.sass";

import MessageModal from "../../../../components/Modal/MessageModal";
import ConfirmModal from "../../../../components/Modal/ConfirmModal";

import { IManufacturer } from "../../../../types/manufacturer/manufacturer";
import { initManufacturer } from "../../../../types/manufacturer/initManufacturer";
import { ServerStatusType } from "../../../../enums/serverStatusType";
import { initServerStatus } from "../../../../types/main/serverStatus";

import { Plus as PlusIcon } from "../../../../assets/svg/Plus";
import { List as ListIcon } from "../../../../assets/svg/List";
import { Edit as EditIcon } from "../../../../assets/svg/Edit";
import { Delete as DeleteIcon } from "../../../../assets/svg/Delete";
import { Arrow as ArrowIcon } from "../../../../assets/svg/Arrow";
import { IProduct } from "src/types/product/product";

const Manufacturers = () => {
  const {
    uploadManufacturerImage,
    setUploadManufacturerImageStatus,
    addManufacturer,
    setAddManufacturerStatus,
    updateManufacturer,
    setUpdateManufacturerStatus,
    deleteManufacturer,
    setDeleteManufacturerStatus,
    getManufacturers,
  } = useActions();
  const manufacturers = useTypedSelector((state) => state.manufacturerReducer.manufacturers);
  const products = useTypedSelector((state) => state.productReducer.products);
  const path = useTypedSelector((state) => state.fileReducer.path);
  const uploadStatus = useTypedSelector((state) => state.fileReducer.uploadManufacturerImageStatus);
  const addManufacturerStatus = useTypedSelector((state) => state.manufacturerReducer.addManufacturerStatus);
  const updateManufacturerStatus = useTypedSelector((state) => state.manufacturerReducer.updateManufacturerStatus);
  const deleteManufacturerStatus = useTypedSelector((state) => state.manufacturerReducer.deleteManufacturerStatus);
  const [selectedManufacturer, setSelectedManufacturer] = useState(initManufacturer());
  const [viewType, setViewType] = useState(0);
  const [isCheckFields, setIsCheckFields] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState(-1);
  const [isMessageShow, setIsMessageShow] = useState(false);
  const [isConfirmShow, setIsConfirmShow] = useState(false);
  const [titleMessage, setTitleMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    if (uploadStatus.status === ServerStatusType.Success && path !== "") {
      setUploadProgress(-1);
      setSelectedManufacturer({ ...selectedManufacturer, image_path: path });
      setUploadManufacturerImageStatus(initServerStatus());
    }
    if (uploadStatus.status === ServerStatusType.Error) {
      setTitleMessage("Ошибка");
      setInfoMessage("Не удалось загрузить изображение");
      setIsMessageShow(true);
      setUploadProgress(-1);
      setUploadManufacturerImageStatus(initServerStatus());
    }
  }, [uploadStatus]);

  useEffect(() => {
    if (addManufacturerStatus.status === ServerStatusType.Success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      getManufacturers();
      setTitleMessage("Успех!");
      setInfoMessage("Производитель добавлен");
      setIsMessageShow(true);
      setSelectedManufacturer(initManufacturer());
      setViewType(0);
      setAddManufacturerStatus(initServerStatus());
    }
    if (addManufacturerStatus.status === ServerStatusType.Error) {
      setTitleMessage("Ошибка");
      setInfoMessage("Ошибка при добавлении производителя");
      setIsMessageShow(true);
      setAddManufacturerStatus(initServerStatus());
    }
  }, [addManufacturerStatus]);

  useEffect(() => {
    if (updateManufacturerStatus.status === ServerStatusType.Success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      getManufacturers();
      setTitleMessage("Успех!");
      setInfoMessage("Производитель обновлен");
      setIsMessageShow(true);
      setSelectedManufacturer(initManufacturer());
      setViewType(0);
      setUpdateManufacturerStatus(initServerStatus());
    }
    if (updateManufacturerStatus.status === ServerStatusType.Error) {
      setTitleMessage("Ошибка");
      setInfoMessage("Ошибка при обновлении производителя");
      setIsMessageShow(true);
      setUpdateManufacturerStatus(initServerStatus());
    }
  }, [updateManufacturerStatus]);

  useEffect(() => {
    setIsConfirmShow(false);
    if (deleteManufacturerStatus.status === ServerStatusType.Success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      getManufacturers();
      setTitleMessage("Успех!");
      setInfoMessage("Производитель удален");
      setIsMessageShow(true);
      setSelectedManufacturer(initManufacturer());
      setDeleteManufacturerStatus(initServerStatus());
    }
    if (deleteManufacturerStatus.status === ServerStatusType.Error) {
      setTitleMessage("Ошибка");
      setInfoMessage("Ошибка при удалении производителя");
      setIsMessageShow(true);
      setDeleteManufacturerStatus(initServerStatus());
    }
  }, [deleteManufacturerStatus]);

  const handleAddOnClick = () => {
    setSelectedManufacturer(initManufacturer());
    setIsCheckFields(false);
    setViewType(viewType === 0 ? 1 : 0);
  };

  const handleEditOnClick = (manufacturer: IManufacturer) => {
    setSelectedManufacturer(manufacturer);
    setIsCheckFields(false);
    setViewType(1);
  };

  const handleBackOnClick = () => {
    setSelectedManufacturer(initManufacturer());
    setIsCheckFields(false);
    setViewType(0);
  };

  const handleChangeFile = (event) => {
    try {
      const file = event.target.files[0];
      uploadManufacturerImage({
        file: file,
        onUploadProgress: (data) => {
          setUploadProgress(Math.round(100 * (data.loaded / data.total!)));
        },
      });
      event.target.value = "";
    } catch (error) {
      console.warn(error);
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (!isCheckFields) {
      setIsCheckFields(true);
    }
    if (selectedManufacturer.manufacturer.trim().length !== 0) {
      if (selectedManufacturer.id === -1) {
        addManufacturer({ manufacturer: selectedManufacturer });
      } else {
        updateManufacturer({ manufacturer: selectedManufacturer });
      }
    } else {
      setTitleMessage("Внимание");
      setInfoMessage("Не все поля заполнены");
      setIsMessageShow(true);
    }
  };

  const handleDeleteOnClick = (manufacturer: IManufacturer) => {
    if (
      products.length > 0 &&
      products.filter((product: IProduct) => product.manufacturer_id === manufacturer.id).length > 0
    ) {
      setTitleMessage("Внимание");
      setInfoMessage("Перед удалением производителя необходимо отвязать его от товаров");
      setIsMessageShow(true);
    } else {
      setSelectedManufacturer(manufacturer);
      setIsConfirmShow(true);
    }
  };

  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.head}>
        <div className={pageStyles.title}>Производители</div>
        <button type="button" onClick={handleAddOnClick}>
          {viewType === 0 ? <PlusIcon /> : <ListIcon />}
        </button>
      </div>
      {Array.isArray(manufacturers) && manufacturers.length > 0 && viewType === 0 ? (
        <div className={pageStyles.table}>
          <div className={pageStyles.table_head}>
            <div className={`${pageStyles.part} ${pageStyles.image} ${pageStyles.manufacturer}`}>Изображение</div>
            <div className={`${pageStyles.part} ${pageStyles.main}`}>Название</div>
            <div className={`${pageStyles.part} ${pageStyles.actions}`}>Действия</div>
          </div>
          <div className={pageStyles.table_list}>
            {manufacturers.map((manufacturer: IManufacturer) => (
              <div className={pageStyles.table_item}>
                <div className={`${pageStyles.part} ${pageStyles.image} ${pageStyles.manufacturer}`}>
                  <img src={`/uploads/${manufacturer.image_path}`} alt="" />
                </div>
                <div className={`${pageStyles.part} ${pageStyles.main}`}>{manufacturer.manufacturer}</div>
                <div className={`${pageStyles.part} ${pageStyles.actions}`}>
                  <button type="button" onClick={() => handleEditOnClick(manufacturer)}>
                    <EditIcon />
                  </button>
                  <button type="button" className={appStyles.wrong} onClick={() => handleDeleteOnClick(manufacturer)}>
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {viewType === 1 ? (
        <div className={pageStyles.content}>
          <div className={pageStyles.content_head}>
            <button type="button" onClick={handleBackOnClick}>
              <ArrowIcon />
            </button>
            <div className={pageStyles.content_title}>
              {selectedManufacturer.id === -1 ? "Добавление производителя" : "Редактирование производителя"}
            </div>
          </div>
          <form className={pageStyles.form} onSubmit={handleOnSubmit}>
            <div className={pageStyles.row}>
              <div className={pageStyles.fields}>
                <div className={pageStyles.input_field}>
                  <div className={pageStyles.label}>Название</div>
                  <input
                    className={
                      selectedManufacturer.manufacturer.trim().length === 0 && isCheckFields ? pageStyles.wrong : ""
                    }
                    type="text"
                    placeholder="Название"
                    value={selectedManufacturer.manufacturer}
                    onChange={(event) =>
                      setSelectedManufacturer({ ...selectedManufacturer, manufacturer: event.target.value })
                    }
                  />
                </div>
              </div>
              <div className={`${pageStyles.image_selector} ${pageStyles.manufacturer}`}>
                <div
                  className={`${pageStyles.image_container} ${
                    isCheckFields && selectedManufacturer.image_path === "" ? pageStyles.wrong : ""
                  }`}
                >
                  {selectedManufacturer.image_path !== "" ? (
                    <img src={`/uploads/${selectedManufacturer.image_path}`} alt="" />
                  ) : (
                    <div className={pageStyles.empty_image}>Нет изображения</div>
                  )}
                </div>
                <input ref={inputFileRef} type="file" onChange={handleChangeFile} accept="image/png, image/jpeg" hidden />
                <button type="button" onClick={() => inputFileRef.current!.click()} disabled={uploadProgress > -1}>
                  {uploadProgress === -1 ? "Выбрать изображение" : `Загрузка...(${uploadProgress}%)`}
                </button>
              </div>
            </div>
            <button type="submit">Сохранить</button>
          </form>
        </div>
      ) : null}
      <MessageModal isShow={isMessageShow} setIsShow={setIsMessageShow} title={titleMessage} message={infoMessage} />
      <ConfirmModal
        isShow={isConfirmShow}
        setIsShow={setIsConfirmShow}
        title="Подтвердите удаление"
        message="Вы действительно хотите удалить производителя?"
        handleConfirmOnClick={() => deleteManufacturer({ manufacturer: selectedManufacturer })}
      />
    </div>
  );
};

export default Manufacturers;
