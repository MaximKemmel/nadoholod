import { combineReducers } from "@reduxjs/toolkit";

import { reducer as mainReducer } from "./main/main.slice";
import { reducer as categoryReducer } from "./category/category.slice";
import { reducer as userReducer } from "./user/user.slice";
import { reducer as fileReducer } from "./file/file.slice";

export const reducers = combineReducers({
  mainReducer,
  categoryReducer,
  userReducer,
  fileReducer,
});
