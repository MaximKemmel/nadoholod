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

export const updateAttributePosition = createAsyncThunk(
  "api/updateAttributePosition",
  async ({ attribute, oldPosition }: { attribute: IAttribute; oldPosition: number }) => {
    const response = await axios.post("/api/update_attribute_position", {
      params: {
        attribute: attribute,
        old_position: oldPosition,
      },
    });
    return response.data;
  }
);
