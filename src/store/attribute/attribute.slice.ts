import { createSlice } from "@reduxjs/toolkit";

import { getAttributes } from "./attribute.actions";

import { IAttribute } from "../../types/attribute/attribute";

interface IAttributeState {
  attributes: IAttribute[];
}

const initialState: IAttributeState = {
  attributes: [] as IAttribute[],
};

export const attributeSlice = createSlice({
  name: "attribute",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAttributes.fulfilled, (state, action) => {
      state.attributes = [];
      state.attributes = action.payload as IAttribute[];
    });
    builder.addCase(getAttributes.rejected, (state) => {
      state.attributes = [];
    });
  },
});

export const { actions, reducer } = attributeSlice;
