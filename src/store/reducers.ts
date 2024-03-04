import { combineReducers } from "@reduxjs/toolkit";

import { reducer as mainReducer } from "./main/main.slice";
import { reducer as categoryReducer } from "./category/category.slice";
import { reducer as productReducer } from "./product/product.slice";
import { reducer as attributeReducer } from "./attribute/attribute.slice";
import { reducer as filterReducer } from "./filter/filter.slice";
import { reducer as manufacturerReducer } from "./manufacturer/manufacturer.slice";
import { reducer as userReducer } from "./user/user.slice";
import { reducer as fileReducer } from "./file/file.slice";
import { reducer as mailReducer } from "./mail/mail.slice";

export const reducers = combineReducers({
  mainReducer,
  categoryReducer,
  productReducer,
  attributeReducer,
  filterReducer,
  manufacturerReducer,
  userReducer,
  fileReducer,
  mailReducer,
});
