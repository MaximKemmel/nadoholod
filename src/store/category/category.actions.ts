import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

import { ICategory } from "../../types/category/category";

export const getCategories = createAsyncThunk("api/getCategories", async () => {
  const response = await axios.get("/api/categories");
  return response.data;
});

export const addCategory = createAsyncThunk("api/addCategory", async ({ category }: { category: ICategory }) => {
  return await axios
    .post("/api/add_category", {
      params: {
        category: category,
      },
    })
    .then((response) => response.data);
});

export const updateCategory = createAsyncThunk("api/updateCategory", async ({ category }: { category: ICategory }) => {
  return await axios
    .post("/api/update_category", {
      params: {
        category: category,
      },
    })
    .then((response) => response.data);
});

export const deleteCategory = createAsyncThunk("api/deleteCategory", async ({ category }: { category: ICategory }) => {
  return await axios
    .post("/api/delete_category", {
      params: {
        category: category,
      },
    })
    .then((response) => response.data);
});
