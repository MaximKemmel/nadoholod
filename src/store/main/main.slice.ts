import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IMainState {
  isHomePage: boolean;
}

const initialState: IMainState = {
  isHomePage: true,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setIsHomePage(state, action: PayloadAction<boolean>) {
      state.isHomePage = action.payload;
    },
  },
});

export const { actions, reducer } = mainSlice;
