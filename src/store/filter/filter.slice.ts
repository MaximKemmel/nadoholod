import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { addFilter, deleteFilter, updateFilter, getFilters } from "./filter.actions";

import { IFilter } from "../../types/filter/filter";
import { IServerStatus, initServerStatus } from "../../types/main/serverStatus";
import { ServerStatusType } from "../../enums/serverStatusType";

interface IFilterState {
  filters: IFilter[];
  addFilterStatus: IServerStatus;
  updateFilterStatus: IServerStatus;
  deleteFilterStatus: IServerStatus;
}

const initialState: IFilterState = {
  filters: [] as IFilter[],
  addFilterStatus: initServerStatus(),
  updateFilterStatus: initServerStatus(),
  deleteFilterStatus: initServerStatus(),
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setAddFilterStatus(state, action: PayloadAction<IServerStatus>) {
      state.addFilterStatus = action.payload;
    },
    setUpdateFilterStatus(state, action: PayloadAction<IServerStatus>) {
      state.updateFilterStatus = action.payload;
    },
    setDeleteFilterStatus(state, action: PayloadAction<IServerStatus>) {
      state.deleteFilterStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFilters.fulfilled, (state, action) => {
      state.filters = [];
      state.filters = action.payload as IFilter[];
    });
    builder.addCase(getFilters.rejected, (state) => {
      state.filters = [];
    });

    builder.addCase(addFilter.pending, (state) => {
      state.addFilterStatus = {
        status: ServerStatusType.InProgress,
        error: "",
      } as IServerStatus;
    });
    builder.addCase(addFilter.fulfilled, (state, action) => {
      state.addFilterStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.message,
      };
    });
    builder.addCase(addFilter.rejected, (state) => {
      state.addFilterStatus = {
        status: ServerStatusType.Error,
        error: "",
      } as IServerStatus;
    });

    builder.addCase(updateFilter.pending, (state) => {
      state.updateFilterStatus = {
        status: ServerStatusType.InProgress,
        error: "",
      } as IServerStatus;
    });
    builder.addCase(updateFilter.fulfilled, (state, action) => {
      state.updateFilterStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.message,
      };
    });
    builder.addCase(updateFilter.rejected, (state) => {
      state.updateFilterStatus = {
        status: ServerStatusType.Error,
        error: "",
      } as IServerStatus;
    });

    builder.addCase(deleteFilter.pending, (state) => {
      state.deleteFilterStatus = {
        status: ServerStatusType.InProgress,
        error: "",
      } as IServerStatus;
    });
    builder.addCase(deleteFilter.fulfilled, (state, action) => {
      state.deleteFilterStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.message,
      };
    });
    builder.addCase(deleteFilter.rejected, (state) => {
      state.deleteFilterStatus = {
        status: ServerStatusType.Error,
        error: "",
      } as IServerStatus;
    });
  },
});

export const { actions, reducer } = filterSlice;
