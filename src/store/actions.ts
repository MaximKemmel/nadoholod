import { actions as mainActions } from "./main/main.slice";
import { actions as categoryActions } from "./category/category.slice";
import * as categoryActionsDB from "./category/category.actions";
import { actions as productActions } from "./product/product.slice";
import * as productActionsDB from "./product/product.actions";
import { actions as attributeActions } from "./attribute/attribute.slice";
import * as attributeActionsDB from "./attribute/attribute.actions";
import { actions as filterActions } from "./filter/filter.slice";
import * as filterActionsDB from "./filter/filter.actions";
import * as manufacturerActionsDB from "./manufacturer/manufacturer.actions";
import { actions as userActions } from "./user/user.slice";
import * as userActionsDB from "./user/user.actions";
import { actions as fileActions } from "./file/file.slice";
import * as fileActionsDB from "./file/file.actions";
import { actions as mailActions } from "./mail/mail.slice";
import * as mailActionsDB from "./mail/mail.actions";

export const rootActions = {
  ...mainActions,
  ...categoryActions,
  ...categoryActionsDB,
  ...productActions,
  ...productActionsDB,
  ...attributeActions,
  ...attributeActionsDB,
  ...filterActions,
  ...filterActionsDB,
  ...manufacturerActionsDB,
  ...userActions,
  ...userActionsDB,
  ...fileActions,
  ...fileActionsDB,
  ...mailActions,
  ...mailActionsDB,
};
