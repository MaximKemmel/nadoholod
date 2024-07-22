import { useEffect, useState } from "react";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSeletor";

import appStyles from "../../../../App.module.sass";
import pageStyles from "../../Admin.module.sass";

import MessageModal from "../../../../components/Modal/MessageModal";
import ConfirmModal from "../../../../components/Modal/ConfirmModal";

import { IFilter } from "../../../../types/filter/filter";
import { initFilter } from "../../../../types/filter/initFilter";
import { IFilterItem } from "../../../../types/filter/filterItem";
import { ServerStatusType } from "../../../../enums/serverStatusType";
import { initServerStatus } from "../../../../types/main/serverStatus";
import { ICategory } from "../../../../types/category/category";
import { ICategoryFilter } from "../../../../types/category/categoryFilter";

import { Plus as PlusIcon } from "../../../../assets/svg/Plus";
import { List as ListIcon } from "../../../../assets/svg/List";
import { Edit as EditIcon } from "../../../../assets/svg/Edit";
import { Delete as DeleteIcon } from "../../../../assets/svg/Delete";
import { Arrow as ArrowIcon } from "../../../../assets/svg/Arrow";

const Filters = () => {
  const {
    addFilter,
    setAddFilterStatus,
    updateFilter,
    setUpdateFilterStatus,
    deleteFilter,
    setDeleteFilterStatus,
    getFilters,
    updateFilterPosition,
    setUpdateFilterPositionStatus,
  } = useActions();
  const filters = useTypedSelector((state) => state.filterReducer.filters);
  const categories = useTypedSelector((state) => state.categoryReducer.categories);
  const addFilterStatus = useTypedSelector((state) => state.filterReducer.addFilterStatus);
  const updateFilterStatus = useTypedSelector((state) => state.filterReducer.updateFilterStatus);
  const deleteFilterStatus = useTypedSelector((state) => state.filterReducer.deleteFilterStatus);
  const updatePositionStatus = useTypedSelector((state) => state.filterReducer.updateFilterPositionStatus);
  const [selectedFilter, setSelectedFilter] = useState(initFilter());
  const [selectedFilterItem, setSelectedFilteritem] = useState({} as IFilterItem);
  const [viewType, setViewType] = useState(0);
  const [isCheckFields, setIsCheckFields] = useState(false);
  const [isMessageShow, setIsMessageShow] = useState(false);
  const [isConfirmShow, setIsConfirmShow] = useState(false);
  const [titleMessage, setTitleMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    if (addFilterStatus.status === ServerStatusType.Success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      getFilters();
      setTitleMessage("Успех!");
      setInfoMessage("Фильтр добавлен");
      setIsMessageShow(true);
      setSelectedFilter(initFilter());
      setViewType(0);
      setIsCheckFields(false);
      setAddFilterStatus(initServerStatus());
    }
    if (addFilterStatus.status === ServerStatusType.Error) {
      setTitleMessage("Ошибка");
      setInfoMessage("Ошибка при добавлении фильтра");
      setIsMessageShow(true);
      setAddFilterStatus(initServerStatus());
    }
  }, [addFilterStatus]);

  useEffect(() => {
    if (updateFilterStatus.status === ServerStatusType.Success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      getFilters();
      setTitleMessage("Успех!");
      setInfoMessage("Фильтр обновлен");
      setIsMessageShow(true);
      setSelectedFilter(initFilter());
      setViewType(0);
      setIsCheckFields(false);
      setUpdateFilterStatus(initServerStatus());
    }
    if (updateFilterStatus.status === ServerStatusType.Error) {
      setTitleMessage("Ошибка");
      setInfoMessage("Ошибка при обновлении фильтра");
      setIsMessageShow(true);
      setUpdateFilterStatus(initServerStatus());
    }
  }, [updateFilterStatus]);

  useEffect(() => {
    setIsConfirmShow(false);
    if (deleteFilterStatus.status === ServerStatusType.Success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      getFilters();
      setTitleMessage("Успех!");
      setInfoMessage("Фильтр удален");
      setIsMessageShow(true);
      setSelectedFilter(initFilter());
      setDeleteFilterStatus(initServerStatus());
    }
    if (deleteFilterStatus.status === ServerStatusType.Error) {
      setTitleMessage("Ошибка");
      setInfoMessage("Ошибка при удалении фильтра");
      setIsMessageShow(true);
      setDeleteFilterStatus(initServerStatus());
    }
  }, [deleteFilterStatus]);

  useEffect(() => {
    switch (updatePositionStatus.status) {
      case ServerStatusType.Success:
        getFilters();
        setUpdateFilterPositionStatus(initServerStatus());
        break;
      case ServerStatusType.Error:
        setTitleMessage("Ошибка");
        setInfoMessage("При обновлении позиции возникла ошибка<br>Попробуйте снова");
        setIsMessageShow(true);
        setUpdateFilterPositionStatus(initServerStatus());
        break;
    }
  }, [updatePositionStatus]);

  const handleAddOnClick = () => {
    setSelectedFilter({
      ...initFilter(),
      position: filters.length === 0 ? 0 : Math.max(...filters.map((tmpFilter: IFilter) => tmpFilter.position)) + 1,
    });
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
    }
    if (
      selectedFilter.filter.trim().length > 0 &&
      selectedFilter.items.length > 0 &&
      selectedFilter.items.filter((filterItem: IFilterItem) => filterItem.filter_item.trim().length === 0).length === 0
    ) {
      if (selectedFilter.id === -1) {
        addFilter({ filter: selectedFilter });
      } else {
        updateFilter({ filter: selectedFilter });
      }
    } else {
      setTitleMessage("Внимание");
      setInfoMessage("Не все поля заполнены");
      setIsMessageShow(true);
    }
  };

  const handleDeleteOnClick = (filter: IFilter) => {
    if (
      categories.length > 0 &&
      categories.filter(
        (category: ICategory) =>
          category.filters.filter((categoryFilter: ICategoryFilter) => categoryFilter.filter_id === filter.id).length > 0
      ).length > 0
    ) {
      setTitleMessage("Внимание");
      setInfoMessage("Перед удалением фильтра необходимо отвязать его от категорий");
      setIsMessageShow(true);
    } else {
      setSelectedFilter(filter);
      setIsConfirmShow(true);
    }
  };

  const handleDeleteOnConfirm = () => {
    deleteFilter({ filter: selectedFilter });
    setIsConfirmShow(false);
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

  const handleUpdatePositionUp = (filter: IFilter) => {
    var oldPosition = filter.position;
    var newPosition = filters
      .filter((tmpfilter: IFilter) => tmpfilter.position > oldPosition)
      .sort((filterOne: IFilter, filterTwo: IFilter) => {
        if (filterOne.position < filterTwo.position) return -1;
        if (filterOne.position > filterTwo.position) return 1;
        return 0;
      })[0].position;
    updateFilterPosition({
      filter: { ...filter, position: newPosition },
      oldPosition: oldPosition,
    });
  };

  const handleUpdatePositionDown = (filter: IFilter) => {
    var oldPosition = filter.position;
    var newPosition = filters
      .filter((tmpfilter: IFilter) => tmpfilter.position < oldPosition)
      .sort((filterOne: IFilter, filterTwo: IFilter) => {
        if (filterOne.position > filterTwo.position) return -1;
        if (filterOne.position < filterTwo.position) return 1;
        return 0;
      })[0].position;
    updateFilterPosition({
      filter: { ...filter, position: newPosition },
      oldPosition: oldPosition,
    });
  };

  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.head}>
        <div className={pageStyles.title}>Фильтры</div>
        <button type="button" onClick={handleAddOnClick}>
          {viewType === 0 ? <PlusIcon /> : <ListIcon />}
        </button>
      </div>
      {Array.isArray(filters) && filters.filter((filter: IFilter) => !filter.is_main).length > 0 && viewType === 0 ? (
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
                  {!filter.is_main ? (
                    <>
                      <button type="button" onClick={() => handleEditOnClick(filter)}>
                        <EditIcon />
                      </button>
                      <button type="button" className={appStyles.wrong} onClick={() => handleDeleteOnClick(filter)}>
                        <DeleteIcon />
                      </button>
                    </>
                  ) : null}
                  {filter.position !== Math.max(...filters.map((tmpFilter: IFilter) => tmpFilter.position)) ? (
                    <button
                      type="button"
                      className={pageStyles.button_up}
                      title="Поднять вверх"
                      onClick={() => handleUpdatePositionUp(filter)}
                    >
                      <ArrowIcon />
                    </button>
                  ) : (
                    <div className={pageStyles.empty_button} />
                  )}
                  {filter.position !== Math.min(...filters.map((tmpFilter: IFilter) => tmpFilter.position)) ? (
                    <button
                      type="button"
                      className={pageStyles.button_down}
                      title="Опустить вниз"
                      onClick={() => handleUpdatePositionDown(filter)}
                    >
                      <ArrowIcon />
                    </button>
                  ) : (
                    <div className={pageStyles.empty_button} />
                  )}
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
                <div className={pageStyles.text_field}>
                  Значения фильтра
                  <button className={pageStyles.add_button} type="button" onClick={handleAddItemOnClick}>
                    <PlusIcon />
                  </button>
                </div>
                {selectedFilter.items.map((filterItem: IFilterItem) => (
                  <div className={pageStyles.input_field}>
                    <div className={pageStyles.label}>Значение</div>
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
      <MessageModal isShow={isMessageShow} setIsShow={setIsMessageShow} title={titleMessage} message={infoMessage} />
      <ConfirmModal
        isShow={isConfirmShow}
        setIsShow={setIsConfirmShow}
        title="Подтвердите удаление"
        message="Вы действительно хотите элемент?"
        handleConfirmOnClick={viewType === 0 ? handleDeleteOnConfirm : handleDeleteItemOnConfirm}
      />
    </div>
  );
};

export default Filters;
