import { actions as mainActions } from "./main/main.slice";

import * as categoryActionsDB from "./category/category.actions";

export const rootActions = {
  ...mainActions,
  ...categoryActionsDB,
};
