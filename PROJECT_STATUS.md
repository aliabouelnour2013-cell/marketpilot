# MarketPilot Project Status

## Current
- Next.js + React + TypeScript foundation (build + lint green)
- Dark financial-terminal UI
- Dashboard, market ticker cards, stock chart, trade ideas
- Paper-trading simulator UI + working API (in-memory; orders stay pending
  until a verified quote provider is wired)
- AI Analyst interface + Premium AI analysis powered by Google Gemini —
  grounded output split into Facts / Interpretation / Uncertainty / Risks,
  never presented as financial advice
- PostgreSQL + Prisma schema (`User`, `Subscription`)
- Email/password authentication (Auth.js v5, JWT sessions, rate-limited
  signup/login, bcrypt hashes)
- Stripe billing: Premium Monthly ($15) / Premium Yearly ($120), hosted
  checkout, customer portal, signature-verified webhooks
- Pricing page (`/pricing` + in-app Pricing view), login page (`/login`),
  auth-aware topbar, premium gates on the AI Analyst
- GitHub-ready configuration

## Setup required (local/dev)
1. Start Postgres: `docker compose up -d` (or use a hosted Postgres) and set
   `DATABASE_URL` in `.env.local`.
2. `npx prisma migrate dev` — creates the `users` and `subscriptions` tables.
3. `npx auth secret` — writes `AUTH_SECRET` to `.env.local`.
4. Add Stripe + Gemini keys to `.env.local` (see `.env.example`). Keys stay
   in the environment — never commit them.
5. In the Stripe dashboard, create the "MarketPilot Premium" product with
   monthly ($15) and yearly ($120) prices; copy the price ids into
   `STRIPE_PRICE_ID_PREMIUM_MONTHLY` / `STRIPE_PRICE_ID_PREMIUM_YEARLY`.
6. For local webhooks: `stripe listen --forward-to localhost:3000/api/billing/webhook`
   and copy the printed signing secret into `STRIPE_WEBHOOK_SECRET`.

## Next
- Real market-data adapters (Alpha Vantage, Alpaca)
- SEC/EDGAR adapter
- News adapter
- Earnings/insider/institutional data
- Persistent paper-trading engine (Prisma-backed, per-user)
- Technical-indicator calculations
- Screener
- Backtesting
- Alerts
- Email verification + password reset (needs an email provider)
- Automated tests
- Deployment configuration

## Data safety
The current frontend uses clearly labeled demo values. Do not present demo values as live market data.
