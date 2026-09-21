import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  CircleDollarSign,
  FileText,
  LayoutDashboard,
  Newspaper,
  Settings,
  SlidersHorizontal,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

import type { NavigationItem } from "./types";

export const navigationItems: NavigationItem[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Markets", icon: Activity },
  { label: "Stocks", icon: BarChart3 },
  { label: "Watchlists", icon: Bell },
  { label: "Portfolio", icon: Wallet },
  { label: "Paper Trade", icon: CircleDollarSign },
  { label: "News", icon: Newspaper },
  { label: "Filings", icon: FileText },
  { label: "Earnings", icon: CalendarDays },
  { label: "Insiders", icon: Users },
  { label: "Sectors", icon: TrendingUp },
  { label: "Screener", icon: SlidersHorizontal },
  { label: "Backtesting", icon: BarChart3 },
  { label: "Education", icon: BookOpen },
  { label: "AI Analyst", icon: BrainCircuit },
  { label: "Settings", icon: Settings },
];
