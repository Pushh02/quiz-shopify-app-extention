import {
  preventCrossShopDataAccess,
  deleteRecord,
  ActionOptions,
} from "gadget-server";

/** @type { ActionRun } */
export const run = async ({ params, record, logger, api, connections }) => {
  await preventCrossShopDataAccess(params, record);
  await deleteRecord(record);
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
  actionType: "delete",
  triggers: { api: false },
};
