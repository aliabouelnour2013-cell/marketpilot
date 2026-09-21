import type { ReactNode } from "react";
import {
  Activity,
  BarChart3,
  CalendarDays,
  FileText,
  Newspaper,
  ShieldAlert,
  SlidersHorizontal,
  TrendingUp,
  Users,
} from "lucide-react";

import {
  demoSource,
  demoTimestamp,
  marketPlaceholderCards,
  marketTickerData,
  screenerFilters,
} from "@/lib/demo-data";
import type { ProviderStatus } from "@/lib/contracts/market-data";
import type { TradeIdea } from "@/lib/types";

import { AiSummaryCard } from "./AiSummaryCard";
import { DataBadge } from "./DataBadge";
import { EmptyState } from "./EmptyState";
import { PageHeading } from "./PageHeading";
import { StockSummaryCard } from "./StockSummaryCard";

function InfoCard({
  title,
  icon,
  body,
  source,
}: {
  title: string;
  icon: ReactNode;
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

function TickerRow() {
  return (
    <div className="ticker-row">
      {marketTickerData.map((ticker) => (
        <div className="ticker" key={ticker.name}>
          <span>{ticker.name}</span>
          <strong>{ticker.value}</strong>
          <small className={ticker.down ? "down" : "up"}>
            {ticker.change}
          </small>
          <em>DEMO</em>
        </div>
      ))}
    </div>
  );
}

function DataProviderStatusCard({
  providerStatus,
  loading,
}: {
  providerStatus: ProviderStatus | null;
  loading: boolean;
}) {
  return (
    <section className="card provider-status-card">
      <div className="card-head">
        <div className="card-title">
          <Activity size={18} />
          Data-provider architecture
          <DataBadge kind="DEMO DATA" />
        </div>
      </div>

      {loading ? (
        <p className="provider-status-copy">
          Checking the server-side market-data status endpoint...
        </p>
      ) : providerStatus ? (
        <>
          <p className="provider-status-copy">{providerStatus.message}</p>

          <div className="provider-grid">
            <ProviderRow label="Quotes" value={providerStatus.quoteProvider} />
            <ProviderRow
              label="Historical prices"
              value={providerStatus.historicalPriceProvider}
            />
            <ProviderRow
              label="Fundamentals"
              value={providerStatus.fundamentalsProvider}
            />
            <ProviderRow
              label="SEC filings"
              value={providerStatus.filingsProvider}
            />
            <ProviderRow label="News" value={providerStatus.newsProvider} />
            <ProviderRow
              label="Earnings"
              value={providerStatus.earningsProvider}
            />
          </div>

          <div className="source-line">
            Source: {providerStatus.metadata.source} · Timestamp:{" "}
            {new Date(providerStatus.metadata.retrievedAt).toLocaleString()} ·
            Status: {providerStatus.metadata.status}
          </div>
        </>
      ) : (
        <p className="provider-status-copy">
          Provider status is unavailable. MarketPilot must continue displaying
          demo or unavailable data rather than claiming live coverage.
        </p>
      )}
    </section>
  );
}

function ProviderRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="provider-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function MarketsView({
  providerStatus,
  providerStatusLoading,
}: {
  providerStatus: ProviderStatus | null;
  providerStatusLoading: boolean;
}) {
  const marketIcons = [
    <Activity key="activity" size={19} />,
    <BarChart3 key="bar-chart" size={19} />,
    <CalendarDays key="calendar" size={19} />,
  ];

  return (
    <section className="page-section">
      <PageHeading
        title="Markets"
        description="Market overview cards are intentionally in demo mode until a licensed or approved data source is connected."
      />

      <TickerRow />

      <DataProviderStatusCard
        providerStatus={providerStatus}
        loading={providerStatusLoading}
      />

      <div className="three-column-grid lower-grid">
        {marketPlaceholderCards.map((card, index) => (
          <InfoCard
            key={card.title}
            title={card.title}
            icon={marketIcons[index]}
            body={card.body}
            source={card.source}
          />
        ))}
      </div>
    </section>
  );
}

