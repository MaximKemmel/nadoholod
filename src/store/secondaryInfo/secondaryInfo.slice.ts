import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getSecondaryInfo, updateSecondaryInfo } from "./secondaryInfo.actions";

import { ISecondaryInfo } from "../../types/secondaryInfo/secondaryInfo";
import { IServerStatus, initServerStatus } from "../../types/main/serverStatus";
import { ServerStatusType } from "../../enums/serverStatusType";

interface ISecondaryInfoState {
  secondaryInfo: ISecondaryInfo;
  updateSecondaryInfoStatus: IServerStatus;
}

const initialState: ISecondaryInfoState = {
  secondaryInfo: {} as ISecondaryInfo,
  updateSecondaryInfoStatus: initServerStatus(),
};

export const secondaryInfoSlice = createSlice({
  name: "secondaryInfo",
  initialState,
  reducers: {
    setUpdateSecondaryInfoStatus(state, action: PayloadAction<IServerStatus>) {
      state.updateSecondaryInfoStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSecondaryInfo.fulfilled, (state, action) => {
      state.secondaryInfo = { id: -1 } as ISecondaryInfo;
      const array = action.payload as ISecondaryInfo[];
      if (Array.isArray(array) && array.length > 0) {
        state.secondaryInfo = array[0];
      }
    });
    builder.addCase(getSecondaryInfo.rejected, (state) => {
      state.secondaryInfo = { id: -1 } as ISecondaryInfo;
    });

    builder.addCase(updateSecondaryInfo.pending, (state) => {
      state.updateSecondaryInfoStatus = {
        status: ServerStatusType.InProgress,
        error: "",
      } as IServerStatus;
    });
    builder.addCase(updateSecondaryInfo.fulfilled, (state, action) => {
      state.updateSecondaryInfoStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.message,
      };
    });
    builder.addCase(updateSecondaryInfo.rejected, (state) => {
      state.updateSecondaryInfoStatus = {
        status: ServerStatusType.Error,
        error: "",
      } as IServerStatus;
    });
  },
});

export const { actions, reducer } = secondaryInfoSlice;
