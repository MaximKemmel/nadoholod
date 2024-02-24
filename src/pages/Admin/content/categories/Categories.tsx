import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "../../../../quill.css";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSeletor";

import appStyles from "../../../../App.module.sass";
import pageStyles from "../../Admin.module.sass";

import MessageModal from "../../../../components/Modal/MessageModal";
import ConfirmModal from "../../../../components/Modal/ConfirmModal";
import Dropdown from "../../../../components/Dropdown/Dropdown";

import { ICategory } from "../../../../types/category/category";
import { initCategory } from "../../../../types/category/initCategory";
import { ServerStatusType } from "../../../../enums/serverStatusType";
import { initServerStatus } from "../../../../types/main/serverStatus";
import { IDropdownItem } from "../../../../types/main/dropdownItem";

import { Plus as PlusIcon } from "../../../../assets/svg/Plus";
import { List as ListIcon } from "../../../../assets/svg/List";
import { Edit as EditIcon } from "../../../../assets/svg/Edit";
import { Delete as DeleteIcon } from "../../../../assets/svg/Delete";
import { Arrow as ArrowIcon } from "../../../../assets/svg/Arrow";

const Categories = () => {
  const {
    uploadCategoryImage,
    setUploadCategoryImageStatus,
    addCategory,
    setAddCategoryStatus,
    updateCategory,
    setUpdateCategoryStatus,
    deleteCategory,
    setDeleteCategoryStatus,
    getCategories,
  } = useActions();
  const categories = useTypedSelector((state) => state.categoryReducer.categories);
  const path = useTypedSelector((state) => state.fileReducer.path);
  const uploadStatus = useTypedSelector((state) => state.fileReducer.uploadCategoryImageStatus);
  const addCategoryStatus = useTypedSelector((state) => state.categoryReducer.addCategoryStatus);
  const updateCategoryStatus = useTypedSelector((state) => state.categoryReducer.updateCategoryStatus);
  const deleteCategoryStatus = useTypedSelector((state) => state.categoryReducer.deleteCategoryStatus);
  const [selectedCategory, setSelectedCategory] = useState(initCategory());
  const [description, setDescription] = useState("");
  const [viewType, setViewType] = useState(0);
  const [isCheckFields, setIsCheckFields] = useState(false);
  const quillRefDescription = useRef<ReactQuill>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState(-1);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [isMessageShow, setIsMessageShow] = useState(false);
  const [isConfirmShow, setIsConfirmShow] = useState(false);
  const [titleMessage, setTitleMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["clean"],
  ];

  useEffect(() => {
    if (uploadStatus.status === ServerStatusType.Success && path !== "") {
      setUploadProgress(-1);
      setSelectedCategory({ ...selectedCategory, img_path: path });
      setUploadCategoryImageStatus(initServerStatus());
    }
    if (uploadStatus.status === ServerStatusType.Error) {
      setTitleMessage("Ошибка");
      setInfoMessage("Не удалось загрузить изображение");
      setIsMessageShow(true);
      setUploadProgress(-1);
      setUploadCategoryImageStatus(initServerStatus());
    }
  }, [uploadStatus]);

  useEffect(() => {
    if (addCategoryStatus.status === ServerStatusType.Success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      getCategories();
      setTitleMessage("Успех!");
      setInfoMessage("Категория добавлена");
      setIsMessageShow(true);
      setSelectedCategory(initCategory());
      setDescription("");
      setViewType(0);
      setAddCategoryStatus(initServerStatus());
    }
    if (addCategoryStatus.status === ServerStatusType.Error) {
      setTitleMessage("Ошибка");
      setInfoMessage("Ошибка при добавлении категории");
      setIsMessageShow(true);
      setAddCategoryStatus(initServerStatus());
    }
  }, [addCategoryStatus]);

  useEffect(() => {
    if (updateCategoryStatus.status === ServerStatusType.Success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      getCategories();
      setTitleMessage("Успех!");
      setInfoMessage("Категория обновлена");
      setIsMessageShow(true);
      setSelectedCategory(initCategory());
      setDescription("");
      setViewType(0);
      setUpdateCategoryStatus(initServerStatus());
    }
    if (updateCategoryStatus.status === ServerStatusType.Error) {
      setTitleMessage("Ошибка");
      setInfoMessage("Ошибка при обновлении категории");
      setIsMessageShow(true);
      setUpdateCategoryStatus(initServerStatus());
    }
  }, [updateCategoryStatus]);

  useEffect(() => {
    setIsConfirmShow(false);
    if (deleteCategoryStatus.status === ServerStatusType.Success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      getCategories();
      setTitleMessage("Успех!");
      setInfoMessage("Категория удалена");
      setIsMessageShow(true);
      setSelectedCategory(initCategory());
      setDeleteCategoryStatus(initServerStatus());
    }
    if (deleteCategoryStatus.status === ServerStatusType.Error) {
      setTitleMessage("Ошибка");
      setInfoMessage("Ошибка при удалении категории");
      setIsMessageShow(true);
      setDeleteCategoryStatus(initServerStatus());
    }
  }, [deleteCategoryStatus]);

  const handleAddOnClick = () => {
    setSelectedCategory(initCategory());
    setDescription("");
    setIsCheckFields(false);
    setViewType(viewType === 0 ? 1 : 0);
  };

  const handleEditOnClick = (category: ICategory) => {
    setSelectedCategory(category);
    setDescription(category.description);
    setIsCheckFields(false);
    setViewType(1);
  };

  const handleBackOnClick = () => {
    setSelectedCategory(initCategory());
    setDescription("");
    setIsCheckFields(false);
    setViewType(0);
  };

  const handleChangeFile = (event) => {
    try {
      const file = event.target.files[0];
      uploadCategoryImage({
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
    if (selectedCategory.category.trim().length !== 0) {
      var isOk = true;
      if (selectedCategory.id > -1 && selectedCategory.id < 6) {
        if (description.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").length === 0) {
          isOk = false;
        }
      } else {
        if (selectedCategory.parent_id === -1 && selectedCategory.img_path === "") {
          isOk = false;
        }
      }
      if (!isOk) {
        setTitleMessage("Внимание");
        setInfoMessage("Не все поля заполнены");
        setIsMessageShow(true);
      } else {
        if (selectedCategory.id === -1) {
          addCategory({ category: { ...selectedCategory, description: description } });
        } else {
          updateCategory({ category: { ...selectedCategory, description: description } });
        }
      }
    } else {
      setTitleMessage("Внимание");
      setInfoMessage("Не все поля заполнены");
      setIsMessageShow(true);
    }
  };

  const handleDeleteOnClick = (category: ICategory) => {
    setSelectedCategory(category);
    setIsConfirmShow(true);
  };

  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.head}>
        <div className={pageStyles.title}>Категории</div>
        <button type="button" onClick={handleAddOnClick}>
          {viewType === 0 ? <PlusIcon /> : <ListIcon />}
        </button>
      </div>
      {Array.isArray(categories) && categories.length > 0 && viewType === 0 ? (
        <div className={pageStyles.table}>
          <div className={pageStyles.table_head}>
            <div className={`${pageStyles.part} ${pageStyles.image}`}>Изображение</div>
            <div className={`${pageStyles.part} ${pageStyles.main}`}>Название</div>
            <div className={`${pageStyles.part} ${pageStyles.actions}`}>Действия</div>
          </div>
          <div className={pageStyles.table_list}>
            {categories.map((category: ICategory) => (
              <div className={pageStyles.table_item}>
                <div className={`${pageStyles.part} ${pageStyles.image}`}>
                  <img src={`/uploads/${category.img_path}`} alt="" />
                </div>
                <div className={`${pageStyles.part} ${pageStyles.main}`}>{category.category}</div>
                <div className={`${pageStyles.part} ${pageStyles.actions}`}>
                  <button type="button" onClick={() => handleEditOnClick(category)}>
                    <EditIcon />
                  </button>
                  {category.parent_id !== -1 ? (
                    <button type="button" className={appStyles.wrong} onClick={() => handleDeleteOnClick(category)}>
                      <DeleteIcon />
                    </button>
                  ) : null}
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
              {selectedCategory.id === -1 ? "Добавление категории" : "Редактирование категории"}
            </div>
          </div>
          <form onSubmit={handleOnSubmit}>
            <div className={pageStyles.row}>
              <div className={pageStyles.fields}>
                <div className={pageStyles.input_field}>
                  <div className={pageStyles.label}>Название</div>
                  <input
                    className={selectedCategory.category.trim().length === 0 && isCheckFields ? pageStyles.wrong : ""}
                    type="text"
                    placeholder="Название"
                    value={selectedCategory.category}
                    onChange={(event) => setSelectedCategory({ ...selectedCategory, category: event.target.value })}
                    onClick={() => setIsDropdownActive(false)}
                  />
                </div>
                {Array.isArray(categories) &&
                categories !== undefined &&
                categories.length > 0 &&
                (selectedCategory.id === -1 || selectedCategory.id > 5) ? (
                  <div className={pageStyles.input_field}>
                    <div className={pageStyles.label}>Родительская категория</div>
                    <Dropdown
                      isActive={isDropdownActive}
                      setIsActive={setIsDropdownActive}
                      items={[
                        {
                          id: -1,
                          text: "Не указана",
                          is_selected: selectedCategory.parent_id === -1,
                        } as IDropdownItem,
                        ...(categories
                          .filter((category: ICategory) => category.id !== selectedCategory.id)
                          .map((category: ICategory) => {
                            return {
                              id: category.id,
                              text: category.category,
                              is_selected: selectedCategory.parent_id === category.id,
                            } as IDropdownItem;
                          }) as IDropdownItem[]),
                      ]}
                      onItemSelect={(item: IDropdownItem) => {
                        setSelectedCategory({ ...selectedCategory, parent_id: item.id });
                        setIsDropdownActive(false);
                      }}
                    />
                  </div>
                ) : null}
                {selectedCategory.id > -1 && selectedCategory.id < 6 ? (
                  <div className={pageStyles.input_field} onClick={() => setIsDropdownActive(false)}>
                    <div className={pageStyles.label}>Описание</div>
                    <ReactQuill
                      ref={quillRefDescription}
                      className={`${pageStyles.quill} ${
                        description.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").length === 0 &&
                        isCheckFields
                          ? pageStyles.wrong
                          : ""
                      }`}
                      theme="snow"
                      value={description}
                      onChange={setDescription}
                      modules={{ toolbar: toolbarOptions }}
                      onKeyUp={() => setDescription(`${quillRefDescription.current?.getEditorContents()}`)}
                    />
                  </div>
                ) : null}
              </div>
              <div className={pageStyles.image_selector}>
                <div
                  className={`${pageStyles.image_container} ${
                    isCheckFields && selectedCategory.img_path === "" ? pageStyles.wrong : ""
                  }`}
                >
                  {selectedCategory.img_path !== "" ? (
                    <img src={`/uploads/${selectedCategory.img_path}`} alt="" />
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
        message="Вы действительно хотите удалить категорию?"
        handleConfirmOnClick={() => deleteCategory({ category: selectedCategory })}
      />
    </div>
  );
};

export default Categories;
