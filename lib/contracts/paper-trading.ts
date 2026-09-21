import type { SourceMetadata } from "./market-data";

export type PaperOrderSide = "LONG" | "SHORT";

export type PaperOrderType = "Market" | "Limit" | "Stop" | "Stop-limit";

export type PaperOrderStatus =
  | "PENDING — DEMO DATA REQUIRED"
  | "CANCELLED — SIMULATED";

export type CreatePaperOrderInput = {
  ticker: string;
  side: PaperOrderSide;
  orderType: PaperOrderType;
  quantity: number;
};

export type PaperOrderRecord = {
  id: string;
  ticker: string;
  side: PaperOrderSide;
  orderType: PaperOrderType;
  quantity: number;
  status: PaperOrderStatus;
  createdAt: string;
  updatedAt: string;
  dataMetadata: SourceMetadata;
  note: string;
};

export type PaperAccountSnapshot = {
  accountId: "demo-paper-account";
  accountLabel: "MarketPilot Default Paper Account";
  virtualStartingCash: number;
  virtualCash: number;
  portfolioValue: number;
  realizedProfitLoss: number;
  unrealizedProfitLoss: null;
  returnPercent: number;
  openPositions: [];
  orders: PaperOrderRecord[];
  orderCount: number;
  dataMetadata: SourceMetadata;
  simulationNotice: string;
};

export type CancelPaperOrderResult = {
  order: PaperOrderRecord;
  account: PaperAccountSnapshot;
};
