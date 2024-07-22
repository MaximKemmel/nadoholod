import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { addAttributes, getAttributes, updateAttributePosition } from "./attribute.actions";

import { IAttribute } from "../../types/attribute/attribute";
import { IServerStatus, initServerStatus } from "../../types/main/serverStatus";
import { ServerStatusType } from "../../enums/serverStatusType";

interface IAttributeState {
  attributes: IAttribute[];
  addAttributesStatus: IServerStatus;
  updateAttributePositionStatus: IServerStatus;
}

const initialState: IAttributeState = {
  attributes: [] as IAttribute[],
  addAttributesStatus: initServerStatus(),
  updateAttributePositionStatus: initServerStatus(),
};

export const attributeSlice = createSlice({
  name: "attribute",
  initialState,
  reducers: {
    setAddAttributesStatus(state, action: PayloadAction<IServerStatus>) {
      state.addAttributesStatus = action.payload;
    },
    setUpdateAttributePositionStatus(state, action: PayloadAction<IServerStatus>) {
      state.updateAttributePositionStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAttributes.fulfilled, (state, action) => {
      state.attributes = [];
      state.attributes = action.payload as IAttribute[];
    });
    builder.addCase(getAttributes.rejected, (state) => {
      state.attributes = [];
    });

    builder.addCase(addAttributes.pending, (state) => {
      state.addAttributesStatus = {
        status: ServerStatusType.InProgress,
        error: "",
      } as IServerStatus;
    });
    builder.addCase(addAttributes.fulfilled, (state, action) => {
      state.addAttributesStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.message,
      };
    });
    builder.addCase(addAttributes.rejected, (state) => {
      state.addAttributesStatus = {
        status: ServerStatusType.Error,
        error: "",
      } as IServerStatus;
    });

    builder.addCase(updateAttributePosition.pending, (state) => {
      state.updateAttributePositionStatus = {
        status: ServerStatusType.InProgress,
        error: "",
      } as IServerStatus;
    });
    builder.addCase(updateAttributePosition.fulfilled, (state, action) => {
      state.updateAttributePositionStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.message,
      };
    });
    builder.addCase(updateAttributePosition.rejected, (state) => {
      state.updateAttributePositionStatus = {
        status: ServerStatusType.Error,
        error: "",
      } as IServerStatus;
    });
  },
});

export const { actions, reducer } = attributeSlice;
