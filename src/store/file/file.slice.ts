import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { uploadCategoryImage } from "./file.actions";

import { IServerStatus, initServerStatus } from "../../types/main/serverStatus";
import { ServerStatusType } from "../../enums/serverStatusType";

interface IFileState {
  path: string;
  uploadCategoryImageStatus: IServerStatus;
}

const initialState: IFileState = {
  path: "",
  uploadCategoryImageStatus: initServerStatus(),
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setUploadCategoryImageStatus(state, action: PayloadAction<IServerStatus>) {
      state.uploadCategoryImageStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadCategoryImage.pending, (state) => {
      state.path = "";
      state.uploadCategoryImageStatus = {
        status: ServerStatusType.InProgress,
        error: "",
      } as IServerStatus;
    });
    builder.addCase(uploadCategoryImage.fulfilled, (state, action) => {
      state.uploadCategoryImageStatus = {
        status: action.payload.url !== undefined ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.url !== undefined ? "" : "Ошибка при загрузке изображения",
      };
      if (action.payload.url !== undefined) {
        state.path = action.payload.url;
      }
    });
    builder.addCase(uploadCategoryImage.rejected, (state) => {
      state.uploadCategoryImageStatus = {
        status: ServerStatusType.Error,
        error: "",
      } as IServerStatus;
      state.path = "";
    });
  },
});

export const { actions, reducer } = fileSlice;
