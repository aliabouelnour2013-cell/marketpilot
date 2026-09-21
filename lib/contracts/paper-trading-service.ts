import type {
  CancelPaperOrderResult,
  CreatePaperOrderInput,
  PaperOrderRecord,
} from "@/lib/contracts/paper-trading";

import {
  getDemoOrderById,
  getDemoPaperAccountSnapshot,
  getDemoPaperMetadata,
  getDemoOrders,
  replaceDemoOrder,
  saveDemoOrder,
} from "./demo-store";

export function listPaperOrders() {
  return getDemoOrders();
}

export function getPaperAccount() {
  return getDemoPaperAccountSnapshot();
}

export function createPaperOrder(input: CreatePaperOrderInput) {
  const now = new Date().toISOString();

  const order: PaperOrderRecord = {
    id: `paper_${crypto.randomUUID()}`,
    ticker: input.ticker,
    side: input.side,
    orderType: input.orderType,
    quantity: input.quantity,
    status: "PENDING — DEMO DATA REQUIRED",
    createdAt: now,
    updatedAt: now,
    dataMetadata: getDemoPaperMetadata(),
    note:
      "No fill was simulated. A verified timestamped quote provider is required before paper-order fill logic can run.",
  };

  return saveDemoOrder(order);
}

export function getPaperOrder(orderId: string) {
  return getDemoOrderById(orderId);
}

export function cancelPaperOrder(
  orderId: string,
): CancelPaperOrderResult | null {
  const existingOrder = getDemoOrderById(orderId);

  if (!existingOrder) {
    return null;
  }

  if (existingOrder.status === "CANCELLED — SIMULATED") {
    return {
      order: existingOrder,
      account: getDemoPaperAccountSnapshot(),
    };
  }

  const updatedOrder: PaperOrderRecord = {
    ...existingOrder,
    status: "CANCELLED — SIMULATED",
    updatedAt: new Date().toISOString(),
    dataMetadata: getDemoPaperMetadata(),
    note:
      "This virtual pending order was cancelled. No fill, position, cash movement, or profit/loss was created.",
  };

  replaceDemoOrder(updatedOrder);

  return {
    order: updatedOrder,
    account: getDemoPaperAccountSnapshot(),
  };
}
