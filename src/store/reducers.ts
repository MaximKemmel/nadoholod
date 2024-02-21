import { combineReducers } from "@reduxjs/toolkit";

import { reducer as mainReducer } from "./main/main.slice";
import { reducer as categoryReducer } from "./category/category.slice";

export const reducers = combineReducers({
  mainReducer,
  categoryReducer,
});
