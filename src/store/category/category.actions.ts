import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

export const getCategories = createAsyncThunk("api/getCategories", async () => {
  const response = await axios.get("/api/categories");
  return response.data;
});
