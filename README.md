# MarketPilot

A dark, AI-assisted market research terminal with paper trading.

## Included in this starter
- Market dashboard
- Index/market ticker cards
- Stock chart
- AI Analyst panel
- Trade Ideas with LONG / SHORT / WATCH labels
- Evidence, risks, and invalidation conditions
- Paper portfolio
- Simulated order modal
- News/filing placeholders
- Responsive UI

## Run locally

Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Next build steps
1. Add authentication.
2. Add a PostgreSQL database.
3. Add provider adapters for market data.
4. Add SEC/news ingestion.
5. Add real-time quote streaming.
6. Replace demo values with timestamped provider data.
7. Add persistent paper orders and P/L calculations.
8. Add the AI Analyst backend with source citations.
9. Add backtesting and risk analytics.
10. Keep any real-money brokerage execution isolated, disabled by default, and behind explicit user controls.

The current UI intentionally uses demo data so it cannot be mistaken for a live trading feed.
