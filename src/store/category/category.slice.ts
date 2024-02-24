import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { addCategory, deleteCategory, getCategories, updateCategory } from "./category.actions";

import { ICategory } from "../../types/category/category";
import { IServerStatus, initServerStatus } from "../../types/main/serverStatus";
import { ServerStatusType } from "../../enums/serverStatusType";

interface ICategoryState {
  categories: ICategory[];
  addCategoryStatus: IServerStatus;
  updateCategoryStatus: IServerStatus;
  deleteCategoryStatus: IServerStatus;
}

const initialState: ICategoryState = {
  categories: [] as ICategory[],
  addCategoryStatus: initServerStatus(),
  updateCategoryStatus: initServerStatus(),
  deleteCategoryStatus: initServerStatus(),
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setAddCategoryStatus(state, action: PayloadAction<IServerStatus>) {
      state.addCategoryStatus = action.payload;
    },
    setUpdateCategoryStatus(state, action: PayloadAction<IServerStatus>) {
      state.updateCategoryStatus = action.payload;
    },
    setDeleteCategoryStatus(state, action: PayloadAction<IServerStatus>) {
      state.deleteCategoryStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = [];
      state.categories = action.payload as ICategory[];
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.categories = [];
    });

    builder.addCase(addCategory.pending, (state) => {
      state.addCategoryStatus = {
        status: ServerStatusType.InProgress,
        error: "",
      } as IServerStatus;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.addCategoryStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.message,
      };
    });
    builder.addCase(addCategory.rejected, (state) => {
      state.addCategoryStatus = {
        status: ServerStatusType.Error,
        error: "",
      } as IServerStatus;
    });

    builder.addCase(updateCategory.pending, (state) => {
      state.updateCategoryStatus = {
        status: ServerStatusType.InProgress,
        error: "",
      } as IServerStatus;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.updateCategoryStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.message,
      };
    });
    builder.addCase(updateCategory.rejected, (state) => {
      state.updateCategoryStatus = {
        status: ServerStatusType.Error,
        error: "",
      } as IServerStatus;
    });

    builder.addCase(deleteCategory.pending, (state) => {
      state.deleteCategoryStatus = {
        status: ServerStatusType.InProgress,
        error: "",
      } as IServerStatus;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.deleteCategoryStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.message,
      };
    });
    builder.addCase(deleteCategory.rejected, (state) => {
      state.deleteCategoryStatus = {
        status: ServerStatusType.Error,
        error: "",
      } as IServerStatus;
    });
  },
});

export const { actions, reducer } = categorySlice;
