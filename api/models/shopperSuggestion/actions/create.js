import {
  applyParams,
  save,
  ActionOptions,
  preventCrossShopDataAccess,
} from "gadget-server";

/** @type { ActionRun } */
export const run = async ({ params, record, logger, api }) => {
  applyParams(params, record);
  await preventCrossShopDataAccess(params, record);
  await save(record);
};

/** @type { ActionOnSuccess } */
export const onSuccess = async ({ params, record, logger, api }) => {};

/** @type { ActionOptions } */
export const options = {
  actionType: "create",
  triggers: { api: true },
};
