import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { getFilters } from "./filter.actions";

import { IFilter } from "../../types/filter/filter";
import { IServerStatus, initServerStatus } from "../../types/main/serverStatus";

interface IFilterState {
  filters: IFilter[];
  addFiltersStatus: IServerStatus;
}

const initialState: IFilterState = {
  filters: [] as IFilter[],
  addFiltersStatus: initServerStatus(),
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setAddFiltersStatus(state, action: PayloadAction<IServerStatus>) {
      state.addFiltersStatus = action.payload;
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
  },
});

export const { actions, reducer } = filterSlice;
