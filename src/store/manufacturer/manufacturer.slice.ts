import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { addManufacturer, deleteManufacturer, getManufacturers, updateManufacturer } from "./manufacturer.actions";

import { IManufacturer } from "../../types/manufacturer/manufacturer";
import { IServerStatus, initServerStatus } from "../../types/main/serverStatus";
import { ServerStatusType } from "../../enums/serverStatusType";

interface IManufacturerState {
  manufacturers: IManufacturer[];
  addManufacturerStatus: IServerStatus;
  updateManufacturerStatus: IServerStatus;
  deleteManufacturerStatus: IServerStatus;
}

const initialState: IManufacturerState = {
  manufacturers: [] as IManufacturer[],
  addManufacturerStatus: initServerStatus(),
  updateManufacturerStatus: initServerStatus(),
  deleteManufacturerStatus: initServerStatus(),
};

export const manufacturerSlice = createSlice({
  name: "manufacturer",
  initialState,
  reducers: {
    setAddManufacturerStatus(state, action: PayloadAction<IServerStatus>) {
      state.addManufacturerStatus = action.payload;
    },
    setUpdateManufacturerStatus(state, action: PayloadAction<IServerStatus>) {
      state.updateManufacturerStatus = action.payload;
    },
    setDeleteManufacturerStatus(state, action: PayloadAction<IServerStatus>) {
      state.deleteManufacturerStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getManufacturers.fulfilled, (state, action) => {
      state.manufacturers = [];
      state.manufacturers = action.payload as IManufacturer[];
    });
    builder.addCase(getManufacturers.rejected, (state) => {
      state.manufacturers = [];
    });

    builder.addCase(addManufacturer.pending, (state) => {
      state.addManufacturerStatus = {
        status: ServerStatusType.InProgress,
        error: "",
      } as IServerStatus;
    });
    builder.addCase(addManufacturer.fulfilled, (state, action) => {
      state.addManufacturerStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.message,
      };
    });
    builder.addCase(addManufacturer.rejected, (state) => {
      state.addManufacturerStatus = {
        status: ServerStatusType.Error,
        error: "",
      } as IServerStatus;
    });

    builder.addCase(updateManufacturer.pending, (state) => {
      state.updateManufacturerStatus = {
        status: ServerStatusType.InProgress,
        error: "",
      } as IServerStatus;
    });
    builder.addCase(updateManufacturer.fulfilled, (state, action) => {
      state.updateManufacturerStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.message,
      };
    });
    builder.addCase(updateManufacturer.rejected, (state) => {
      state.updateManufacturerStatus = {
        status: ServerStatusType.Error,
        error: "",
      } as IServerStatus;
    });

    builder.addCase(deleteManufacturer.pending, (state) => {
      state.deleteManufacturerStatus = {
        status: ServerStatusType.InProgress,
        error: "",
      } as IServerStatus;
    });
    builder.addCase(deleteManufacturer.fulfilled, (state, action) => {
      state.deleteManufacturerStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.message,
      };
    });
    builder.addCase(deleteManufacturer.rejected, (state) => {
      state.deleteManufacturerStatus = {
        status: ServerStatusType.Error,
        error: "",
      } as IServerStatus;
    });
  },
});

export const { actions, reducer } = manufacturerSlice;
