# MarketPilot

MarketPilot is a dark, AI-assisted market-research and **paper-trading** application. It is designed around one principle:

> Show the available evidence, disclose uncertainty and risks, preserve sources and timestamps, and let the user decide.

MarketPilot is **not** a real-money brokerage application. It must never submit, route, or execute a brokerage order.

## Current status

This repository currently contains a stable **Phase 1 frontend prototype** built with:

- Next.js App Router
- React
- TypeScript
- Recharts
- Lucide React icons

The current application runs in **DEMO MODE**. No live market-data, SEC, news, earnings, brokerage, authentication, database, or AI-provider connection is configured.

All market prices, charts, market-index values, trade ideas, portfolio values, example headlines, and company references in the prototype are clearly labeled as:

- `DEMO DATA`
- `SIMULATED`
- `UNAVAILABLE`

They are illustrative interface content only. They must not be interpreted as current, delayed, reported, estimated, or investment-recommendation data.

## Included in Phase 1

- Responsive dark financial-terminal UI
- Dashboard navigation
- Market overview placeholders
- Stock research view
- Demo-only chart with visible data status
- Transparent AI Analyst template
- Trade Idea cards with:
  - Direction
  - Timeframe
  - Evidence categories
  - Assumptions
  - Risks
  - Invalidation conditions
  - Uncertainty
  - Source label
  - Timestamp label
- Mandatory “Challenge this idea” panel
- Paper-trading order ticket
- Local in-browser simulated order history
- Explicit simulated / paper-trading labels
- News, filings, earnings, screener, watchlist, education, settings, and portfolio placeholder views
- Responsive desktop, tablet, and mobile layouts
- No real-money execution path

## Run locally

### Requirements

- Node.js 20.9 or later
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Validate the production build

```bash
npm run lint
npm run build
npm run start
```

## Data safety rules

MarketPilot must follow these rules as development continues:

1. Never fabricate market prices, quotes, volume, historical candles, financial statements, SEC filings, earnings dates, insider transactions, institutional ownership, news, sources, or citations.
2. If no verified provider data is available, display `Data unavailable`.
3. If a feed is delayed, state that it is delayed and show the retrieval timestamp.
4. Distinguish these categories everywhere in the product:
   - Reported data
   - Calculated data
   - Estimated data
   - AI interpretation
   - Demo data
   - Unavailable data
5. Retain source, retrieval timestamp, effective/as-of date when different, and data status for important observations.
6. Keep API keys server-side. Never expose provider credentials in browser code or commit secrets to Git.
7. Use primary sources where possible:
   - SEC EDGAR
   - Federal Reserve
   - Bureau of Labor Statistics
   - Bureau of Economic Analysis
   - U.S. Treasury
   - CFTC
   - FINRA
   - Exchange-published information, subject to entitlement
   - Company investor-relations websites and company filings
8. Do not copy copyrighted news articles in full. Use permitted metadata, short excerpts, summaries, and source links.
9. Do not claim guaranteed returns, certainty, risk-free outcomes, or individualized financial advice.

## Paper-trading rules

MarketPilot is **paper trading only**.

The default virtual account is:

```text
$100,000.00 virtual cash
```

The Phase 1 simulator can create a local pending simulated order. It does not produce fills because no timestamped market-data provider is connected.

A future paper-trading engine must support:

- Market orders
- Limit orders
- Stop orders
- Stop-limit orders
- Long positions
- Carefully modeled short positions, if enabled
- Simulated commissions and slippage
- Orders, fills, positions, transactions, and cash ledger
- Cost basis and average entry
- Realized and unrealized P/L
- Portfolio value, allocations, returns, and drawdown
- Historical order and portfolio records

Every relevant view must visibly state:

```text
SIMULATED / PAPER TRADE
```

## Real-money execution policy

Real-money brokerage execution is **not implemented** and must remain outside this application.

A future architecture, if ever approved, must follow this separation:

```text
AI analysis
↓
Trade Idea
↓
User review
↓
Separate execution module
↓
Explicit user confirmation
↓
Brokerage API
```

The AI Analyst and Trade Idea system must never directly execute, submit, or route an order.

Any future execution service must:

- Be deployed separately
- Be disabled by default
- Require separate authentication and authorization
- Require explicit final user confirmation
- Keep audit logs
- Use idempotency protections
- Not be reachable by the AI analysis service

## Planned development phases

