import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

export const login = createAsyncThunk("api/login", async ({ login, password }: { login: string; password: string }) => {
  return await axios
    .post("/api/login", {
      params: {
        login: login,
        password: password,
      },
    })
    .then((response) => response.data);
});

export const authMe = createAsyncThunk("api/authMe", async () => {
  const response = await axios.get("/api/authme");
  return response.data;
});
