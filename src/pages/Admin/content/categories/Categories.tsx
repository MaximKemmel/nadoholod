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
import MultiDropdown from "../../../../components/Dropdown/MultiDropdown";

import { ICategory } from "../../../../types/category/category";
import { initCategory } from "../../../../types/category/initCategory";
import { ServerStatusType } from "../../../../enums/serverStatusType";
import { initServerStatus } from "../../../../types/main/serverStatus";
import { IDropdownItem } from "../../../../types/main/dropdownItem";
import { DropdownType } from "../../../../enums/dropdownType";
import { IAttribute } from "../../../../types/attribute/attribute";
import { ICategoryAttribute } from "../../../../types/category/categoryAttribute";
import { IFilter } from "../../../../types/filter/filter";
import { ICategoryFilter } from "../../../../types/category/categoryFilter";
import { IProduct } from "../../../../types/product/product";

import { Plus as PlusIcon } from "../../../../assets/svg/Plus";
import { List as ListIcon } from "../../../../assets/svg/List";
import { Edit as EditIcon } from "../../../../assets/svg/Edit";
import { Delete as DeleteIcon } from "../../../../assets/svg/Delete";
import { Arrow as ArrowIcon } from "../../../../assets/svg/Arrow";
import { Check as CheckIcon } from "../../../../assets/svg/Check";

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
  const products = useTypedSelector((state) => state.productReducer.products);
  const attributes = useTypedSelector((state) => state.attributeReducer.attributes);
  const filters = useTypedSelector((state) => state.filterReducer.filters);
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
  const [activeComponent, setActiveComponent] = useState(DropdownType.None);
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
      setActiveComponent(DropdownType.None);
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
      setActiveComponent(DropdownType.None);
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
    setActiveComponent(DropdownType.None);
    setIsCheckFields(false);
    setViewType(viewType === 0 ? 1 : 0);
  };

  const handleEditOnClick = (category: ICategory) => {
    setSelectedCategory(category);
    setDescription(category.description);
    setActiveComponent(DropdownType.None);
    setIsCheckFields(false);
    setViewType(1);
  };

  const handleBackOnClick = () => {
    setSelectedCategory(initCategory());
    setDescription("");
    setActiveComponent(DropdownType.None);
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
      if (selectedCategory.is_main) {
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
    if (products.length > 0 && products.filter((product: IProduct) => product.category_id === category.id).length > 0) {
      setTitleMessage("Внимание");
      setInfoMessage("Перед удалением категории необходимо отвязать ее от товаров");
      setIsMessageShow(true);
    } else {
      setSelectedCategory(category);
      setIsConfirmShow(true);
    }
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
                  {!category.is_main ? (
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
          <form className={pageStyles.form} onSubmit={handleOnSubmit}>
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
                    onClick={() => setActiveComponent(DropdownType.None)}
                  />
                </div>
                <div className={pageStyles.input_field}>
                  <label className={pageStyles.checkbox}>
                    <div className={pageStyles.text}>Отображать в навигации</div>
                    <input type="checkbox" />
                    <span
                      className={`${pageStyles.checkbox_mark} ${selectedCategory.show_in_nav ? pageStyles.active : ""}`}
                      aria-hidden="true"
                      onClick={() =>
                        setSelectedCategory({ ...selectedCategory, show_in_nav: !selectedCategory.show_in_nav })
                      }
                    >
                      {selectedCategory.show_in_nav ? <CheckIcon /> : null}
                    </span>
                  </label>
                </div>
                {!selectedCategory.is_main ? (
                  <div className={pageStyles.input_field}>
                    <div className={pageStyles.label}>Родительская категория</div>
                    <Dropdown
                      activeComponent={activeComponent}
                      setActiveComponent={setActiveComponent}
                      dropdownType={DropdownType.CategorySelector}
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
                        setActiveComponent(DropdownType.None);
                      }}
                    />
                  </div>
                ) : null}
                {selectedCategory.is_main ? (
                  <div className={pageStyles.input_field} onClick={() => setActiveComponent(DropdownType.None)}>
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
                <div className={pageStyles.input_field}>
                  <div className={pageStyles.label}>{`Аттрибуты товаров`}</div>
                  <MultiDropdown
                    dropdownType={DropdownType.ManufacturerSelector}
                    activeComponent={activeComponent}
                    setActiveComponent={setActiveComponent}
                    label={`Выбрано (${selectedCategory.attributes.length})`}
                    isFullWidth={true}
                    items={
                      attributes.map((attribute: IAttribute) => {
                        return {
                          id: attribute.id,
                          text: attribute.attribute,
                          is_selected:
                            selectedCategory.attributes.filter(
                              (categoryAttribute: ICategoryAttribute) => categoryAttribute.attribute_id === attribute.id
                            ).length > 0,
                        } as IDropdownItem;
                      }) as IDropdownItem[]
                    }
                    onItemSelect={(item: IDropdownItem) => {
                      if (
                        selectedCategory.attributes.filter(
                          (categoryAttribute: ICategoryAttribute) => categoryAttribute.attribute_id === item.id
                        ).length > 0
                      ) {
                        setSelectedCategory({
                          ...selectedCategory,
                          attributes: selectedCategory.attributes.filter(
                            (categoryAttribute: ICategoryAttribute) => categoryAttribute.attribute_id !== item.id
                          ),
                        });
                      } else {
                        setSelectedCategory({
                          ...selectedCategory,
                          attributes: [
                            ...selectedCategory.attributes,
                            {
                              id:
                                selectedCategory.attributes.length === 0
                                  ? 0
                                  : selectedCategory.attributes[selectedCategory.attributes.length - 1].id + 1,
                              attribute_id: item.id,
                              category_id: selectedCategory.id,
                            } as ICategoryAttribute,
                          ],
                        });
                      }
                    }}
                  />
                </div>
                <div className={pageStyles.input_field}>
                  <div className={pageStyles.label}>{`Фильтры товаров`}</div>
                  <MultiDropdown
                    dropdownType={DropdownType.SizeSelector}
                    activeComponent={activeComponent}
                    setActiveComponent={setActiveComponent}
                    label={`Выбрано (${selectedCategory.filters.length})`}
                    isFullWidth={true}
                    items={
                      filters.map((filter: IFilter) => {
                        return {
                          id: filter.id,
                          text: filter.filter,
                          is_selected:
                            selectedCategory.filters.filter(
                              (categoryFilter: ICategoryFilter) => categoryFilter.filter_id === filter.id
                            ).length > 0,
                        } as IDropdownItem;
                      }) as IDropdownItem[]
                    }
                    onItemSelect={(item: IDropdownItem) => {
                      if (
                        selectedCategory.filters.filter(
                          (categoryFilter: ICategoryFilter) => categoryFilter.filter_id === item.id
                        ).length > 0
                      ) {
                        setSelectedCategory({
                          ...selectedCategory,
                          filters: selectedCategory.filters.filter(
                            (categoryFilter: ICategoryFilter) => categoryFilter.filter_id !== item.id
                          ),
                        });
                      } else {
                        setSelectedCategory({
                          ...selectedCategory,
                          filters: [
                            ...selectedCategory.filters,
                            {
                              id:
                                selectedCategory.filters.length === 0
                                  ? 0
                                  : selectedCategory.filters[selectedCategory.filters.length - 1].id + 1,
                              filter_id: item.id,
                              category_id: selectedCategory.id,
                            } as ICategoryFilter,
                          ],
                        });
                      }
                    }}
                  />
                </div>
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
