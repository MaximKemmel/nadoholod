import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "../../../../quill.css";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSeletor";

import appStyles from "../../../../App.module.sass";
import pageStyles from "../../Admin.module.sass";

import MessageModal from "../../../../components/Modal/MessageModal";
import ConfirmModal from "../../../../components/Modal/ConfirmModal";
import MultiDropdown from "../../../../components/Dropdown/MultiDropdown";
import Dropdown from "../../../../components/Dropdown/Dropdown";

import { IProduct } from "../../../../types/product/product";
import { initProduct } from "../../../../types/product/initProduct";
import { IProductImage } from "../../../../types/product/productImage";
import { ICategory } from "../../../../types/category/category";
import { IDropdownItem } from "../../../../types/main/dropdownItem";
import { DropdownType } from "../../../../enums/dropdownType";
import { ServerStatusType } from "../../../../enums/serverStatusType";
import { initServerStatus } from "../../../../types/main/serverStatus";
import { IAttribute } from "../../../../types/attribute/attribute";
import { IProductAttribute } from "../../../../types/product/productAttribute";
import { IProductFilter } from "../../../../types/product/productFilter";
import { ICategoryAttribute } from "../../../../types/category/categoryAttribute";
import { IFilter } from "../../../../types/filter/filter";
import { IManufacturer } from "../../../../types/manufacturer/manufacturer";
import { ICategoryFilter } from "../../../../types/category/categoryFilter";
import { IFilterItem } from "../../../../types/filter/filterItem";

import { Plus as PlusIcon } from "../../../../assets/svg/Plus";
import { List as ListIcon } from "../../../../assets/svg/List";
import { Edit as EditIcon } from "../../../../assets/svg/Edit";
import { Delete as DeleteIcon } from "../../../../assets/svg/Delete";
import { Close as CloseIcon } from "../../../../assets/svg/Close";
import { Search as SearchIcon } from "../../../../assets/svg/Search";
import { Arrow as ArrowIcon } from "../../../../assets/svg/Arrow";
import { Check as CheckIcon } from "../../../../assets/svg/Check";

