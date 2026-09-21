"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { ApiResponse } from "@/lib/contracts/api";
import type { ProviderStatus } from "@/lib/contracts/market-data";
import type {
  PaperAccountSnapshot,
  PaperOrderRecord,
} from "@/lib/contracts/paper-trading";
import { AppShell } from "@/components/AppShell";
import { AiAnalystView } from "@/components/AiAnalystView";
import { AiSummaryCard } from "@/components/AiSummaryCard";
import { EducationView } from "@/components/EducationView";
import { MarketNewsCard } from "@/components/MarketNewsCard";
import { PaperOrderModal } from "@/components/PaperOrderModal";
import { PaperPortfolioCard } from "@/components/PaperPortfolioCard";
import { PaperTradingView } from "@/components/PaperTradingView";
import {
  BacktestingView,
  EarningsView,
  FilingsView,
  InsidersView,
  MarketsView,
  NewsView,
  ScreenerView,
  SectorsView,
  SettingsView,
  StockView,
  WatchlistsView,
} from "@/components/ResearchPages";
import { StockSummaryCard } from "@/components/StockSummaryCard";
import { TradeIdeasCard } from "@/components/TradeIdeasCard";
import { marketTickerData, tradeIdeas } from "@/lib/demo-data";
import type { OrderSide, OrderType } from "@/lib/types";

type CreateOrderResponse = {
  order: PaperOrderRecord;
  message: string;
};

type CancelOrderResponse = {
  order: PaperOrderRecord;
  account: PaperAccountSnapshot;
  message: string;
};

