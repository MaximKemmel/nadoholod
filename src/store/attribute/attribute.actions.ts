import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

import { IAttribute } from "../../types/attribute/attribute";

export const getAttributes = createAsyncThunk("api/getAttributes", async () => {
  const response = await axios.get("/api/attributes");
  return response.data;
});

export const addAttributes = createAsyncThunk("api/addAttributes", async ({ attributes }: { attributes: IAttribute[] }) => {
  return await axios
    .post("/api/add_attributes", {
      params: {
        attributes: attributes,
      },
    })
    .then((response) => response.data);
});
