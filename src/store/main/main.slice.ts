import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IWindowSize } from "../../types/main/windowSize";

interface IMainState {
  isHomePage: boolean;
  windowSize: IWindowSize;
  windowTopPosition: number;
  isNoScroll: boolean;
}

const initialState: IMainState = {
  isHomePage: true,
  windowSize: {
    innerWidth: 1920,
    innerHeight: 1080,
  } as IWindowSize,
  windowTopPosition: 0,
  isNoScroll: false,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setIsHomePage(state, action: PayloadAction<boolean>) {
      state.isHomePage = action.payload;
    },
    setWindowSize(state, action: PayloadAction<IWindowSize>) {
      state.windowSize = action.payload;
    },
    setWindowTopPosition(state, action: PayloadAction<number>) {
      state.windowTopPosition = action.payload;
    },
    setIsNoScroll(state, action: PayloadAction<boolean>) {
      state.isNoScroll = action.payload;
    },
  },
});

export const { actions, reducer } = mainSlice;
