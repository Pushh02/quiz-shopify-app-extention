import {
  deleteRecord,
  ActionOptions,
  preventCrossShopDataAccess,
} from "gadget-server";

/** @type { ActionRun } */
export const run = async ({ params, record, logger, api }) => {
  await preventCrossShopDataAccess(params, record);
  await deleteRecord(record);
};

/** @type { ActionOnSuccess } */
export const onSuccess = async ({ params, record, logger, api }) => {
  // clean up recommended product
  const recommendation = await api.recommendedProduct.findFirst({
    filter: {
      answerId: {
        equals: record.id,
      },
    },
    select: {
      id: true,
    },
  });

  await api.recommendedProduct.delete(recommendation.id);
};

/** @type { ActionOptions } */
export const options = {
  actionType: "delete",
  triggers: { api: true },
};
