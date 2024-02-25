import { actions as mainActions } from "./main/main.slice";
import { actions as categoryActions } from "./category/category.slice";
import * as categoryActionsDB from "./category/category.actions";
import { actions as productActions } from "./product/product.slice";
import * as productActionsDB from "./product/product.actions";
import { actions as userActions } from "./user/user.slice";
import * as userActionsDB from "./user/user.actions";
import { actions as fileActions } from "./file/file.slice";
import * as fileActionsDB from "./file/file.actions";

export const rootActions = {
  ...mainActions,
  ...categoryActions,
  ...categoryActionsDB,
  ...productActions,
  ...productActionsDB,
  ...userActions,
  ...userActionsDB,
  ...fileActions,
  ...fileActionsDB,
};
