import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

export const getFilters = createAsyncThunk("api/getFilters", async () => {
  const response = await axios.get("/api/filters");
  return response.data;
});
