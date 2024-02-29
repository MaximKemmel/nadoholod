import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

export const getManufacturers = createAsyncThunk("api/getManufacturers", async () => {
  const response = await axios.get("/api/manufacturers");
  return response.data;
});
