import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { uploadCategoryImage, uploadProductImage, uploadProductInstruction } from "./file.actions";

import { IServerStatus, initServerStatus } from "../../types/main/serverStatus";
import { ServerStatusType } from "../../enums/serverStatusType";

interface IFileState {
  path: string;
  uploadCategoryImageStatus: IServerStatus;
  uploadProductImageStatus: IServerStatus;
  uploadProductInstructionStatus: IServerStatus;
}

const initialState: IFileState = {
  path: "",
  uploadCategoryImageStatus: initServerStatus(),
  uploadProductImageStatus: initServerStatus(),
  uploadProductInstructionStatus: initServerStatus(),
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setUploadCategoryImageStatus(state, action: PayloadAction<IServerStatus>) {
      state.uploadCategoryImageStatus = action.payload;
    },
    setUploadProductImageStatus(state, action: PayloadAction<IServerStatus>) {
      state.uploadProductImageStatus = action.payload;
    },
    setUploadProductInstructionStatus(state, action: PayloadAction<IServerStatus>) {
      state.uploadProductInstructionStatus = action.payload;
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

    builder.addCase(uploadProductImage.pending, (state) => {
      state.path = "";
      state.uploadProductImageStatus = {
        status: ServerStatusType.InProgress,
        error: "",
      } as IServerStatus;
    });
    builder.addCase(uploadProductImage.fulfilled, (state, action) => {
      state.uploadProductImageStatus = {
        status: action.payload.url !== undefined ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.url !== undefined ? "" : "Ошибка при загрузке изображения",
      };
      if (action.payload.url !== undefined) {
        state.path = action.payload.url;
      }
    });
    builder.addCase(uploadProductImage.rejected, (state) => {
      state.uploadProductImageStatus = {
        status: ServerStatusType.Error,
        error: "",
      } as IServerStatus;
      state.path = "";
    });

    builder.addCase(uploadProductInstruction.pending, (state) => {
      state.path = "";
      state.uploadProductInstructionStatus = {
        status: ServerStatusType.InProgress,
        error: "",
      } as IServerStatus;
    });
    builder.addCase(uploadProductInstruction.fulfilled, (state, action) => {
      state.uploadProductInstructionStatus = {
        status: action.payload.url !== undefined ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.url !== undefined ? "" : "Ошибка при загрузке файла",
      };
      if (action.payload.url !== undefined) {
        state.path = action.payload.url;
      }
    });
    builder.addCase(uploadProductInstruction.rejected, (state) => {
      state.uploadProductInstructionStatus = {
        status: ServerStatusType.Error,
        error: "",
      } as IServerStatus;
      state.path = "";
    });
  },
});

export const { actions, reducer } = fileSlice;
