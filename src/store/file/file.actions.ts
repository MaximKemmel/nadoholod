import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

export const uploadCategoryImage = createAsyncThunk(
  "uploadCategoryImage",
  async ({ file, onUploadProgress }: { file: Blob; onUploadProgress: Function }) => {
    const formData = new FormData();
    formData.append("file", file);
    return await axios
      .post("/upload/categories", formData, {
        onUploadProgress: (data) => onUploadProgress(data),
      })
      .then((response) => response.data);
  }
);

export const uploadProductImage = createAsyncThunk(
  "uploadProductImage",
  async ({ file, onUploadProgress }: { file: Blob; onUploadProgress: Function }) => {
    const formData = new FormData();
    formData.append("file", file);
    return await axios
      .post("/upload/products", formData, {
        onUploadProgress: (data) => onUploadProgress(data),
      })
      .then((response) => response.data);
  }
);

export const uploadProductInstruction = createAsyncThunk(
  "uploadProductInstruction",
  async ({ file, onUploadProgress }: { file: Blob; onUploadProgress: Function }) => {
    const formData = new FormData();
    formData.append("file", file);
    return await axios
      .post("/upload/instructions", formData, {
        onUploadProgress: (data) => onUploadProgress(data),
      })
      .then((response) => response.data);
  }
);

export const uploadManufacturerImage = createAsyncThunk(
  "uploadManufacturerImage",
  async ({ file, onUploadProgress }: { file: Blob; onUploadProgress: Function }) => {
    const formData = new FormData();
    formData.append("file", file);
    return await axios
      .post("/upload/manufacturers", formData, {
        onUploadProgress: (data) => onUploadProgress(data),
      })
      .then((response) => response.data);
  }
);
