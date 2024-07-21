import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

import { ISecondaryInfo } from "../../types/secondaryInfo/secondaryInfo";

export const getSecondaryInfo = createAsyncThunk("api/getSecondaryInfo", async () => {
  const response = await axios.get("/api/secondary_info");
  return response.data;
});

export const updateSecondaryInfo = createAsyncThunk(
  "api/updateSecondaryInfo",
  async ({ secondaryInfo }: { secondaryInfo: ISecondaryInfo }) => {
    return await axios
      .post("/api/update_secondary_info", {
        params: {
          secondary_info: secondaryInfo,
        },
      })
      .then((response) => response.data);
  }
);
