import {
  applyParams,
  preventCrossShopDataAccess,
  save,
  transitionState,
  ShopifySyncState,
  ActionOptions,
} from "gadget-server";

/** @type { ActionRun } */
export const run = async ({ params, record, logger, api }) => {
  transitionState(record, {
    from: ShopifySyncState.Running,
    to: ShopifySyncState.Completed,
  });
  applyParams(params, record);
  await preventCrossShopDataAccess(params, record);
  await save(record);
};

/** @type { ActionOnSuccess } */
export const onSuccess = async ({ params, record, logger, api }) => {};

/** @type { ActionOptions } */
export const options = {
  actionType: "update",
  triggers: { api: true },
};
