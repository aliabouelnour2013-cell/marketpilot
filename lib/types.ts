import type { LucideIcon } from "lucide-react";

export type DataKind = "DEMO DATA" | "SIMULATED" | "UNAVAILABLE";

export type IdeaDirection =
  | "POTENTIAL LONG"
  | "POTENTIAL SHORT"
  | "WATCH";

export type OrderSide = "LONG" | "SHORT";

export type OrderType = "Market" | "Limit" | "Stop" | "Stop-limit";

export type PaperOrderStatus = "PENDING — DEMO DATA REQUIRED";

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

export type PaperOrder = {
  id: number;
  ticker: string;
  side: OrderSide;
  orderType: OrderType;
  quantity: number;
  status: PaperOrderStatus;
  createdAt: string;
};

export type InfoCardData = {
  title: string;
  body: string;
  source: string;
};
