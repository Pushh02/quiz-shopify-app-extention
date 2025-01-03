import {
  transitionState,
  applyParams,
  save,
  ActionOptions,
  ShopifySyncState,
} from "gadget-server";
import { preventCrossShopDataAccess, abortSync } from "gadget-server/shopify";

/** @type { ActionRun } */
export const run = async ({ params, record, logger, api, connections }) => {
  transitionState(record, {
    from: ShopifySyncState.Running,
    to: ShopifySyncState.Errored,
  });
  applyParams(params, record);
  await preventCrossShopDataAccess(params, record);
  await abortSync(params, record);
  await save(record);
};

/** @type { ActionOnSuccess } */
export const onSuccess = async ({
  params,
  record,
  logger,
  api,
  connections,
}) => {
  // Your logic goes here
};

/** @type { ActionOptions } */
export const options = {
  actionType: "update",
};