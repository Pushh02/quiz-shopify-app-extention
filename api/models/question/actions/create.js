import {
  applyParams,
  save,
  ActionOptions,
  preventCrossShopDataAccess,
} from "gadget-server";

/** @type { ActionRun } */
export const run = async ({ params, record, connections, logger, api }) => {
  applyParams(params, record);
  await preventCrossShopDataAccess(params, record);
  await save(record);
};

/** @type { ActionOptions } */
export const options = {
  actionType: "create",
  triggers: { api: true },
};