export function StockView({
  selectedIdea,
  onOpenPaperTrade,
  onChallenge,
  challengeOpen,
  providerStatus,
  providerStatusLoading,
}: {
  selectedIdea: TradeIdea;
  onOpenPaperTrade: () => void;
  onChallenge: () => void;
  challengeOpen: boolean;
  providerStatus: ProviderStatus | null;
  providerStatusLoading: boolean;
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

      <div className="lower-grid">
        <DataProviderStatusCard
          providerStatus={providerStatus}
          loading={providerStatusLoading}
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

export function WatchlistsView() {
  return (
    <section className="page-section">
      <PageHeading
        title="Watchlists"
        description="Watchlist persistence is planned for the database phase. The current prototype does not store user data."
      />

      <EmptyState
        icon={<Activity size={24} />}
        title="No saved watchlists"
        body="Create watchlists after authentication and database persistence are implemented. In demo mode, no symbols are stored locally as a user portfolio or recommendation."
      />
    </section>
  );
}

export function NewsView() {
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

export function FilingsView() {
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

export function EarningsView() {
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

export function InsidersView() {
  return (
    <section className="page-section">
      <PageHeading
        title="Insider Activity"
        description="Insider activity must come from source-backed records such as SEC ownership filings and must include filing dates, transaction dates, and source links."
      />

      <EmptyState
        icon={<Users size={24} />}
        title="No source-backed insider transactions loaded"
        body="No Form 3, Form 4, or Form 5 data is currently retrieved. This interface intentionally does not invent insider activity."
      />
    </section>
  );
}

export function SectorsView() {
  return (
    <section className="page-section">
      <PageHeading
        title="Sectors"
        description="Sector performance, constituent data, relative strength, and breadth require an approved market-data source."
      />

      <div className="three-column-grid">
        <InfoCard
          title="Sector performance"
          icon={<TrendingUp size={19} />}
          body="No sector returns are displayed because no live or delayed data source is configured."
          source={demoSource}
        />

        <InfoCard
          title="Relative strength"
          icon={<BarChart3 size={19} />}
          body="Relative-strength calculations require a timestamped benchmark and sector price series."
          source="Market-data adapter not configured"
        />

        <InfoCard
          title="Sector breadth"
          icon={<Activity size={19} />}
          body="Advance/decline and new-high/new-low measures are unavailable until source-backed constituents and pricing are available."
          source="Market-data adapter not configured"
        />
      </div>
    </section>
  );
}

export function ScreenerView() {
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
          {screenerFilters.map((filter) => (
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

export function BacktestingView() {
  return (
    <section className="page-section">
      <PageHeading
        title="Backtesting"
        description="Historical strategy simulation is not implemented yet. Future backtests must prevent look-ahead bias and clearly distinguish simulation from actual trading results."
      />

      <EmptyState
        icon={<BarChart3 size={24} />}
        title="No historical simulation is available"
        body="Future educational backtests may support buy-and-hold, moving-average crossover, RSI, MACD, and custom rule strategies. Results must show assumptions, data source, date range, transaction model, slippage, commissions, and methodology."
      />
    </section>
  );
}

export function SettingsView({
  providerStatus,
  providerStatusLoading,
}: {
  providerStatus: ProviderStatus | null;
  providerStatusLoading: boolean;
}) {
  return (
    <section className="page-section">
      <PageHeading
        title="Settings"
        description="Secrets, provider credentials, and user settings should be stored server-side only after authentication and database persistence are implemented."
      />

      <DataProviderStatusCard
        providerStatus={providerStatus}
        loading={providerStatusLoading}
      />

      <div className="three-column-grid lower-grid">
        <InfoCard
          title="Data providers"
          icon={<Activity size={19} />}
          body="No provider is configured. The frontend must never contain provider API keys."
          source="Status: DEMO MODE"
        />

        <InfoCard
          title="Account"
          icon={<Users size={19} />}
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
