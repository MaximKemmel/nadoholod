import { createSlice } from "@reduxjs/toolkit";

import { getManufacturers } from "./manufacturer.actions";

import { IManufacturer } from "../../types/manufacturer/manufacturer";

interface IManufacturerState {
  manufacturers: IManufacturer[];
}

const initialState: IManufacturerState = {
  manufacturers: [] as IManufacturer[],
};

export const manufacturerSlice = createSlice({
  name: "manufacturer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getManufacturers.fulfilled, (state, action) => {
      state.manufacturers = [];
      state.manufacturers = action.payload as IManufacturer[];
    });
    builder.addCase(getManufacturers.rejected, (state) => {
      state.manufacturers = [];
    });
  },
});

export const { actions, reducer } = manufacturerSlice;
