import {
  applyParams,
  save,
  transitionState,
  ActionOptions,
  ShopifyShopState,
} from "gadget-server";

/** @type { ActionRun } */
export const run = async ({ params, record, logger, api }) => {
  transitionState(record, { to: ShopifyShopState.Installed });
  applyParams(params, record);
  await save(record);
};

/** @type { ActionOnSuccess } */
export const onSuccess = async ({ params, record, logger, api }) => {
  // start a Shopify sync for products on install
  await api.shopifySync.run({
    shopifySync: {
      domain: record.domain,
      shop: {
        _link: record.id,
      },
      models: [
        "shopifyProduct",
        "shopifyProductImage",
        "shopifyTheme",
        "shopifyAsset",
      ],
    },
  });
};

/** @type { ActionOptions } */
export const options = {
  actionType: "create",
  triggers: { api: false },
};
