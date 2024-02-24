import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { authMe, login } from "./user.actions";

import { IUser } from "../../types/user/user";
import { IServerStatus, initServerStatus } from "../../types/main/serverStatus";
import { ServerStatusType } from "../../enums/serverStatusType";

interface IUserState {
  user: IUser;
  isAuth: boolean;
  loginStatus: IServerStatus;
  authMeStatus: IServerStatus;
}

const initialState: IUserState = {
  user: { id: -1 } as IUser,
  isAuth: false,
  loginStatus: initServerStatus(),
  authMeStatus: initServerStatus(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {} as IUser;
      state.isAuth = false;
    },
    setLoginStatus(state, action: PayloadAction<IServerStatus>) {
      state.loginStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loginStatus = {
        status: ServerStatusType.InProgress,
        error: "",
      } as IServerStatus;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.message,
      };
      if (action.payload.token) {
        state.user = action.payload as IUser;
        window.localStorage.setItem("nadoholod_token", action.payload.token);
        state.authMeStatus = {
          status: ServerStatusType.Success,
          error: "",
        };
        state.isAuth = true;
      }
    });
    builder.addCase(login.rejected, (state) => {
      state.loginStatus = {
        status: ServerStatusType.Error,
        error: "",
      } as IServerStatus;
      state.user = {} as IUser;
    });

    builder.addCase(authMe.pending, (state) => {
      state.authMeStatus = {
        status: ServerStatusType.InProgress,
        error: "",
      } as IServerStatus;
      state.isAuth = false;
    });
    builder.addCase(authMe.fulfilled, (state, action) => {
      state.authMeStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.message,
      };
      if (action.payload.success) {
        state.user = action.payload.user as IUser;
        if (state.user.login !== "") {
          state.isAuth = true;
        }
      } else {
        state.isAuth = false;
      }
    });
    builder.addCase(authMe.rejected, (state) => {
      state.authMeStatus = {
        status: ServerStatusType.Error,
        error: "",
      } as IServerStatus;
      state.user = {} as IUser;
      state.isAuth = false;
    });
  },
});

export const { actions, reducer } = userSlice;