const Products = () => {
  const {
    addProduct,
    setAddProductStatus,
    updateProduct,
    setUpdateProductStatus,
    deleteProduct,
    setDeleteProductStatus,
    getProducts,
    uploadProductInstruction,
    setUploadProductInstructionStatus,
    uploadProductImage,
    setUploadProductImageStatus,
  } = useActions();
  const products = useTypedSelector((state) => state.productReducer.products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const categories = useTypedSelector((state) => state.categoryReducer.categories);
  const [categoryFilters, setCategoryFilters] = useState([] as IFilter[]);
  const attributes = useTypedSelector((state) => state.attributeReducer.attributes);
  const filters = useTypedSelector((state) => state.filterReducer.filters);
  const manufacturers = useTypedSelector((state) => state.manufacturerReducer.manufacturers);
  const addProductStatus = useTypedSelector((state) => state.productReducer.addProductStatus);
  const updateProductStatus = useTypedSelector((state) => state.productReducer.updateProductStatus);
  const deleteProductStatus = useTypedSelector((state) => state.productReducer.deleteProductStatus);
  const path = useTypedSelector((state) => state.fileReducer.path);
  const uploadInstructionStatus = useTypedSelector((state) => state.fileReducer.uploadProductInstructionStatus);
  const uploadImageStatus = useTypedSelector((state) => state.fileReducer.uploadProductImageStatus);
  const [selectedProduct, setSelectedProduct] = useState(initProduct());
  const [description, setDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState("");
  const [volumeStr, setVolumeStr] = useState("");
  const [viewType, setViewType] = useState(0);
  const [isCheckFields, setIsCheckFields] = useState(false);
  const quillRefDescription = useRef<ReactQuill>(null);
  const quillRefFullDescription = useRef<ReactQuill>(null);
  const quillRefDeliveryInfo = useRef<ReactQuill>(null);
  const inputInstructionRef = useRef<HTMLInputElement>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [uploadInstructionProgress, setUploadInstructionProgress] = useState(-1);
  const [uploadImageProgress, setUploadImageProgress] = useState(-1);
  const [activeComponent, setActiveComponent] = useState(DropdownType.None);
  const [isMessageShow, setIsMessageShow] = useState(false);
  const [isConfirmShow, setIsConfirmShow] = useState(false);
  const [titleMessage, setTitleMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["clean"],
  ];

  useEffect(() => {
    if (searchValue.trim().length === 0) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product: IProduct) => product.name.toLowerCase().includes(searchValue.toLowerCase()))
      );
    }
  }, [searchValue, products]);

  useEffect(() => {
    if (selectedProduct.category_id === -1) {
      setSelectedProduct({ ...selectedProduct, attributes: [] as IProductAttribute[], filters: [] as IProductFilter[] });
      setCategoryFilters([]);
    } else {
      if (Array.isArray(attributes) && attributes !== undefined && attributes.length > 0) {
        var category = categories.find((category: ICategory) => category.id === selectedProduct.category_id);
        var tmpProductAttributes = [] as IProductAttribute[];
        category?.attributes.forEach((categoryAttribute: ICategoryAttribute) => {
          if (attributes.filter((attribute: IAttribute) => attribute.id === categoryAttribute.attribute_id).length > 0) {
            tmpProductAttributes.push({
              id: categoryAttribute.attribute_id,
              product_id: selectedProduct.id,
              attribute_id: categoryAttribute.attribute_id,
              value:
                selectedProduct.attributes.filter(
                  (productAttribute: IProductAttribute) => productAttribute.attribute_id === categoryAttribute.attribute_id
                ).length > 0
                  ? selectedProduct.attributes.find(
                      (productAttribute: IProductAttribute) =>
                        productAttribute.attribute_id === categoryAttribute.attribute_id
                    )!.value
                  : "",
            } as IProductAttribute);
          }
        });
        setSelectedProduct({ ...selectedProduct, attributes: tmpProductAttributes });
      }
      if (Array.isArray(filters) && filters !== undefined && filters.length > 0) {
        var category = categories.find((category: ICategory) => category.id === selectedProduct.category_id);
        var tmpFilters = [] as IFilter[];
        category?.filters.forEach((categoryFilter: ICategoryFilter) => {
          if (filters.filter((filter: IFilter) => filter.id === categoryFilter.filter_id && filter.id > 1).length > 0) {
            tmpFilters.push(filters.find((filter: IFilter) => filter.id === categoryFilter.filter_id)!);
          }
        });
        setCategoryFilters(tmpFilters);
      }
    }
  }, [selectedProduct.category_id, attributes]);

  useEffect(() => {
    if (uploadInstructionStatus.status === ServerStatusType.Success && path !== "") {
      setUploadInstructionProgress(-1);
      setSelectedProduct({ ...selectedProduct, instruction_path: path });
      setUploadProductInstructionStatus(initServerStatus());
    }
    if (uploadInstructionStatus.status === ServerStatusType.Error) {
      setTitleMessage("Ошибка");
      setInfoMessage("Не удалось загрузить изображение");
      setIsMessageShow(true);
      setUploadInstructionProgress(-1);
      setUploadProductInstructionStatus(initServerStatus());
    }
  }, [uploadInstructionStatus]);

  useEffect(() => {
    if (addProductStatus.status === ServerStatusType.Success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      getProducts();
      setTitleMessage("Успех!");
      setInfoMessage("Товар добавлен");
      setIsMessageShow(true);
      setSelectedProduct(initProduct());
      setDescription("");
      setFullDescription("");
      setDeliveryInfo("");
      setVolumeStr("");
      setViewType(0);
      setAddProductStatus(initServerStatus());
      setActiveComponent(DropdownType.None);
    }
    if (addProductStatus.status === ServerStatusType.Error) {
      setTitleMessage("Ошибка");
      setInfoMessage("Ошибка при добавлении товара");
      setIsMessageShow(true);
      setAddProductStatus(initServerStatus());
    }
  }, [addProductStatus]);

  useEffect(() => {
    if (updateProductStatus.status === ServerStatusType.Success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      getProducts();
      setTitleMessage("Успех!");
      setInfoMessage("Товар обновлен");
      setIsMessageShow(true);
      setSelectedProduct(initProduct());
      setDescription("");
      setFullDescription("");
      setDeliveryInfo("");
      setVolumeStr("");
      setViewType(0);
      setUpdateProductStatus(initServerStatus());
      setActiveComponent(DropdownType.None);
    }
    if (updateProductStatus.status === ServerStatusType.Error) {
      setTitleMessage("Ошибка");
      setInfoMessage("Ошибка при обновлении товара");
      setIsMessageShow(true);
      setUpdateProductStatus(initServerStatus());
    }
  }, [updateProductStatus]);

  useEffect(() => {
    setIsConfirmShow(false);
    if (deleteProductStatus.status === ServerStatusType.Success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      getProducts();
      setTitleMessage("Успех!");
      setInfoMessage("Товар удален");
      setIsMessageShow(true);
      setSelectedProduct(initProduct());
      setDeleteProductStatus(initServerStatus());
    }
    if (deleteProductStatus.status === ServerStatusType.Error) {
      setTitleMessage("Ошибка");
      setInfoMessage("Ошибка при удалении товара");
      setIsMessageShow(true);
      setDeleteProductStatus(initServerStatus());
    }
  }, [deleteProductStatus]);

  useEffect(() => {
    if (uploadImageStatus.status === ServerStatusType.Success && path !== "") {
      setUploadImageProgress(-1);
      setSelectedProduct({
        ...selectedProduct,
        images: [
          ...selectedProduct.images,
          {
            id: selectedProduct.images.length === 0 ? 0 : selectedProduct.images[selectedProduct.images.length - 1].id + 1,
            path: path,
            is_main: selectedProduct.images.length === 0,
          } as IProductImage,
        ],
      });
      setUploadProductImageStatus(initServerStatus());
    }
    if (uploadImageStatus.status === ServerStatusType.Error) {
      setTitleMessage("Ошибка");
      setInfoMessage("Не удалось загрузить изображение");
      setIsMessageShow(true);
      setUploadImageProgress(-1);
      setUploadProductImageStatus(initServerStatus());
    }
  }, [uploadImageStatus]);

  useEffect(() => {
    if (
      selectedProduct.images.length > 0 &&
      selectedProduct.images.filter((image: IProductImage) => image.is_main).length === 0
    ) {
      setSelectedProduct({
        ...selectedProduct,
        images: selectedProduct.images.map((image: IProductImage, index: number) => {
          return { ...image, is_main: index === 0 } as IProductImage;
        }),
      });
    }
  }, [selectedProduct.images]);

  const handleAddOnClick = () => {
    setSelectedProduct(initProduct());
    setDescription("");
    setFullDescription("");
    setDeliveryInfo("");
    setVolumeStr("");
    setActiveComponent(DropdownType.None);
    setIsCheckFields(false);
    setViewType(viewType === 0 ? 1 : 0);
  };

  const handleEditOnClick = (product: IProduct) => {
    setSelectedProduct(product);
    setDescription(product.description);
    setFullDescription(product.full_description);
    setDeliveryInfo(product.delivery_info);
    setVolumeStr(product.volume.toString());
    setActiveComponent(DropdownType.None);
    setIsCheckFields(false);
    setViewType(1);
  };

  const handleBackOnClick = () => {
    setSelectedProduct(initProduct());
    setDescription("");
    setFullDescription("");
    setDeliveryInfo("");
    setVolumeStr("");
    setActiveComponent(DropdownType.None);
    setIsCheckFields(false);
    setViewType(0);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (!isCheckFields) {
      setIsCheckFields(true);
    }
    if (
      (selectedProduct.attributes.filter((attribute: IProductAttribute) => attribute.attribute_id === 1).length > 0 &&
        Number.isNaN(Number(volumeStr))) ||
      Number(volumeStr) < 0
    ) {
      setTitleMessage("Внимание");
      setInfoMessage("Объем должен быть положительным числом");
      setIsMessageShow(true);
    } else {
      if (selectedProduct.name.trim().length > 0 && selectedProduct.category_id !== -1 && selectedProduct.price > 0) {
        if (selectedProduct.id === -1) {
          addProduct({
            product: {
              ...selectedProduct,
              description: description,
              full_description: fullDescription,
              delivery_info: deliveryInfo,
              volume: Number(volumeStr),
            },
          });
        } else {
          updateProduct({
            product: {
              ...selectedProduct,
              description: description,
              full_description: fullDescription,
              delivery_info: deliveryInfo,
              volume: Number(volumeStr),
            },
          });
        }
      } else {
        setTitleMessage("Внимание");
        setInfoMessage("Не все поля заполнены");
        setIsMessageShow(true);
      }
    }
  };

  const handleDeleteOnClick = (product: IProduct) => {
    setSelectedProduct(product);
    setIsConfirmShow(true);
  };

  const handleChangeInstruction = (event) => {
    try {
      const file = event.target.files[0];
      uploadProductInstruction({
        file: file,
        onUploadProgress: (data) => {
          setUploadInstructionProgress(Math.round(100 * (data.loaded / data.total!)));
        },
      });
      event.target.value = "";
    } catch (error) {
      console.warn(error);
    }
  };

  const handleInstructionOnClick = () => {
    if (selectedProduct.instruction_path === "") {
      inputInstructionRef.current!.click();
    } else {
      setSelectedProduct({ ...selectedProduct, instruction_path: "" });
    }
  };

  const handleChangeImage = (event) => {
    try {
      const file = event.target.files[0];
      uploadProductImage({
        file: file,
        onUploadProgress: (data) => {
          setUploadImageProgress(Math.round(100 * (data.loaded / data.total!)));
        },
      });
      event.target.value = "";
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.head}>
        <div className={pageStyles.title}>Товары</div>
        <button type="button" onClick={handleAddOnClick}>
          {viewType === 0 ? <PlusIcon /> : <ListIcon />}
        </button>
      </div>
      {Array.isArray(products) && products.length > 0 && viewType === 0 ? (
        <>
          <div className={pageStyles.input_container}>
            <input
              type="text"
              placeholder="Поиск по названию"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <SearchIcon />
            {searchValue.trim() !== "" ? (
              <div className={pageStyles.close} onClick={() => setSearchValue("")}>
                <CloseIcon />
              </div>
            ) : null}
          </div>
          <div className={pageStyles.table}>
            <div className={pageStyles.table_head}>
              <div className={`${pageStyles.part} ${pageStyles.image}`}>Изображение</div>
              <div className={`${pageStyles.part} ${pageStyles.category}`}>Категория</div>
              <div className={`${pageStyles.part} ${pageStyles.main}`}>Название</div>
              <div className={`${pageStyles.part} ${pageStyles.actions}`}>Действия</div>
            </div>
            <div className={pageStyles.table_list}>
              {filteredProducts.map((product: IProduct) => (
                <div className={pageStyles.table_item}>
                  <div className={`${pageStyles.part} ${pageStyles.image}`}>
                    {Array.isArray(product.images) &&
                    product.images !== undefined &&
                    product.images.length > 0 &&
                    product.images.filter((productImage: IProductImage) => productImage.is_main).length > 0 ? (
                      <img
                        src={`/uploads/${product.images.find((productImage: IProductImage) => productImage.is_main)!.path}`}
                        alt=""
                      />
                    ) : null}
                  </div>
                  <div className={`${pageStyles.part} ${pageStyles.category}`}>
                    {categories.find((category: ICategory) => category.id === product.category_id)!.category}
                  </div>
                  <div className={`${pageStyles.part} ${pageStyles.main}`}>{product.name}</div>
                  <div className={`${pageStyles.part} ${pageStyles.actions}`}>
                    <button type="button" onClick={() => handleEditOnClick(product)}>
                      <EditIcon />
                    </button>
                    <button type="button" className={appStyles.wrong} onClick={() => handleDeleteOnClick(product)}>
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}
      {viewType === 1 ? (
        <div className={pageStyles.content}>
          <div className={pageStyles.content_head}>
            <button type="button" onClick={handleBackOnClick}>
              <ArrowIcon />
            </button>
            <div className={pageStyles.content_title}>
              {selectedProduct.id === -1 ? "Добавление товара" : "Редактирование товара"}
            </div>
          </div>
          <form className={pageStyles.form} onSubmit={handleOnSubmit}>
            <div className={pageStyles.row}>
              <div className={pageStyles.fields}>
                <div className={pageStyles.input_field}>
                  <div className={pageStyles.label}>Название</div>
                  <input
                    className={selectedProduct.name.trim().length === 0 && isCheckFields ? pageStyles.wrong : ""}
                    type="text"
                    placeholder="Название"
                    value={selectedProduct.name}
                    onChange={(event) => setSelectedProduct({ ...selectedProduct, name: event.target.value })}
                    onClick={() => setActiveComponent(DropdownType.None)}
                  />
                </div>
                <div className={pageStyles.input_field}>
                  <div className={pageStyles.label}>Категория</div>
                  <Dropdown
                    activeComponent={activeComponent}
                    setActiveComponent={setActiveComponent}
                    dropdownType={DropdownType.CategorySelector}
                    items={[
                      {
                        id: -1,
                        text: "Не указана",
                        is_selected: selectedProduct.category_id === -1,
                      } as IDropdownItem,
                      ...(categories.map((category: ICategory) => {
                        return {
                          id: category.id,
                          text: category.category,
                          is_selected: selectedProduct.category_id === category.id,
                        } as IDropdownItem;
                      }) as IDropdownItem[]),
                    ]}
                    onItemSelect={(item: IDropdownItem) => {
                      setSelectedProduct({ ...selectedProduct, category_id: item.id });
                      setActiveComponent(DropdownType.None);
                    }}
                  />
                </div>
                <div className={pageStyles.input_field}>
                  <div className={pageStyles.label}>Цена, ₽</div>
                  <input
                    className={selectedProduct.price === 0 && isCheckFields ? pageStyles.wrong : ""}
                    type="text"
                    placeholder="Цена"
                    value={selectedProduct.price}
                    onChange={(event) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        price:
                          Number.isNaN(Number(event.target.value)) || Number(event.target.value) < 0
                            ? selectedProduct.price
                            : Number(event.target.value),
                      })
                    }
                    onClick={() => setActiveComponent(DropdownType.None)}
                  />
                </div>
                {selectedProduct.attributes.filter((attribute: IProductAttribute) => attribute.attribute_id === 0).length >
                0 ? (
                  <div className={pageStyles.input_field}>
                    <div className={pageStyles.label}>Производитель</div>
                    <Dropdown
                      activeComponent={activeComponent}
                      setActiveComponent={setActiveComponent}
                      dropdownType={DropdownType.ManufacturerSelector}
                      items={[
                        {
                          id: -1,
                          text: "Не указан",
                          is_selected: selectedProduct.manufacturer_id === -1,
                        } as IDropdownItem,
                        ...(manufacturers.map((manufacturer: IManufacturer) => {
                          return {
                            id: manufacturer.id,
                            text: manufacturer.manufacturer,
                            is_selected: selectedProduct.manufacturer_id === manufacturer.id,
                          } as IDropdownItem;
                        }) as IDropdownItem[]),
                      ]}
                      onItemSelect={(item: IDropdownItem) => {
                        setSelectedProduct({ ...selectedProduct, manufacturer_id: item.id });
                        setActiveComponent(DropdownType.None);
                      }}
                    />
                  </div>
                ) : null}
                {selectedProduct.attributes.filter((attribute: IProductAttribute) => attribute.attribute_id === 1).length >
                0 ? (
                  <div className={pageStyles.input_field}>
                    <div className={pageStyles.label}>Объем, м²</div>
                    <input
                      type="text"
                      placeholder="Объем"
                      value={volumeStr}
                      onChange={(event) => setVolumeStr(event.target.value)}
                      onClick={() => setActiveComponent(DropdownType.None)}
                    />
                  </div>
                ) : null}
                <div className={pageStyles.input_field}>
                  <label className={pageStyles.checkbox}>
                    <div className={pageStyles.text}>Рекомендованный</div>
                    <input type="checkbox" />
                    <span
                      className={`${pageStyles.checkbox_mark} ${selectedProduct.is_recomendated ? pageStyles.active : ""}`}
                      aria-hidden="true"
                      onClick={() =>
                        setSelectedProduct({ ...selectedProduct, is_recomendated: !selectedProduct.is_recomendated })
                      }
                    >
                      {selectedProduct.is_recomendated ? <CheckIcon /> : null}
                    </span>
                  </label>
                </div>
                {selectedProduct.attributes.filter((attribute: IProductAttribute) => attribute.attribute_id > 1).length >
                0 ? (
                  <>
                    <div className={pageStyles.text_field}>Аттрибуты товара</div>
                    {selectedProduct.attributes
                      .filter((attribute: IProductAttribute) => attribute.attribute_id > 1)
                      .map((productAttribute: IProductAttribute) => (
                        <div className={pageStyles.input_field}>
                          <div className={pageStyles.label}>
                            {
                              attributes.find((attribute: IAttribute) => attribute.id === productAttribute.attribute_id)
                                ?.attribute
                            }
                          </div>
                          <input
                            type="text"
                            placeholder={
                              attributes.find((attribute: IAttribute) => attribute.id === productAttribute.attribute_id)
                                ?.attribute
                            }
                            value={productAttribute.value}
                            onChange={(event) =>
                              setSelectedProduct({
                                ...selectedProduct,
                                attributes: selectedProduct.attributes.map((attributeTmp: IProductAttribute) => {
                                  if (attributeTmp.id === productAttribute.id) {
                                    return {
                                      ...attributeTmp,
                                      value: event.target.value,
                                    };
                                  } else return attributeTmp;
                                }),
                              })
                            }
                            onClick={() => setActiveComponent(DropdownType.None)}
                          />
                        </div>
                      ))}
                  </>
                ) : null}
                {categoryFilters.length > 0 ? (
                  <>
                    <div className={pageStyles.text_field}>Фильтры товара</div>
                    {categoryFilters.map((filter: IFilter) => (
                      <div className={pageStyles.input_field}>
                        <div className={pageStyles.label}>{filter.filter}</div>
                        <MultiDropdown
                          dropdownType={(filter.id + 1) * 2}
                          activeComponent={activeComponent}
                          setActiveComponent={setActiveComponent}
                          label={`Выбрано (${
                            selectedProduct.filters.filter(
                              (productFilter: IProductFilter) => productFilter.filter_id === filter.id
                            ).length
                          })`}
                          isFullWidth={true}
                          items={
                            filter.items.map((filterItem: IFilterItem) => {
                              return {
                                id: filterItem.id,
                                sub_id: filter.id,
                                text: filterItem.filter_item,
                                is_selected:
                                  selectedProduct.filters.filter(
                                    (productFilter: IProductFilter) => productFilter.filter_item_id === filterItem.id
                                  ).length > 0,
                              } as IDropdownItem;
                            }) as IDropdownItem[]
                          }
                          onItemSelect={(item: IDropdownItem) => {
                            if (
                              selectedProduct.filters.filter(
                                (productFilter: IProductFilter) => productFilter.filter_item_id === item.id
                              ).length > 0
                            ) {
                              setSelectedProduct({
                                ...selectedProduct,
                                filters: selectedProduct.filters.filter(
                                  (productFilter: IProductFilter) => productFilter.filter_item_id !== item.id
                                ),
                              });
                            } else {
                              setSelectedProduct({
                                ...selectedProduct,
                                filters: [
                                  ...selectedProduct.filters,
                                  {
                                    id:
                                      selectedProduct.filters.length === 0
                                        ? 0
                                        : selectedProduct.filters[selectedProduct.filters.length - 1].id + 1,
                                    filter_id: item.sub_id,
                                    filter_item_id: item.id,
                                    product_id: selectedProduct.id,
                                  } as IProductFilter,
                                ],
                              });
                            }
                          }}
                        />
                      </div>
                    ))}
                  </>
                ) : null}
                <div className={pageStyles.input_field} onClick={() => setActiveComponent(DropdownType.None)}>
                  <div className={pageStyles.label}>Краткое описание</div>
                  <ReactQuill
                    ref={quillRefDescription}
                    className={`${pageStyles.quill}`}
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                    modules={{ toolbar: toolbarOptions }}
                    onKeyUp={() => setDescription(`${quillRefDescription.current?.getEditorContents()}`)}
                  />
                </div>
                <div className={pageStyles.input_field} onClick={() => setActiveComponent(DropdownType.None)}>
                  <div className={pageStyles.label}>Полное описание</div>
                  <ReactQuill
                    ref={quillRefFullDescription}
                    className={`${pageStyles.quill}`}
                    theme="snow"
                    value={fullDescription}
                    onChange={setFullDescription}
                    modules={{ toolbar: toolbarOptions }}
                    onKeyUp={() => setFullDescription(`${quillRefFullDescription.current?.getEditorContents()}`)}
                  />
                </div>
                <div className={pageStyles.input_field} onClick={() => setActiveComponent(DropdownType.None)}>
                  <div className={pageStyles.label}>Доставка</div>
                  <ReactQuill
                    ref={quillRefDeliveryInfo}
                    className={`${pageStyles.quill}`}
                    theme="snow"
                    value={deliveryInfo}
                    onChange={setDeliveryInfo}
                    modules={{ toolbar: toolbarOptions }}
                    onKeyUp={() => setDeliveryInfo(`${quillRefDeliveryInfo.current?.getEditorContents()}`)}
                  />
                </div>
                <div className={pageStyles.file_field}>
                  <div className={pageStyles.label}>Инструкция</div>
                  <div className={pageStyles.value}>
                    {selectedProduct.instruction_path !== "" ? (
                      <a href={`/uploads/${selectedProduct.instruction_path}`} target="blank">
                        {selectedProduct.instruction_path.split("/")[2]}
                      </a>
                    ) : null}
                  </div>
                  <input ref={inputInstructionRef} type="file" onChange={handleChangeInstruction} hidden />
                  <button
                    type="button"
                    className={selectedProduct.instruction_path !== "" ? `${appStyles.wrong} ${pageStyles.delete}` : ""}
                    onClick={handleInstructionOnClick}
                    disabled={uploadInstructionProgress > -1}
                  >
                    {uploadInstructionProgress !== -1 ? (
                      `Загрузка...(${uploadInstructionProgress}%)`
                    ) : selectedProduct.instruction_path === "" ? (
                      "Загрузить"
                    ) : (
                      <DeleteIcon />
                    )}
                  </button>
                </div>
              </div>
              <div className={pageStyles.images_fields}>
                <div className={pageStyles.images_head}>
                  {`Изображения (${selectedProduct.images.length})`}
                  <input
                    ref={inputImageRef}
                    type="file"
                    onChange={handleChangeImage}
                    accept="image/png, image/jpeg"
                    hidden
                  />
                  <button type="button" onClick={() => inputImageRef.current!.click()} disabled={uploadImageProgress > -1}>
                    {uploadImageProgress === -1 ? "Выбрать изображение" : `Загрузка...(${uploadImageProgress}%)`}
                  </button>
                </div>
                {selectedProduct.images.length > 0 ? (
                  <div className={pageStyles.images_list}>
                    {selectedProduct.images.map((image: IProductImage) => (
                      <div className={`${pageStyles.image} ${image.is_main ? pageStyles.main : ""}`}>
                        <img src={`/uploads/${image.path}`} alt="" />
                        {image.is_main ? (
                          <div className={pageStyles.main_label}>Главная</div>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedProduct({
                                ...selectedProduct,
                                images: selectedProduct.images.map((tmpImage: IProductImage) => {
                                  return { ...tmpImage, is_main: tmpImage.id === image.id };
                                }),
                              })
                            }
                          >
                            Сделать главной
                          </button>
                        )}
                        <div
                          className={pageStyles.delete_button}
                          onClick={() =>
                            setSelectedProduct({
                              ...selectedProduct,
                              images: selectedProduct.images.filter((tmpImage: IProductImage) => tmpImage.id !== image.id),
                            })
                          }
                        >
                          <CloseIcon />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
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
        message="Вы действительно хотите удалить товар?"
        handleConfirmOnClick={() => deleteProduct({ product: selectedProduct })}
      />
    </div>
  );
};

export default Products;
