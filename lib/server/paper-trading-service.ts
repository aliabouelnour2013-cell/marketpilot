// Server-only paper-trading service used by API routes.
// Implementation lives in `lib/contracts/paper-trading-service.ts`
// (in-memory demo store until the persistent engine lands).

export {
  cancelPaperOrder,
  createPaperOrder,
  getPaperAccount,
  getPaperOrder,
  listPaperOrders,
} from "@/lib/contracts/paper-trading-service";
