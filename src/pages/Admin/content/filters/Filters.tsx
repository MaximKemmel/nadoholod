import { useState } from "react";

import { useTypedSelector } from "../../../../hooks/useTypedSeletor";

import appStyles from "../../../../App.module.sass";
import pageStyles from "../../Admin.module.sass";

import { IFilter } from "../../../../types/filter/filter";
import { initFilter } from "../../../../types/filter/initFilter";
import { IFilterItem } from "../../../../types/filter/filterItem";

import { Plus as PlusIcon } from "../../../../assets/svg/Plus";
import { List as ListIcon } from "../../../../assets/svg/List";
import { Edit as EditIcon } from "../../../../assets/svg/Edit";
import { Delete as DeleteIcon } from "../../../../assets/svg/Delete";
import { Arrow as ArrowIcon } from "../../../../assets/svg/Arrow";

const Filters = () => {
  const filters = useTypedSelector((state) => state.filterReducer.filters);
  const [selectedFilter, setSelectedFilter] = useState(initFilter());
  const [selectedFilterItem, setSelectedFilteritem] = useState({} as IFilterItem);
  const [viewType, setViewType] = useState(0);
  const [isCheckFields, setIsCheckFields] = useState(false);
  const [isConfirmShow, setIsConfirmShow] = useState(false);

  const handleAddOnClick = () => {
    setSelectedFilter(initFilter());
    setIsCheckFields(false);
    setViewType(viewType === 0 ? 1 : 0);
  };

  const handleEditOnClick = (filter: IFilter) => {
    setSelectedFilter(filter);
    setIsCheckFields(false);
    setViewType(1);
  };

  const handleBackOnClick = () => {
    setSelectedFilter(initFilter());
    setIsCheckFields(false);
    setViewType(0);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (!isCheckFields) {
      setIsCheckFields(true);
      console.log(isConfirmShow);
    }
  };

  const handleDeleteOnClick = (filter: IFilter) => {
    setSelectedFilter(filter);
    setIsConfirmShow(true);
  };

  const handleAddItemOnClick = () => {
    setSelectedFilter({
      ...selectedFilter,
      items: [
        ...selectedFilter.items,
        {
          id: selectedFilter.items.length === 0 ? 0 : selectedFilter.items[selectedFilter.items.length - 1].id + 1,
          filter_id: selectedFilter.id,
          filter_item: "",
        } as IFilterItem,
      ],
    });
  };

  const handleDeleteItemOnClick = (filterItem: IFilterItem) => {
    setSelectedFilteritem(filterItem);
    handleDeleteItemOnConfirm();
    setIsConfirmShow(true);
  };

  const handleDeleteItemOnConfirm = () => {
    setSelectedFilter({
      ...selectedFilter,
      items: selectedFilter.items.filter((filterItem: IFilterItem) => filterItem.id !== selectedFilterItem.id),
    });
    setIsConfirmShow(false);
  };

  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.head}>
        <div className={pageStyles.title}>Фильтры</div>
        <button type="button" onClick={handleAddOnClick}>
          {viewType === 0 ? <PlusIcon /> : <ListIcon />}
        </button>
      </div>
      {Array.isArray(filters) && filters.length > 0 && viewType === 0 ? (
        <div className={pageStyles.table}>
          <div className={pageStyles.table_head}>
            <div className={`${pageStyles.part} ${pageStyles.main}`}>Фильтр</div>
            <div className={`${pageStyles.part} ${pageStyles.actions}`}>Действия</div>
          </div>
          <div className={pageStyles.table_list}>
            {filters.map((filter: IFilter) => (
              <div className={pageStyles.table_item}>
                <div className={`${pageStyles.part} ${pageStyles.main}`}>{filter.filter}</div>
                <div className={`${pageStyles.part} ${pageStyles.actions}`}>
                  <button type="button" onClick={() => handleEditOnClick(filter)}>
                    <EditIcon />
                  </button>
                  <button type="button" className={appStyles.wrong} onClick={() => handleDeleteOnClick(filter)}>
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
              {selectedFilter.id === -1 ? "Добавление фильтра" : "Редактирование фильтра"}
            </div>
          </div>
          <form className={`${pageStyles.form} ${pageStyles.secondary_form}`} onSubmit={handleOnSubmit}>
            <div className={pageStyles.row}>
              <div className={pageStyles.fields}>
                <div className={pageStyles.input_field}>
                  <div className={pageStyles.label}>Название</div>
                  <input
                    className={selectedFilter.filter.trim().length === 0 && isCheckFields ? pageStyles.wrong : ""}
                    type="text"
                    placeholder="Название"
                    value={selectedFilter.filter}
                    onChange={(event) => setSelectedFilter({ ...selectedFilter, filter: event.target.value })}
                  />
                </div>
                <div className={pageStyles.input_field}>
                  Значения фильтров
                  <button className={pageStyles.add_button} type="button" onClick={handleAddItemOnClick}>
                    <PlusIcon />
                  </button>
                </div>
                {selectedFilter.items.map((filterItem: IFilterItem) => (
                  <div className={pageStyles.input_field}>
                    <div className={pageStyles.label}>Аттрибут</div>
                    <input
                      className={filterItem.filter_item.trim().length === 0 && isCheckFields ? pageStyles.wrong : ""}
                      type="text"
                      placeholder="Значение"
                      value={filterItem.filter_item}
                      onChange={(event) =>
                        setSelectedFilter({
                          ...selectedFilter,
                          items: selectedFilter.items.map((itemTmp: IFilterItem) => {
                            if (itemTmp.id === filterItem.id) {
                              return {
                                ...itemTmp,
                                filter_item: event.target.value,
                              };
                            } else return itemTmp;
                          }),
                        })
                      }
                    />
                    <button type="button" className={appStyles.wrong} onClick={() => handleDeleteItemOnClick(filterItem)}>
                      <DeleteIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button type="submit">Сохранить</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Filters;
