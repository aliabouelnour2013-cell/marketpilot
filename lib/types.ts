import type { LucideIcon } from "lucide-react";

import type {
  PaperOrderRecord,
  PaperOrderSide,
  PaperOrderStatus,
  PaperOrderType,
} from "./contracts/paper-trading";

export type DataKind = "DEMO DATA" | "SIMULATED" | "UNAVAILABLE";

export type IdeaDirection =
  | "POTENTIAL LONG"
  | "POTENTIAL SHORT"
  | "WATCH";

export type OrderSide = PaperOrderSide;

export type OrderType = PaperOrderType;

export type PaperOrder = PaperOrderRecord;

export type NavigationItem = {
  label: string;
  icon: LucideIcon;
};

export type ChartPoint = {
  t: string;
  p: number;
};

export type TradeIdea = {
  ticker: string;
  company: string;
  direction: IdeaDirection;
  timeframe: "Intraday" | "Swing" | "Medium-term" | "Long-term";
  displayPrice: string;
  change: string;
  technicalEvidence: string;
  fundamentalEvidence: string;
  catalystEvidence: string;
  assumptions: string;
  risk: string;
  invalidation: string;
  uncertainty: string;
  source: string;
  timestamp: string;
};

export type InfoCardData = {
  title: string;
  body: string;
  source: string;
};

export type PaperTradingClientState = {
  loading: boolean;
  submittingOrder: boolean;
  cancellingOrderId: string | null;
  error: string | null;
};

export type PaperOrderStatusLabel = PaperOrderStatus;
