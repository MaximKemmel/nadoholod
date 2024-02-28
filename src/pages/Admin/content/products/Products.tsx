import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "../../../../quill.css";

import { useTypedSelector } from "../../../../hooks/useTypedSeletor";

import appStyles from "../../../../App.module.sass";
import pageStyles from "../../Admin.module.sass";

import Dropdown from "../../../../components/Dropdown/Dropdown";

import { IProduct } from "../../../../types/product/product";
import { initProduct } from "../../../../types/product/initProduct";
import { IProductImage } from "../../../../types/product/productImage";
import { ICategory } from "../../../../types/category/category";
import { IDropdownItem } from "../../../../types/main/dropdownItem";
import { DropdownType } from "../../../../enums/dropdownType";
import { IAttribute } from "../../../../types/attribute/attribute";
import { IProductAttribute } from "../../../../types/product/productAttribute";

import { Plus as PlusIcon } from "../../../../assets/svg/Plus";
import { List as ListIcon } from "../../../../assets/svg/List";
import { Edit as EditIcon } from "../../../../assets/svg/Edit";
import { Delete as DeleteIcon } from "../../../../assets/svg/Delete";
import { Arrow as ArrowIcon } from "../../../../assets/svg/Arrow";
import { ICategoryAttribute } from "src/types/category/categoryAttribute";

const Products = () => {
  const products = useTypedSelector((state) => state.productReducer.products);
  const categories = useTypedSelector((state) => state.categoryReducer.categories);
  const attributes = useTypedSelector((state) => state.attributeReducer.attributes);
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
  const [isConfirmShow, setIsConfirmShow] = useState(false);

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

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["clean"],
  ];

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
  };

  const handleDeleteOnClick = (product: IProduct) => {
    setSelectedProduct(product);
    setIsConfirmShow(true);
    console.log(isConfirmShow);
    console.log(selectedProduct);
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
                <div className={pageStyles.input_field} onClick={() => setActiveComponent(DropdownType.None)}>
                  <div className={pageStyles.label}>Полное описание</div>
                  <ReactQuill
                    ref={quillRefFullDescription}
                    className={`${pageStyles.quill} ${
                      fullDescription.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").length === 0 &&
                      isCheckFields
                        ? pageStyles.wrong
                        : ""
                    }`}
                    theme="snow"
                    value={fullDescription}
                    onChange={setFullDescription}
                    modules={{ toolbar: toolbarOptions }}
                    onKeyUp={() => setFullDescription(`${quillRefFullDescription.current?.getEditorContents()}`)}
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
                  </>
                ) : null}
                <div className={pageStyles.input_field} onClick={() => setActiveComponent(DropdownType.None)}>
                  <div className={pageStyles.label}>Доставка</div>
                  <ReactQuill
                    ref={quillRefDeliveryInfo}
                    className={`${pageStyles.quill} ${
                      deliveryInfo.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").length === 0 &&
                      isCheckFields
                        ? pageStyles.wrong
                        : ""
                    }`}
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
    </div>
  );
};

export default Products;
