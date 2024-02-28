import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

import { IFilter } from "../../types/filter/filter";

export const getFilters = createAsyncThunk("api/getFilters", async () => {
  const response = await axios.get("/api/filters");
  return response.data;
});

export const addFilter = createAsyncThunk("api/addFilter", async ({ filter }: { filter: IFilter }) => {
  return await axios
    .post("/api/add_filter", {
      params: {
        filter: filter,
      },
    })
    .then((response) => response.data);
});

export const updateFilter = createAsyncThunk("api/updateFilter", async ({ filter }: { filter: IFilter }) => {
  return await axios
    .post("/api/update_filter", {
      params: {
        filter: filter,
      },
    })
    .then((response) => response.data);
});

export const deleteFilter = createAsyncThunk("api/deleteFilter", async ({ filter }: { filter: IFilter }) => {
  return await axios
    .post("/api/delete_filter", {
      params: {
        filter: filter,
      },
    })
    .then((response) => response.data);
});