### Phase 1 — Audit and stabilize

- Preserve the existing visual direction
- Correct misleading live-data claims
- Clearly label all demo values
- Make the single-page navigation functional
- Make the local paper-order flow functional
- Preserve paper-trading-only safeguards

### Phase 2 — Frontend architecture

- Split the current page into reusable components
- Add scalable route structure
- Expand navigation for Markets, Stocks, Watchlists, Portfolio, Paper Trade, News, Filings, Earnings, Insiders, Sectors, Screener, Backtesting, Education, AI Analyst, and Settings

### Phase 3 — Backend, API, and database

- PostgreSQL
- Prisma or equivalent ORM
- Authentication architecture
- Users, watchlists, alerts, saved screens
- Paper portfolios, positions, orders, fills, and transactions
- Immutable AI analysis and Trade Idea records

### Phase 4 — Market-data adapters

- Provider abstraction layer
- Demo fallback when no provider is configured
- Server-side quote and historical OHLCV adapters
- Company profiles, fundamentals, earnings, news, filings, insider activity, institutional data, and economic calendar
- Primary-source adapters for SEC and government economic data

### Phase 5 — Analytics

Technical calculations:

- SMA
- EMA
- RSI
- MACD
- Bollinger Bands
- VWAP
- ATR
- OBV
- Volume analysis
- Support and resistance
- Volatility
- Beta
- Drawdown

Fundamental calculations:

- Revenue
- Gross profit
- Operating income
- Net income
- EPS
- Operating cash flow
- Free cash flow
- Capital expenditures
- Cash, debt, assets, and equity
- P/E, forward P/E, PEG, P/S, P/B, EV/EBITDA
- Debt/equity, current ratio, quick ratio
- ROE, ROA, margins, and FCF margin

All values must identify whether they are reported, calculated, estimated, or unavailable.

### Phase 6 — Transparent AI Analyst

Every source-backed future analysis should contain:

- Summary
- Facts
- Data status
- Technical context
- Fundamental context
- Catalysts
- Assumptions
- Risks
- Invalidation
- Uncertainties
- Sources
- Timestamp

AI output must not invent sources, prices, filings, earnings values, events, or evidence.

### Phase 7 — Full paper-trading engine

- Virtual ledger
- Order lifecycle and fill logic
- Price timestamp validation
- Cash, positions, P/L, and returns
- Persistent order history
- Portfolio analytics
- Simulation disclosures

### Phase 8 — Research tools

- Watchlists and alerts
- Stock screener
- Company comparison
- News
- SEC filings
- Earnings
- Insider activity
- Institutional ownership where legally available
- Sectors
- Economic calendar

### Phase 9 — Backtesting

Educational historical simulations for:

- Buy and hold
- Moving-average crossovers
- RSI
- MACD
- Custom rules

Metrics:

- Total return
- Annualized return
- Maximum drawdown
- Sharpe ratio
- Win rate
- Number of trades
- Profit factor

Backtesting must prevent look-ahead bias and clearly state that results are historical simulations, not actual trading outcomes.

### Phase 10 — Education

Beginner, intermediate, and advanced lessons covering:

- Stocks and ETFs
- Market structure
- Technical analysis
- Fundamentals and valuation
- Risk management
- Portfolio construction and position sizing
- Options concepts
- Backtesting
- Macroeconomics

Planned educational calculators and simulations:

- Compounding
- Allocation
- Volatility
- Dollar-cost averaging
- Drawdown
- Risk/reward
- Position sizing
- Moving averages
- RSI
- MACD
- DCF
- Monte Carlo

## Environment variables

Use `.env.local` for local secrets. Never commit it.

```env
# Database
DATABASE_URL=

# Server-side providers only
SEC_API_KEY=
MARKET_DATA_API_KEY=
NEWS_API_KEY=
AI_API_KEY=
```

Do not use `NEXT_PUBLIC_` for secrets. Browser-exposed environment variables are not appropriate for provider credentials.

## Contributing

1. Create a branch for the change.
2. Keep secrets out of Git.
3. Run `npm install`.
4. Run `npm run lint`.
5. Run `npm run build`.
6. Test affected functionality.
7. Update documentation when behavior or data status changes.
8. Open a pull request with a concise summary.

MarketPilot must continue to distinguish demo data, provider data, calculated data, reported data, estimated data, unavailable data, and AI interpretation.
