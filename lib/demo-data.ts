import type { ChartPoint, InfoCardData, TradeIdea } from "./types";

export const demoTimestamp = "Demo data loaded with the application";

export const demoSource =
  "MarketPilot demo dataset — not a live or delayed market-data provider";

export const chartData: ChartPoint[] = [
  { t: "9:30", p: 183.2 },
  { t: "10:00", p: 184.1 },
  { t: "10:30", p: 182.9 },
  { t: "11:00", p: 185.7 },
  { t: "11:30", p: 186.3 },
  { t: "12:00", p: 185.8 },
  { t: "12:30", p: 188.1 },
  { t: "1:00", p: 187.4 },
  { t: "1:30", p: 189.2 },
  { t: "2:00", p: 190.1 },
  { t: "2:30", p: 189.7 },
  { t: "3:00", p: 191.4 },
];

export const tradeIdeas: TradeIdea[] = [
  {
    ticker: "NVDA",
    company: "NVIDIA Corporation",
    direction: "WATCH",
    timeframe: "Swing",
    displayPrice: "$191.42 (demo)",
    change: "+3.1% (demo)",
    technicalEvidence:
      "Demo chart template only. Technical indicator values are not calculated from a connected OHLCV provider.",
    fundamentalEvidence:
      "No reported revenue, earnings, free-cash-flow, margin, valuation, or debt figures are loaded.",
    catalystEvidence:
      "No verified earnings date, SEC filing, company announcement, macro event, or news catalyst is connected.",
    assumptions:
      "This demonstration assumes a user may later screen for trend, volume, and sector-strength criteria using provider data.",
    risk:
      "Market data is unavailable. Any real setup could be materially different once actual prices, liquidity, filings, and news are retrieved.",
    invalidation:
      "This demo candidate is invalid if a future verified data scan does not meet the saved technical and fundamental criteria.",
    uncertainty:
      "High. This is a UI demonstration, not an analysis of current market conditions.",
    source: demoSource,
    timestamp: demoTimestamp,
  },
  {
    ticker: "MSFT",
    company: "Microsoft Corporation",
    direction: "WATCH",
    timeframe: "Medium-term",
    displayPrice: "$514.06 (demo)",
    change: "+0.8% (demo)",
    technicalEvidence:
      "Technical evidence is unavailable until a timestamped market-data feed is configured.",
    fundamentalEvidence:
      "Reported company financials are unavailable until SEC/company-source ingestion is implemented.",
    catalystEvidence:
      "No verified cloud-growth, earnings, or company-event catalyst is loaded.",
    assumptions:
      "This placeholder represents a future research candidate, not a recommendation.",
    risk:
      "Valuation, macro conditions, company results, and price behavior may contradict any future thesis.",
    invalidation:
      "Invalidate if verified data does not satisfy the eventual research or screener rules.",
    uncertainty:
      "High. All values shown are intentionally labeled demo data.",
    source: demoSource,
    timestamp: demoTimestamp,
  },
  {
    ticker: "TSLA",
    company: "Tesla, Inc.",
    direction: "WATCH",
    timeframe: "Swing",
    displayPrice: "$338.71 (demo)",
    change: "-2.4% (demo)",
    technicalEvidence:
      "No verified downtrend, relative-strength, moving-average, RSI, MACD, volume, or volatility calculation is available.",
    fundamentalEvidence:
      "No reported financial-statement data has been retrieved for this demonstration.",
    catalystEvidence:
      "No verified catalyst data is available.",
    assumptions:
      "A future scanner may identify either bullish, bearish, or watch-only scenarios only after obtaining authorized source data.",
    risk:
      "Price gaps, liquidity changes, news, earnings, and broader market moves can invalidate short-term assumptions.",
    invalidation:
      "No trade setup exists until provider-backed criteria and a timestamped price series are available.",
    uncertainty:
      "High. Do not use this demo item to make a real-money decision.",
    source: demoSource,
    timestamp: demoTimestamp,
  },
];

export const marketTickerData = [
  {
    name: "S&P 500",
    value: "6,642.18 (demo)",
    change: "+0.42% (demo)",
    down: false,
  },
  {
    name: "NASDAQ",
    value: "22,318.12 (demo)",
    change: "+0.67% (demo)",
    down: false,
  },
  {
    name: "DOW",
    value: "46,211.90 (demo)",
    change: "+0.12% (demo)",
    down: false,
  },
  {
    name: "VIX",
    value: "15.82 (demo)",
    change: "-4.13% (demo)",
    down: true,
  },
  {
    name: "10Y",
    value: "4.12% (demo)",
    change: "+0.03% (demo)",
    down: false,
  },
];

export const marketPlaceholderCards: InfoCardData[] = [
  {
    title: "Market breadth",
    body:
      "Advance/decline, new highs/lows, and sector breadth require a connected market-data provider.",
    source: demoSource,
  },
  {
    title: "Sector analysis",
    body:
      "No sector performance values are shown because provider data is not connected.",
    source: demoSource,
  },
  {
    title: "Economic context",
    body:
      "Economic releases should come from primary sources such as the Federal Reserve, BLS, BEA, and Treasury.",
    source: "No government-data adapter configured",
  },
];

export const screenerFilters = [
  "Market cap",
  "Revenue growth",
  "EPS growth",
  "P/E",
  "EV/EBITDA",
  "Free cash flow",
  "ROE / ROIC",
  "Debt / equity",
  "RSI",
  "SMA / EMA",
  "Volume",
  "Volatility",
  "Sector / industry",
  "Earnings date",
];

export const educationLevels = [
  {
    level: "Beginner",
    topics:
      "Stocks, ETFs, bid/ask, charts, volume, P/E, EPS, diversification, and risk.",
  },
  {
    level: "Intermediate",
    topics:
      "Financial statements, cash flow, margins, ROE, ROIC, valuation, technical indicators, sectors, and portfolio construction.",
  },
  {
    level: "Advanced",
    topics:
      "WACC, DCF, factors, correlation, optimization, Sharpe, drawdown, VaR, Monte Carlo, options, volatility, and backtesting bias.",
  },
];
