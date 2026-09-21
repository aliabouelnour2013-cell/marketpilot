import type {
  PaperAccountSnapshot,
  PaperOrderRecord,
} from "@/lib/contracts/paper-trading";
import type { SourceMetadata } from "@/lib/contracts/market-data";

/**
 * Phase 3 only:
 * This is an intentionally in-memory demo store.
 *
 * It is not a database, is not durable, is not multi-user, and resets whenever
 * the Next.js server process restarts. It exists only to establish a server-side
 * API boundary before database persistence is introduced in a later phase.
 */

const demoPaperDataMetadata: SourceMetadata = {
  source: "MarketPilot in-memory paper-trading demo store",
  retrievedAt: new Date().toISOString(),
  status: "DEMO",
  classification: "DEMO DATA",
};

type DemoStore = {
  orders: PaperOrderRecord[];
};

const globalStore = globalThis as typeof globalThis & {
  __marketPilotDemoStore?: DemoStore;
};

function getStore() {
  if (!globalStore.__marketPilotDemoStore) {
    globalStore.__marketPilotDemoStore = {
      orders: [],
    };
  }

  return globalStore.__marketPilotDemoStore;
}

export function getDemoPaperMetadata(): SourceMetadata {
  return {
    ...demoPaperDataMetadata,
    retrievedAt: new Date().toISOString(),
  };
}

export function getDemoOrders() {
  return [...getStore().orders];
}

export function getDemoOrderById(orderId: string) {
  return getStore().orders.find((order) => order.id === orderId) ?? null;
}

export function saveDemoOrder(order: PaperOrderRecord) {
  const store = getStore();
  store.orders.unshift(order);

  return order;
}

export function replaceDemoOrder(updatedOrder: PaperOrderRecord) {
  const store = getStore();
  const index = store.orders.findIndex((order) => order.id === updatedOrder.id);

  if (index === -1) {
    return null;
  }

  store.orders[index] = updatedOrder;
  return updatedOrder;
}

export function getDemoPaperAccountSnapshot(): PaperAccountSnapshot {
  const orders = getDemoOrders();

  return {
    accountId: "demo-paper-account",
    accountLabel: "MarketPilot Default Paper Account",
    virtualStartingCash: 100000,
    virtualCash: 100000,
    portfolioValue: 100000,
    realizedProfitLoss: 0,
    unrealizedProfitLoss: null,
    returnPercent: 0,
    openPositions: [],
    orders,
    orderCount: orders.length,
    dataMetadata: getDemoPaperMetadata(),
    simulationNotice:
      "SIMULATED / PAPER TRADE ONLY. No brokerage connection exists. Orders remain pending because no verified quote provider is configured.",
  };
}
