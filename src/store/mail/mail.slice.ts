import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { sendMail } from "./mail.actions";

import { IServerStatus, initServerStatus } from "../../types/main/serverStatus";
import { ServerStatusType } from "../../enums/serverStatusType";

interface IMailState {
  path: string;
  sendMailStatus: IServerStatus;
}

const initialState: IMailState = {
  path: "",
  sendMailStatus: initServerStatus(),
};

export const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    setSendMailStatus(state, action: PayloadAction<IServerStatus>) {
      state.sendMailStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMail.pending, (state) => {
      state.path = "";
      state.sendMailStatus = {
        status: ServerStatusType.InProgress,
        error: "",
      } as IServerStatus;
    });
    builder.addCase(sendMail.fulfilled, (state, action) => {
      state.sendMailStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : "Ошибка при отправке письма",
      };
    });
    builder.addCase(sendMail.rejected, (state) => {
      state.sendMailStatus = {
        status: ServerStatusType.Error,
        error: "",
      } as IServerStatus;
      state.path = "";
    });
  },
});

export const { actions, reducer } = mailSlice;
