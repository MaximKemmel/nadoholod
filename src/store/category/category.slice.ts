import { createSlice } from "@reduxjs/toolkit";

import { getCategories } from "./category.actions";

import { ICategory } from "../../types/category/category";

interface ICategoryState {
  categories: ICategory[];
}

const initialState: ICategoryState = {
  categories: [] as ICategory[],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = [];
      state.categories = action.payload as ICategory[];
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.categories = [];
    });
  },
});

export const { actions, reducer } = categorySlice;
