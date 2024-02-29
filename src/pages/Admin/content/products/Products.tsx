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
import { ICategoryAttribute } from "../../../../types/category/categoryAttribute";
import { IManufacturer } from "../../../../types/manufacturer/manufacturer";

import { Plus as PlusIcon } from "../../../../assets/svg/Plus";
import { List as ListIcon } from "../../../../assets/svg/List";
import { Edit as EditIcon } from "../../../../assets/svg/Edit";
import { Delete as DeleteIcon } from "../../../../assets/svg/Delete";
import { Arrow as ArrowIcon } from "../../../../assets/svg/Arrow";

const Products = () => {
  const {
    addProduct,
    setAddProductStatus,
    updateProduct,
    setUpdateProductStatus,
    deleteProduct,
    setDeleteProductStatus,
    getProducts,
  } = useActions();
  const products = useTypedSelector((state) => state.productReducer.products);
  const categories = useTypedSelector((state) => state.categoryReducer.categories);
  const attributes = useTypedSelector((state) => state.attributeReducer.attributes);
  const manufacturers = useTypedSelector((state) => state.manufacturerReducer.manufacturers);
  const addProductStatus = useTypedSelector((state) => state.productReducer.addProductStatus);
  const updateProductStatus = useTypedSelector((state) => state.productReducer.updateProductStatus);
  const deleteProductStatus = useTypedSelector((state) => state.productReducer.deleteProductStatus);
  const [selectedProduct, setSelectedProduct] = useState(initProduct());
  const [description, setDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState("");
  const [viewType, setViewType] = useState(0);
  const [isCheckFields, setIsCheckFields] = useState(false);
  const quillRefDescription = useRef<ReactQuill>(null);
  const quillRefFullDescription = useRef<ReactQuill>(null);
  const quillRefDeliveryInfo = useRef<ReactQuill>(null);
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
    if (selectedProduct.category_id === -1) {
      setSelectedProduct({ ...selectedProduct, attributes: [] as IProductAttribute[] });
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
              value: "",
            } as IProductAttribute);
          }
        });
        setSelectedProduct({ ...selectedProduct, attributes: tmpProductAttributes });
      }
    }
  }, [selectedProduct.category_id, attributes]);

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

  const handleAddOnClick = () => {
    setSelectedProduct(initProduct());
    setDescription("");
    setFullDescription("");
    setDeliveryInfo("");
    setActiveComponent(DropdownType.None);
    setIsCheckFields(false);
    setViewType(viewType === 0 ? 1 : 0);
  };

  const handleEditOnClick = (product: IProduct) => {
    setSelectedProduct(product);
    setDescription(product.description);
    setFullDescription(product.full_description);
    setDeliveryInfo(product.delivery_info);
    setActiveComponent(DropdownType.None);
    setIsCheckFields(false);
    setViewType(1);
  };

  const handleBackOnClick = () => {
    setSelectedProduct(initProduct());
    setDescription("");
    setFullDescription("");
    setDeliveryInfo("");
    setActiveComponent(DropdownType.None);
    setIsCheckFields(false);
    setViewType(0);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (!isCheckFields) {
      setIsCheckFields(true);
    }
    if (selectedProduct.name.trim().length > 0 && selectedProduct.category_id !== -1 && selectedProduct.price > 0) {
      if (selectedProduct.id === -1) {
        addProduct({
          product: {
            ...selectedProduct,
            description: description,
            full_description: fullDescription,
            delivery_info: deliveryInfo,
          },
        });
      } else {
        updateProduct({
          product: {
            ...selectedProduct,
            description: description,
            full_description: fullDescription,
            delivery_info: deliveryInfo,
          },
        });
      }
    } else {
      setTitleMessage("Внимание");
      setInfoMessage("Не все поля заполнены");
      setIsMessageShow(true);
    }
  };

  const handleDeleteOnClick = (product: IProduct) => {
    setSelectedProduct(product);
    setIsConfirmShow(true);
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
        <div className={pageStyles.table}>
          <div className={pageStyles.table_head}>
            <div className={`${pageStyles.part} ${pageStyles.image}`}>Изображение</div>
            <div className={`${pageStyles.part} ${pageStyles.category}`}>Категория</div>
            <div className={`${pageStyles.part} ${pageStyles.main}`}>Название</div>
            <div className={`${pageStyles.part} ${pageStyles.actions}`}>Действия</div>
          </div>
          <div className={pageStyles.table_list}>
            {products.map((product: IProduct) => (
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
                    className={selectedProduct.name.trim().length === 0 && isCheckFields ? pageStyles.wrong : ""}
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
                {selectedProduct.attributes.length > 0 ? (
                  <>
                    <div className={pageStyles.text_field}>Аттрибуты товара</div>
                    {selectedProduct.attributes.map((productAttribute: IProductAttribute) => (
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
                                    vaue: event.target.value,
                                  };
                                } else return attributeTmp;
                              }),
                            })
                          }
                          onClick={() => setActiveComponent(DropdownType.None)}
                        />
                      </div>
                    ))}
                    <div className={pageStyles.text_field} />
                  </>
                ) : null}
                {selectedProduct.attributes.length > 0 ? (
                  <>
                    <div className={pageStyles.text_field}>Фильтры товара</div>
                    {selectedProduct.attributes.map((productAttribute: IProductAttribute) => (
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
                                    vaue: event.target.value,
                                  };
                                } else return attributeTmp;
                              }),
                            })
                          }
                          onClick={() => setActiveComponent(DropdownType.None)}
                        />
                      </div>
                    ))}
                    <div className={pageStyles.text_field} />
                  </>
                ) : null}
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