export default function Home() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [query, setQuery] = useState("");
  const [selectedTicker, setSelectedTicker] = useState("NVDA");
  const [paperOpen, setPaperOpen] = useState(false);
  const [challengeOpen, setChallengeOpen] = useState(false);

  const [orderSide, setOrderSide] = useState<OrderSide>("LONG");
  const [orderType, setOrderType] = useState<OrderType>("Market");
  const [quantity, setQuantity] = useState(10);

  const [paperAccount, setPaperAccount] =
    useState<PaperAccountSnapshot | null>(null);
  const [paperLoading, setPaperLoading] = useState(true);
  const [paperSubmitting, setPaperSubmitting] = useState(false);
  const [paperError, setPaperError] = useState<string | null>(null);
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(
    null,
  );

  const [providerStatus, setProviderStatus] = useState<ProviderStatus | null>(
    null,
  );
  const [providerStatusLoading, setProviderStatusLoading] = useState(true);

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

  const loadPaperAccount = useCallback(async () => {
    setPaperLoading(true);

    try {
      const response = await fetch("/api/paper/account", {
        cache: "no-store",
      });

      const payload = (await response.json()) as ApiResponse<PaperAccountSnapshot>;

      if (!response.ok || !payload.ok) {
        throw new Error(
          payload.ok
            ? "The paper account could not be loaded."
            : payload.error.message,
        );
      }

      setPaperAccount(payload.data);
      setPaperError(null);
    } catch (error) {
      setPaperError(
        error instanceof Error
          ? error.message
          : "The paper account could not be loaded.",
      );
    } finally {
      setPaperLoading(false);
    }
  }, []);

  const loadProviderStatus = useCallback(async () => {
    setProviderStatusLoading(true);

    try {
      const response = await fetch("/api/market/status", {
        cache: "no-store",
      });

      const payload = (await response.json()) as ApiResponse<ProviderStatus>;

      if (!response.ok || !payload.ok) {
        throw new Error(
          payload.ok
            ? "Market-data provider status could not be loaded."
            : payload.error.message,
        );
      }

      setProviderStatus(payload.data);
    } catch {
      setProviderStatus(null);
    } finally {
      setProviderStatusLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPaperAccount();
    void loadProviderStatus();
  }, [loadPaperAccount, loadProviderStatus]);

  async function createPaperOrder() {
    const normalizedQuantity = Math.max(1, Math.floor(Number(quantity) || 1));

    setPaperSubmitting(true);
    setPaperError(null);

    try {
      const response = await fetch("/api/paper/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticker: selectedTicker,
          side: orderSide,
          orderType,
          quantity: normalizedQuantity,
        }),
      });

      const payload = (await response.json()) as ApiResponse<CreateOrderResponse>;

      if (!response.ok || !payload.ok) {
        throw new Error(
          payload.ok
            ? "The simulated order could not be created."
            : formatApiError(payload.error.message, payload.error.details),
        );
      }

      await loadPaperAccount();
      setPaperOpen(false);
      setActivePage("Paper Trade");
    } catch (error) {
      setPaperError(
        error instanceof Error
          ? error.message
          : "The simulated order could not be created.",
      );
    } finally {
      setPaperSubmitting(false);
    }
  }

  async function cancelPaperOrder(orderId: string) {
    setCancellingOrderId(orderId);
    setPaperError(null);

    try {
      const response = await fetch(`/api/paper/orders/${orderId}`, {
        method: "DELETE",
      });

      const payload = (await response.json()) as ApiResponse<CancelOrderResponse>;

      if (!response.ok || !payload.ok) {
        throw new Error(
          payload.ok
            ? "The simulated order could not be cancelled."
            : formatApiError(payload.error.message, payload.error.details),
        );
      }

      setPaperAccount(payload.data.account);
    } catch (error) {
      setPaperError(
        error instanceof Error
          ? error.message
          : "The simulated order could not be cancelled.",
      );
    } finally {
      setCancellingOrderId(null);
    }
  }

  function handleNavigate(page: string) {
    setActivePage(page);
    setChallengeOpen(false);
  }

  function openPaperTrade() {
    setPaperError(null);
    setPaperOpen(true);
  }

  function renderDashboard() {
    return (
      <>
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

        <div className="grid">
          <StockSummaryCard
            idea={selectedIdea}
            onOpenPaperTrade={openPaperTrade}
          />

          <AiSummaryCard
            idea={selectedIdea}
            onChallenge={() => setChallengeOpen((current) => !current)}
            challengeOpen={challengeOpen}
          />

          <TradeIdeasCard
            ideas={filteredIdeas}
            onSelectTicker={setSelectedTicker}
          />

          <MarketNewsCard />

          <PaperPortfolioCard
            account={paperAccount}
            loading={paperLoading}
            onOpenPaperTrade={openPaperTrade}
          />
        </div>
      </>
    );
  }

  function renderActivePage() {
    switch (activePage) {
      case "Dashboard":
        return renderDashboard();

      case "Markets":
        return (
          <MarketsView
            providerStatus={providerStatus}
            providerStatusLoading={providerStatusLoading}
          />
        );

      case "Stocks":
        return (
          <StockView
            selectedIdea={selectedIdea}
            onOpenPaperTrade={openPaperTrade}
            onChallenge={() => setChallengeOpen((current) => !current)}
            challengeOpen={challengeOpen}
            providerStatus={providerStatus}
            providerStatusLoading={providerStatusLoading}
          />
        );

      case "Watchlists":
        return <WatchlistsView />;

      case "Portfolio":
      case "Paper Trade":
        return (
          <PaperTradingView
            account={paperAccount}
            loading={paperLoading}
            error={paperError}
            cancellingOrderId={cancellingOrderId}
            onOpenPaperTrade={openPaperTrade}
            onCancelOrder={cancelPaperOrder}
          />
        );

      case "News":
        return <NewsView />;

      case "Filings":
        return <FilingsView />;

      case "Earnings":
        return <EarningsView />;

      case "Insiders":
        return <InsidersView />;

      case "Sectors":
        return <SectorsView />;

      case "Screener":
        return <ScreenerView />;

      case "Backtesting":
        return <BacktestingView />;

      case "Education":
        return <EducationView />;

      case "AI Analyst":
        return (
          <AiAnalystView
            selectedIdea={selectedIdea}
            onOpenPaperTrade={openPaperTrade}
            onChallenge={() => setChallengeOpen((current) => !current)}
            challengeOpen={challengeOpen}
            providerStatus={providerStatus}
            providerStatusLoading={providerStatusLoading}
          />
        );

      case "Settings":
        return (
          <SettingsView
            providerStatus={providerStatus}
            providerStatusLoading={providerStatusLoading}
          />
        );

      default:
        return renderDashboard();
    }
  }

  return (
    <>
      <AppShell
        activePage={activePage}
        query={query}
        onQueryChange={setQuery}
        onNavigate={handleNavigate}
      >
        {renderActivePage()}
      </AppShell>

      {paperOpen && (
        <PaperOrderModal
          ticker={selectedTicker}
          orderSide={orderSide}
          orderType={orderType}
          quantity={quantity}
          submitting={paperSubmitting}
          error={paperError}
          onClose={() => {
            if (!paperSubmitting) {
              setPaperOpen(false);
              setPaperError(null);
            }
          }}
          onSetOrderSide={setOrderSide}
          onSetOrderType={setOrderType}
          onSetQuantity={setQuantity}
          onSubmit={createPaperOrder}
        />
      )}
    </>
  );
}

function formatApiError(
  message: string,
  details?: Record<string, string>,
) {
  if (!details || Object.keys(details).length === 0) {
    return message;
  }

  return `${message} ${Object.values(details).join(" ")}`;
}
