"use client";

import { useMemo, useState } from "react";

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
import type { OrderSide, OrderType, PaperOrder } from "@/lib/types";

export default function Home() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [query, setQuery] = useState("");
  const [selectedTicker, setSelectedTicker] = useState("NVDA");
  const [paperOpen, setPaperOpen] = useState(false);
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

  function createPaperOrder() {
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
    setActivePage("Paper Trade");
  }

  function handleNavigate(page: string) {
    setActivePage(page);
    setChallengeOpen(false);
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
            onOpenPaperTrade={() => setPaperOpen(true)}
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
            orders={orders}
            onOpenPaperTrade={() => setPaperOpen(true)}
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
        return <MarketsView />;

      case "Stocks":
        return (
          <StockView
            selectedIdea={selectedIdea}
            onOpenPaperTrade={() => setPaperOpen(true)}
            onChallenge={() => setChallengeOpen((current) => !current)}
            challengeOpen={challengeOpen}
          />
        );

      case "Watchlists":
        return <WatchlistsView />;

      case "Portfolio":
      case "Paper Trade":
        return (
          <PaperTradingView
            orders={orders}
            onOpenPaperTrade={() => setPaperOpen(true)}
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
            onOpenPaperTrade={() => setPaperOpen(true)}
            onChallenge={() => setChallengeOpen((current) => !current)}
            challengeOpen={challengeOpen}
          />
        );

      case "Settings":
        return <SettingsView />;

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
          onClose={() => setPaperOpen(false)}
          onSetOrderSide={setOrderSide}
          onSetOrderType={setOrderType}
          onSetQuantity={setQuantity}
          onSubmit={createPaperOrder}
        />
      )}
    </>
  );
}
