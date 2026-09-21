"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Newspaper,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type DataKind = "DEMO DATA" | "SIMULATED" | "UNAVAILABLE";
type IdeaDirection = "POTENTIAL LONG" | "POTENTIAL SHORT" | "WATCH";
type OrderSide = "LONG" | "SHORT";
type OrderType = "Market" | "Limit" | "Stop" | "Stop-limit";

type TradeIdea = {
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

type PaperOrder = {
  id: number;
  ticker: string;
  side: OrderSide;
  orderType: OrderType;
  quantity: number;
  status: "PENDING — DEMO DATA REQUIRED";
  createdAt: string;
};

const demoTimestamp = "Demo data loaded with the application";
const demoSource = "MarketPilot demo dataset — not a live or delayed market-data provider";

const chart = [
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

const tradeIdeas: TradeIdea[] = [
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

const nav = [
  ["Dashboard", LayoutDashboard],
  ["Markets", Activity],
  ["Stocks", BarChart3],
  ["Watchlists", Bell],
  ["Portfolio", Wallet],
  ["Paper Trade", CircleDollarSign],
  ["News", Newspaper],
  ["Filings", FileText],
  ["Earnings", CalendarDays],
  ["Screener", SlidersHorizontal],
  ["AI Analyst", BrainCircuit],
  ["Education", BookOpen],
  ["Settings", Settings],
] as const;

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedTicker, setSelectedTicker] = useState("NVDA");
  const [paperOpen, setPaperOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");
  const [challengeOpen, setChallengeOpen] = useState(false);
  const [orders, setOrders] = useState<PaperOrder[]>([]);
  const [orderSide, setOrderSide] = useState<OrderSide>("LONG");
  const [orderType, setOrderType] = useState<OrderType>("Market");
  const [quantity, setQuantity] = useState(10);

  const selectedIdea =
    tradeIdeas.find((idea) => idea.ticker === selectedTicker) ?? tradeIdeas[0];

  const filteredIdeas = useMemo(() => {
    const normalizedQuery = query.trim().toUpperCase();

    if (!normalizedQuery) {
      return tradeIdeas;
    }

    return tradeIdeas.filter(
      (idea) =>
        idea.ticker.includes(normalizedQuery) ||
        idea.company.toUpperCase().includes(normalizedQuery),
    );
  }, [query]);

  const createPaperOrder = () => {
    const normalizedQuantity = Math.max(1, Math.floor(Number(quantity) || 1));

    setOrders((currentOrders) => [
      {
        id: Date.now(),
        ticker: selectedTicker,
        side: orderSide,
        orderType,
        quantity: normalizedQuantity,
        status: "PENDING — DEMO DATA REQUIRED",
        createdAt: new Date().toLocaleString(),
      },
      ...currentOrders,
    ]);

    setPaperOpen(false);
    setActive("Paper Trade");
  };

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="logo">
            <Sparkles size={19} />
          </div>
          <span>MarketPilot</span>
        </div>

        <div className="mode">
          RESEARCH MODE <span>DEMO DATA</span>
        </div>

        <nav aria-label="Primary navigation">
          {nav.map(([label, Icon]) => (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={active === label ? "nav active" : "nav"}
              type="button"
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="side-bottom">
          <div className="paper-badge">
            <div>Paper account</div>
            <strong>$100,000.00</strong>
            <small>SIMULATED / DEMO MODE</small>
          </div>

          <div className="disclaimer">
            MarketPilot provides research and simulation tools. It does not
            execute real-money trades, guarantee outcomes, or provide
            individualized financial advice.
          </div>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <div className="eyebrow">MARKET RESEARCH TERMINAL</div>
            <h1>{active}</h1>
          </div>

          <div className="top-actions">
            <div className="search">
              <Search size={17} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search demo ticker or company..."
                aria-label="Search demo ticker or company"
              />
            </div>
            <button
              className="icon-btn"
              type="button"
              aria-label="Notifications are not configured"
              title="Notifications are not configured"
            >
              <Bell size={18} />
            </button>
            <div className="avatar" title="Local demo profile">
              MP
            </div>
          </div>
        </header>

        <DemoBanner />

        {active === "Dashboard" && (
          <DashboardView
            selectedIdea={selectedIdea}
            filteredIdeas={filteredIdeas}
            onSelectTicker={setSelectedTicker}
            onOpenPaperTrade={() => setPaperOpen(true)}
            onChallenge={() => setChallengeOpen((current) => !current)}
            challengeOpen={challengeOpen}
            orders={orders}
          />
        )}

        {active === "Markets" && <MarketsView />}

        {active === "Stocks" && (
          <StockView
            selectedIdea={selectedIdea}
            onOpenPaperTrade={() => setPaperOpen(true)}
            onChallenge={() => setChallengeOpen((current) => !current)}
            challengeOpen={challengeOpen}
          />
        )}

        {active === "Watchlists" && <WatchlistsView />}

        {(active === "Portfolio" || active === "Paper Trade") && (
          <PaperTradingView
            orders={orders}
            onOpenPaperTrade={() => setPaperOpen(true)}
          />
        )}

        {active === "News" && <NewsView />}
        {active === "Filings" && <FilingsView />}
        {active === "Earnings" && <EarningsView />}
        {active === "Screener" && <ScreenerView />}
        {active === "AI Analyst" && (
          <AiAnalystView
            selectedIdea={selectedIdea}
            onOpenPaperTrade={() => setPaperOpen(true)}
            onChallenge={() => setChallengeOpen((current) => !current)}
            challengeOpen={challengeOpen}
          />
        )}
        {active === "Education" && <EducationView />}
        {active === "Settings" && <SettingsView />}
      </section>

      {paperOpen && (
        <PaperOrderModal
          ticker={selectedTicker}
          orderSide={orderSide}
          orderType={orderType}
          quantity={quantity}
          onClose={() => setPaperOpen(false)}
          onSetOrderSide={setOrderSide}
          onSetOrderType={setOrderType}
          onSetQuantity={setQuantity}
          onSubmit={createPaperOrder}
        />
      )}
    </main>
  );
}

function DemoBanner() {
  return (
    <section className="demo-banner" aria-label="Demo data status">
      <ShieldCheck size={18} />
      <div>
        <strong>DEMO MODE — NO LIVE MARKET DATA CONNECTED</strong>
        <span>
          Prices, charts, financial metrics, ideas, headlines, and portfolio
          values in this prototype are illustrative. Source: {demoSource}.
        </span>
      </div>
    </section>
  );
}

function DashboardView({
  selectedIdea,
  filteredIdeas,
  onSelectTicker,
  onOpenPaperTrade,
  onChallenge,
  challengeOpen,
  orders,
}: {
  selectedIdea: TradeIdea;
  filteredIdeas: TradeIdea[];
  onSelectTicker: (ticker: string) => void;
  onOpenPaperTrade: () => void;
  onChallenge: () => void;
  challengeOpen: boolean;
  orders: PaperOrder[];
}) {
  return (
    <>
      <div className="ticker-row">
        <Ticker
          name="S&P 500"
          value="6,642.18 (demo)"
          change="+0.42% (demo)"
        />
        <Ticker
          name="NASDAQ"
          value="22,318.12 (demo)"
          change="+0.67% (demo)"
        />
        <Ticker name="DOW" value="46,211.90 (demo)" change="+0.12% (demo)" />
        <Ticker
          name="VIX"
          value="15.82 (demo)"
          change="-4.13% (demo)"
          down
        />
        <Ticker name="10Y" value="4.12% (demo)" change="+0.03% (demo)" />
      </div>

      <div className="grid">
        <StockSummaryCard
          idea={selectedIdea}
          onOpenPaperTrade={onOpenPaperTrade}
        />

        <AiSummaryCard
          idea={selectedIdea}
          onChallenge={onChallenge}
          challengeOpen={challengeOpen}
        />

        <TradeIdeasCard
          ideas={filteredIdeas}
          onSelectTicker={onSelectTicker}
        />

        <MarketNewsCard />

        <PaperPortfolioCard
          orders={orders}
          onOpenPaperTrade={onOpenPaperTrade}
        />
      </div>
    </>
  );
}

function MarketsView() {
  return (
    <section className="page-section">
      <PageHeading
        title="Markets"
        description="Market overview cards are intentionally in demo mode until a licensed or approved data source is connected."
      />

      <div className="ticker-row">
        <Ticker
          name="S&P 500"
          value="Data unavailable"
          change="DEMO MODE"
        />
        <Ticker name="NASDAQ" value="Data unavailable" change="DEMO MODE" />
        <Ticker name="DOW" value="Data unavailable" change="DEMO MODE" />
        <Ticker name="VIX" value="Data unavailable" change="DEMO MODE" down />
        <Ticker name="10Y Treasury" value="Data unavailable" change="DEMO MODE" />
      </div>

      <div className="three-column-grid">
        <InfoCard
          title="Market breadth"
          icon={<Activity size={19} />}
          body="Advance/decline, new highs/lows, and sector breadth require a connected market-data provider."
          source={demoSource}
        />
        <InfoCard
          title="Sector analysis"
          icon={<BarChart3 size={19} />}
          body="No sector performance values are shown because provider data is not connected."
          source={demoSource}
        />
        <InfoCard
          title="Economic context"
          icon={<CalendarDays size={19} />}
          body="Economic releases should come from primary sources such as the Federal Reserve, BLS, BEA, and Treasury."
          source="No government-data adapter configured"
        />
      </div>
    </section>
  );
}

function StockView({
  selectedIdea,
  onOpenPaperTrade,
  onChallenge,
  challengeOpen,
}: {
  selectedIdea: TradeIdea;
  onOpenPaperTrade: () => void;
  onChallenge: () => void;
  challengeOpen: boolean;
}) {
  return (
    <section className="page-section">
      <PageHeading
        title={`${selectedIdea.ticker} research`}
        description={`${selectedIdea.company}. All displayed quote and chart values are demo-only and not current market data.`}
      />

      <div className="stock-layout">
        <StockSummaryCard
          idea={selectedIdea}
          onOpenPaperTrade={onOpenPaperTrade}
        />

        <AiSummaryCard
          idea={selectedIdea}
          onChallenge={onChallenge}
          challengeOpen={challengeOpen}
        />
      </div>

      <div className="three-column-grid lower-grid">
        <InfoCard
          title="Financial statements"
          icon={<FileText size={19} />}
          body="Revenue, EPS, free cash flow, margins, cash, debt, and valuation data are unavailable until source-backed financial data is ingested."
          source="SEC EDGAR / company investor relations — adapter not configured"
        />
        <InfoCard
          title="SEC filings"
          icon={<FileText size={19} />}
          body="No filing list is loaded. Future records should retain filing type, accession number, filing date, source link, and retrieval timestamp."
          source="SEC EDGAR adapter not configured"
        />
        <InfoCard
          title="Technicals"
          icon={<TrendingUp size={19} />}
          body="SMA, EMA, RSI, MACD, volume, ATR, volatility, support, and resistance cannot be calculated without timestamped OHLCV data."
          source="Market-data adapter not configured"
        />
      </div>
    </section>
  );
}

function WatchlistsView() {
  return (
    <section className="page-section">
      <PageHeading
        title="Watchlists"
        description="Watchlist persistence is planned for the database phase. The current prototype does not store user data."
      />

      <EmptyState
        icon={<Bell size={24} />}
        title="No saved watchlists"
        body="Create watchlists after authentication and database persistence are implemented. In demo mode, no symbols are stored locally as a user portfolio or recommendation."
      />
    </section>
  );
}

function PaperTradingView({
  orders,
  onOpenPaperTrade,
}: {
  orders: PaperOrder[];
  onOpenPaperTrade: () => void;
}) {
  return (
    <section className="page-section">
      <PageHeading
        title="Paper Trading"
        description="SIMULATED / PAPER TRADE ONLY. No order is sent to a brokerage, and no simulated order can fill without a timestamped market-data source."
      />

      <div className="paper-overview">
        <MetricCard label="Virtual cash" value="$100,000.00" kind="SIMULATED" />
        <MetricCard label="Portfolio value" value="$100,000.00" kind="SIMULATED" />
        <MetricCard
          label="Realized P/L"
          value="$0.00"
          kind="SIMULATED"
        />
        <MetricCard
          label="Unrealized P/L"
          value="Data unavailable"
          kind="UNAVAILABLE"
        />
      </div>

      <section className="card orders-card">
        <div className="card-head">
          <div className="card-title">
            <Wallet size={18} />
            Simulated order history
          </div>
          <button className="outline small" type="button" onClick={onOpenPaperTrade}>
            New simulated order
          </button>
        </div>

        {orders.length === 0 ? (
          <EmptyState
            icon={<CircleDollarSign size={24} />}
            title="No simulated orders yet"
            body="Open a trade idea or stock research view and choose Paper Trade. Orders are simulated and remain pending when market data is unavailable."
          />
        ) : (
          <div className="orders-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Created</th>
                  <th>Ticker</th>
                  <th>Side</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.createdAt}</td>
                    <td>{order.ticker}</td>
                    <td>{order.side}</td>
                    <td>{order.orderType}</td>
                    <td>{order.quantity}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="card-footnote">
          Data status: unavailable. A future paper-trading engine must use
          timestamped provider data, a virtual cash ledger, order validation,
          fill rules, commissions/slippage settings, positions, cost basis, and
          realized/unrealized P/L calculations.
        </p>
      </section>
    </section>
  );
}

function NewsView() {
  return (
    <section className="page-section">
      <PageHeading
        title="News"
        description="News is not connected. MarketPilot will only show source metadata, short excerpts where permitted, summaries, source links, and retrieval timestamps."
      />

      <EmptyState
        icon={<Newspaper size={24} />}
        title="No provider-backed news loaded"
        body="Do not treat the sample dashboard headlines as Reuters, Federal Reserve, SEC, or any other real publication. Configure a permitted news provider in a future server-side integration."
      />
    </section>
  );
}

function FilingsView() {
  return (
    <section className="page-section">
      <PageHeading
        title="SEC Filings"
        description="SEC EDGAR is the preferred primary source for issuer filings. This starter does not yet retrieve or cache filing records."
      />

      <EmptyState
        icon={<FileText size={24} />}
        title="No filings loaded"
        body="A future SEC adapter should retrieve documented records server-side and preserve the company identifier, filing type, accession number, filing date, source URL, retrieval timestamp, and data status."
      />
    </section>
  );
}

function EarningsView() {
  return (
    <section className="page-section">
      <PageHeading
        title="Earnings"
        description="Earnings dates, estimates, and reported results must come from company investor relations, SEC filings, or an approved licensed provider."
      />

      <EmptyState
        icon={<CalendarDays size={24} />}
        title="No verified earnings calendar loaded"
        body="Do not infer, estimate, or invent an earnings date. This page remains unavailable until source-backed data is integrated."
      />
    </section>
  );
}

function ScreenerView() {
  const filters = [
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

  return (
    <section className="page-section">
      <PageHeading
        title="Screener"
        description="The interface defines transparent criteria, but it cannot produce actual results without an eligible coverage universe and source-backed observations."
      />

      <section className="card">
        <div className="card-title">
          <SlidersHorizontal size={18} />
          Available future filters
        </div>
        <div className="filter-list">
          {filters.map((filter) => (
            <span key={filter} className="filter-chip">
              {filter}
            </span>
          ))}
        </div>
        <p className="card-footnote">
          Status: DEMO MODE. Screen outputs must never be called guaranteed
          winners, and every result must identify its source coverage and
          timestamp.
        </p>
      </section>
    </section>
  );
}

function AiAnalystView({
  selectedIdea,
  onOpenPaperTrade,
  onChallenge,
  challengeOpen,
}: {
  selectedIdea: TradeIdea;
  onOpenPaperTrade: () => void;
  onChallenge: () => void;
  challengeOpen: boolean;
}) {
  return (
    <section className="page-section">
      <PageHeading
        title="AI Analyst"
        description="AI interpretation must be separated from reported data, calculated values, estimated values, and unavailable data."
      />

      <section className="card analyst-page">
        <div className="card-title">
          <BrainCircuit size={19} />
          Demo analysis template — {selectedIdea.ticker}
          <DataBadge kind="DEMO DATA" />
        </div>

        <h2>What MarketPilot can say now</h2>
        <p className="summary">
          MarketPilot cannot provide a data-backed trade conclusion because no
          market-data, SEC, earnings, company, or permitted news source is
          connected. The structure below demonstrates the required transparent
          format for a future analysis.
        </p>

        <AnalysisRow label="Summary" value="WATCH — not a recommendation." />
        <AnalysisRow
          label="Facts"
          value="No verified live, delayed, reported, or estimated observations are available."
        />
        <AnalysisRow
          label="Technical context"
          value={selectedIdea.technicalEvidence}
        />
        <AnalysisRow
          label="Fundamental context"
          value={selectedIdea.fundamentalEvidence}
        />
        <AnalysisRow label="Catalysts" value={selectedIdea.catalystEvidence} />
        <AnalysisRow label="Assumptions" value={selectedIdea.assumptions} />
        <AnalysisRow label="Risks" value={selectedIdea.risk} />
        <AnalysisRow label="Invalidation" value={selectedIdea.invalidation} />
        <AnalysisRow
          label="Uncertainties"
          value={selectedIdea.uncertainty}
        />
        <AnalysisRow label="Source" value={selectedIdea.source} />
        <AnalysisRow label="Timestamp" value={selectedIdea.timestamp} />

        <div className="analyst-actions">
          <button className="challenge" type="button" onClick={onChallenge}>
            Challenge this idea <ChevronRight size={16} />
          </button>
          <button
            className="outline"
            type="button"
            onClick={onOpenPaperTrade}
          >
            Open paper ticket
          </button>
        </div>

        {challengeOpen && <ChallengePanel idea={selectedIdea} />}
      </section>
    </section>
  );
}

function EducationView() {
  const lessons = [
    ["Beginner", "Stocks, ETFs, bid/ask, charts, volume, P/E, EPS, diversification, and risk."],
    ["Intermediate", "Financial statements, cash flow, margins, ROE, ROIC, valuation, technical indicators, sectors, and portfolio construction."],
    ["Advanced", "WACC, DCF, factors, correlation, optimization, Sharpe, drawdown, VaR, Monte Carlo, options, volatility, and backtesting bias."],
  ];

  return (
    <section className="page-section">
      <PageHeading
        title="Education"
        description="Educational content is separate from analysis and does not recommend securities."
      />

      <div className="three-column-grid">
        {lessons.map(([level, topics]) => (
          <InfoCard
            key={level}
            title={level}
            icon={<GraduationCap size={19} />}
            body={topics}
            source="MarketPilot educational material — not financial advice"
          />
        ))}
      </div>

      <section className="card lower-grid">
        <div className="card-title">
          <BookOpen size={18} />
          Lesson structure
        </div>
        <p>
          Every future lesson will include an explanation, worked example,
          common mistakes, quiz, and practice exercise. Educational calculators
          and simulations will remain clearly labeled as simulations.
        </p>
      </section>
    </section>
  );
}

function SettingsView() {
  return (
    <section className="page-section">
      <PageHeading
        title="Settings"
        description="Secrets, provider credentials, and user settings should be stored server-side only after authentication and database persistence are implemented."
      />

      <div className="three-column-grid">
        <InfoCard
          title="Data providers"
          icon={<Activity size={19} />}
          body="No provider is configured. The frontend must never contain provider API keys."
          source="Status: DEMO MODE"
        />
        <InfoCard
          title="Account"
          icon={<ShieldCheck size={19} />}
          body="Authentication is not yet configured. Demo state exists only in this browser session."
          source="Status: unavailable"
        />
        <InfoCard
          title="Execution"
          icon={<ShieldAlert size={19} />}
          body="Real-money execution is not implemented and must remain absent from this application."
          source="Paper-trading safety policy"
        />
      </div>
    </section>
  );
}

function StockSummaryCard({
  idea,
  onOpenPaperTrade,
}: {
  idea: TradeIdea;
  onOpenPaperTrade: () => void;
}) {
  return (
    <section className="card hero">
      <div className="card-head">
        <div>
          <span className="symbol">{idea.ticker}</span>
          <span className="company"> {idea.company}</span>
          <DataBadge kind="DEMO DATA" />
        </div>
        <button className="outline" type="button" onClick={onOpenPaperTrade}>
          Paper Trade
        </button>
      </div>

      <div className="quote">
        {idea.displayPrice}{" "}
        <span className={idea.change.startsWith("-") ? "down" : "up"}>
          {idea.change}
        </span>
      </div>

      <div className="source-line">
        Source: {idea.source} · Timestamp: {idea.timestamp}
      </div>

      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={290}>
          <AreaChart data={chart}>
            <defs>
              <linearGradient id="demo-chart-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopOpacity={0.22} />
                <stop offset="100%" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="t" tickLine={false} axisLine={false} />
            <YAxis
              domain={["dataMin - 2", "dataMax + 2"]}
              tickLine={false}
              axisLine={false}
              width={48}
            />
            <Tooltip
              formatter={(value: number | string | undefined) => [
                `${String(value)} (demo)`,
                "Demo price",
              ]}
            />
            <Area
              type="monotone"
              dataKey="p"
              strokeWidth={2}
              fill="url(#demo-chart-gradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="stats">
        <Stat k="Market cap" v="Data unavailable" />
        <Stat k="Volume" v="Data unavailable" />
        <Stat k="P/E" v="Data unavailable" />
        <Stat k="RSI (14)" v="Data unavailable" />
      </div>
    </section>
  );
}

function AiSummaryCard({
  idea,
  onChallenge,
  challengeOpen,
}: {
  idea: TradeIdea;
  onChallenge: () => void;
  challengeOpen: boolean;
}) {
  return (
    <section className="card ai">
      <div className="card-title">
        <BrainCircuit size={19} />
        AI Analyst <DataBadge kind="DEMO DATA" />
      </div>

      <h2>Why might {idea.ticker} be interesting?</h2>

      <p className="summary">
        This is a transparent demo analysis template. It is not based on a
        connected provider and does not assert current market conditions.
      </p>

      <div className="evidence">
        <b>TECHNICAL</b>
        <span>{idea.technicalEvidence}</span>
      </div>

      <div className="evidence">
        <b>FUNDAMENTAL</b>
        <span>{idea.fundamentalEvidence}</span>
      </div>

      <div className="evidence">
        <b>CATALYST</b>
        <span>{idea.catalystEvidence}</span>
      </div>

      <div className="warning">
        <ShieldAlert size={17} />
        <span>
          <b>Invalidation:</b> {idea.invalidation}
        </span>
      </div>

      <button className="challenge" type="button" onClick={onChallenge}>
        Challenge this idea <ChevronRight size={16} />
      </button>

      {challengeOpen && <ChallengePanel idea={idea} />}
    </section>
  );
}

function ChallengePanel({ idea }: { idea: TradeIdea }) {
  return (
    <div className="challenge-panel">
      <strong>Challenge this idea</strong>
      <p>
        <b>Bear case:</b> The visible values are demo-only, so there is no
        evidence that this setup currently exists.
      </p>
      <p>
        <b>Counterarguments:</b> Price trend, liquidity, earnings, industry
        conditions, valuation, macro conditions, and news could all contradict
        a future thesis.
      </p>
      <p>
        <b>Missing information:</b> Timestamped quote data, reported financials,
        current filings, verified earnings timing, and source-backed news.
      </p>
      <p>
        <b>Possible invalidation:</b> {idea.invalidation}
      </p>
    </div>
  );
}

function TradeIdeasCard({
  ideas,
  onSelectTicker,
}: {
  ideas: TradeIdea[];
  onSelectTicker: (ticker: string) => void;
}) {
  return (
    <section className="card ideas">
      <div className="card-head">
        <div className="card-title">
          <Sparkles size={18} />
          Trade Ideas
        </div>
        <span className="muted">Demo templates</span>
      </div>

      <div className="idea-list">
        {ideas.length === 0 ? (
          <p className="empty-inline">
            No matching demo records. A source-backed search will be added with
            provider integration.
          </p>
        ) : (
          ideas.map((idea) => (
            <button
              className="idea"
              key={idea.ticker}
              type="button"
              onClick={() => onSelectTicker(idea.ticker)}
            >
              <div className="idea-top">
                <strong>{idea.ticker}</strong>
                <span
                  className={
                    idea.direction === "POTENTIAL SHORT"
                      ? "pill red"
                      : idea.direction === "WATCH"
                        ? "pill gray"
                        : "pill"
                  }
                >
                  {idea.direction}
                </span>
                <span
                  className={idea.change.startsWith("-") ? "down" : "up"}
                >
                  {idea.change}
                </span>
              </div>
              <div className="idea-reason">{idea.assumptions}</div>
              <small>Risk: {idea.risk}</small>
              <small className="idea-meta">
                {idea.source} · {idea.timestamp}
              </small>
            </button>
          ))
        )}
      </div>
    </section>
  );
}

function MarketNewsCard() {
  const placeholders = [
    {
      title: "Provider-backed financial news will appear here after integration",
      source: "Status: DEMO MODE · No news provider configured",
    },
    {
      title: "Government economic releases should cite official sources",
      source: "Preferred sources: Federal Reserve, BLS, BEA, Treasury",
    },
    {
      title: "Company filings should retain a link to the source record",
      source: "Preferred source: SEC EDGAR",
    },
    {
      title: "Full copyrighted news articles are not displayed in MarketPilot",
      source: "Use metadata, permitted excerpts, summaries, and source links",
    },
  ];

  return (
    <section className="card news">
      <div className="card-head">
        <div className="card-title">
          <Newspaper size={18} />
          Market News
        </div>
        <span className="muted">Sources required</span>
      </div>

      {placeholders.map((item) => (
        <News key={item.title} title={item.title} source={item.source} />
      ))}
    </section>
  );
}

function PaperPortfolioCard({
  orders,
  onOpenPaperTrade,
}: {
  orders: PaperOrder[];
  onOpenPaperTrade: () => void;
}) {
  return (
    <section className="card portfolio">
      <div className="card-head">
        <div className="card-title">
          <Wallet size={18} />
          Paper Portfolio
        </div>
        <button
          className="outline small"
          type="button"
          onClick={onOpenPaperTrade}
        >
          Open simulator
        </button>
      </div>

      <div className="portfolio-value">
        $100,000.00 <span className="muted">SIMULATED STARTING CASH</span>
      </div>

      <p className="portfolio-status">
        {orders.length === 0
          ? "No simulated orders recorded."
          : `${orders.length} simulated order${orders.length === 1 ? "" : "s"} recorded. All remain pending because demo data cannot provide fills.`}
      </p>

      <div className="bars">
        <div>
          <span>Cash</span>
          <i style={{ width: "100%" }} />
        </div>
        <div>
          <span>Positions</span>
          <i style={{ width: "0%" }} />
        </div>
        <div>
          <span>P/L</span>
          <i style={{ width: "0%" }} />
        </div>
      </div>
    </section>
  );
}

function PaperOrderModal({
  ticker,
  orderSide,
  orderType,
  quantity,
  onClose,
  onSetOrderSide,
  onSetOrderType,
  onSetQuantity,
  onSubmit,
}: {
  ticker: string;
  orderSide: OrderSide;
  orderType: OrderType;
  quantity: number;
  onClose: () => void;
  onSetOrderSide: (side: OrderSide) => void;
  onSetOrderType: (type: OrderType) => void;
  onSetQuantity: (quantity: number) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <section
        className="modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Paper trade ${ticker}`}
      >
        <button
          className="close"
          type="button"
          onClick={onClose}
          aria-label="Close paper-trading ticket"
        >
          <X />
        </button>

        <div className="eyebrow">SIMULATED / PAPER TRADE</div>
        <h2>Paper trade {ticker}</h2>
        <p>
          This creates a virtual order only. It does not connect to a brokerage
          or execute a real-money trade.
        </p>

        <div className="order-grid">
          <button
            className={orderSide === "LONG" ? "order long selected-order" : "order long"}
            type="button"
            onClick={() => onSetOrderSide("LONG")}
          >
            LONG
          </button>
          <button
            className={orderSide === "SHORT" ? "order short selected-order" : "order short"}
            type="button"
            onClick={() => onSetOrderSide("SHORT")}
          >
            SHORT
          </button>
        </div>

        <label>
          Shares
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(event) => onSetQuantity(Number(event.target.value))}
          />
        </label>

        <label>
          Order type
          <select
            value={orderType}
            onChange={(event) => onSetOrderType(event.target.value as OrderType)}
          >
            <option value="Market">Market</option>
            <option value="Limit">Limit</option>
            <option value="Stop">Stop</option>
            <option value="Stop-limit">Stop-limit</option>
          </select>
        </label>

        <div className="modal-status">
          <ShieldAlert size={16} />
          <span>
            Price status: <b>DEMO DATA / unavailable for fills.</b> The order
            will be recorded as pending and will not alter virtual cash,
            positions, or P/L.
          </span>
        </div>

        <button className="primary" type="button" onClick={onSubmit}>
          Explicitly place simulated order
        </button>

        <p className="modal-footnote">
          MarketPilot&apos;s AI and research components cannot execute orders.
          Real-money execution is not implemented.
        </p>
      </section>
    </div>
  );
}

function PageHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">MARKETPILOT RESEARCH</div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <DataBadge kind="DEMO DATA" />
    </div>
  );
}

function InfoCard({
  title,
  icon,
  body,
  source,
}: {
  title: string;
  icon: React.ReactNode;
  body: string;
  source: string;
}) {
  return (
    <section className="card info-card">
      <div className="card-title">
        {icon}
        {title}
      </div>
      <p>{body}</p>
      <div className="source-line">
        Source: {source} · Timestamp: {demoTimestamp}
      </div>
    </section>
  );
}

function EmptyState({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <section className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="source-line">
        Data status: unavailable · Timestamp: {demoTimestamp}
      </div>
    </section>
  );
}

function MetricCard({
  label,
  value,
  kind,
}: {
  label: string;
  value: string;
  kind: DataKind;
}) {
  return (
    <section className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <DataBadge kind={kind} />
      <small>Source: paper simulator · {demoTimestamp}</small>
    </section>
  );
}

function AnalysisRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="analysis-row">
      <strong>{label}</strong>
      <span>{value}</span>
    </div>
  );
}

function DataBadge({ kind }: { kind: DataKind }) {
  const className =
    kind === "SIMULATED"
      ? "data-badge simulated"
      : kind === "UNAVAILABLE"
        ? "data-badge unavailable"
        : "data-badge";

  return <span className={className}>{kind}</span>;
}

function Ticker({
  name,
  value,
  change,
  down = false,
}: {
  name: string;
  value: string;
  change: string;
  down?: boolean;
}) {
  return (
    <div className="ticker">
      <span>{name}</span>
      <strong>{value}</strong>
      <small className={down ? "down" : "up"}>{change}</small>
      <em>DEMO</em>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <small>{k}</small>
      <strong>{v}</strong>
    </div>
  );
}

function News({ title, source }: { title: string; source: string }) {
  return (
    <div className="news-item">
      <div>
        <strong>{title}</strong>
        <small>{source}</small>
      </div>
      <ChevronRight size={17} />
    </div>
  );
}
