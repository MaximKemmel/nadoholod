import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { addProduct, deleteProduct, getProducts, updateProduct } from "./product.actions";

import { IProduct } from "../../types/product/product";
import { IServerStatus, initServerStatus } from "../../types/main/serverStatus";
import { ServerStatusType } from "../../enums/serverStatusType";

interface IProductState {
  products: IProduct[];
  addProductStatus: IServerStatus;
  updateProductStatus: IServerStatus;
  deleteProductStatus: IServerStatus;
}

const initialState: IProductState = {
  products: [] as IProduct[],
  addProductStatus: initServerStatus(),
  updateProductStatus: initServerStatus(),
  deleteProductStatus: initServerStatus(),
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAddProductStatus(state, action: PayloadAction<IServerStatus>) {
      state.addProductStatus = action.payload;
    },
    setUpdateProductStatus(state, action: PayloadAction<IServerStatus>) {
      state.updateProductStatus = action.payload;
    },
    setDeleteProductStatus(state, action: PayloadAction<IServerStatus>) {
      state.deleteProductStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = [];
      state.products = action.payload as IProduct[];
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.products = [];
    });

    builder.addCase(addProduct.pending, (state) => {
      state.addProductStatus = {
        status: ServerStatusType.InProgress,
        error: "",
      } as IServerStatus;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.addProductStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.message,
      };
    });
    builder.addCase(addProduct.rejected, (state) => {
      state.addProductStatus = {
        status: ServerStatusType.Error,
        error: "",
      } as IServerStatus;
    });

    builder.addCase(updateProduct.pending, (state) => {
      state.updateProductStatus = {
        status: ServerStatusType.InProgress,
        error: "",
      } as IServerStatus;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.updateProductStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.message,
      };
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.updateProductStatus = {
        status: ServerStatusType.Error,
        error: "",
      } as IServerStatus;
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.deleteProductStatus = {
        status: ServerStatusType.InProgress,
        error: "",
      } as IServerStatus;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.deleteProductStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.message,
      };
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.deleteProductStatus = {
        status: ServerStatusType.Error,
        error: "",
      } as IServerStatus;
    });
  },
});

export const { actions, reducer } = productSlice;
