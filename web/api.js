import { Client } from "@gadget-client/productquizer";

export const api = new Client({ environment: window.gadgetConfig.environment });
