import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

export const getAttributes = createAsyncThunk("api/getAttributes", async () => {
  const response = await axios.get("/api/attributes");
  return response.data;
});
