import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

import { IProduct } from "../../types/product/product";

export const getProducts = createAsyncThunk("api/getProducts", async () => {
  const response = await axios.get("/api/products");
  return response.data;
});

export const addProduct = createAsyncThunk("api/addProduct", async ({ product }: { product: IProduct }) => {
  return await axios
    .post("/api/add_product", {
      params: {
        product: product,
      },
    })
    .then((response) => response.data);
});

export const updateProduct = createAsyncThunk("api/updateProduct", async ({ product }: { product: IProduct }) => {
  return await axios
    .post("/api/update_product", {
      params: {
        product: product,
      },
    })
    .then((response) => response.data);
});

export const deleteProduct = createAsyncThunk("api/deleteProduct", async ({ product }: { product: IProduct }) => {
  return await axios
    .post("/api/delete_product", {
      params: {
        product: product,
      },
    })
    .then((response) => response.data);
});
