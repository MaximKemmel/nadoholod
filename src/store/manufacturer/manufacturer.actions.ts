import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

import { IManufacturer } from "../../types/manufacturer/manufacturer";

export const getManufacturers = createAsyncThunk("api/getManufacturers", async () => {
  const response = await axios.get("/api/manufacturers");
  return response.data;
});

export const addManufacturer = createAsyncThunk(
  "api/addManufacturer",
  async ({ manufacturer }: { manufacturer: IManufacturer }) => {
    return await axios
      .post("/api/add_manufacturer", {
        params: {
          manufacturer: manufacturer,
        },
      })
      .then((response) => response.data);
  }
);

export const updateManufacturer = createAsyncThunk(
  "api/updateManufacturer",
  async ({ manufacturer }: { manufacturer: IManufacturer }) => {
    return await axios
      .post("/api/update_manufacturer", {
        params: {
          manufacturer: manufacturer,
        },
      })
      .then((response) => response.data);
  }
);

export const deleteManufacturer = createAsyncThunk(
  "api/deleteManufacturer",
  async ({ manufacturer }: { manufacturer: IManufacturer }) => {
    return await axios
      .post("/api/delete_manufacturer", {
        params: {
          manufacturer: manufacturer,
        },
      })
      .then((response) => response.data);
  }
);
