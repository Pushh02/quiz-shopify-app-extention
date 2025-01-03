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
  // clean up quiz answers
  const answers = await api.answer.findMany({
    filter: {
      questionId: {
        equals: record.id,
      },
    },
    select: {
      id: true,
    },
  });

  const ids = answers.map((answer) => answer.id);
  await api.answer.bulkDelete(ids);
};

/** @type { ActionOptions } */
export const options = {
  actionType: "delete",
  triggers: { api: true },
};
