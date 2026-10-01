#!/usr/bin/env bash
# MarketPilot local setup — one command:  bash scripts/setup.sh
#
# Does everything needed before "npm run dev":
#   1. Starts PostgreSQL (docker compose)
#   2. Makes sure DATABASE_URL is in .env.local
#   3. Runs Prisma migrations
#   4. Auto-sets NEXT_PUBLIC_APP_URL when running in a GitHub Codespace
#
# Still on you (one time each):
#   - Fill in Stripe keys in .env.local (see .env.example)
#   - Run:  stripe listen --forward-to localhost:3000/api/billing/webhook
#   - Run:  npm run dev
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> 1/4  Starting PostgreSQL..."
docker compose up -d >/dev/null

echo "==> 2/4  Waiting for the database..."
for _ in $(seq 1 30); do
  if docker compose exec -T postgres pg_isready -U marketpilot >/dev/null 2>&1; then
    break
  fi
  sleep 1
done
docker compose exec -T postgres pg_isready -U marketpilot >/dev/null \
  || { echo "ERROR: PostgreSQL did not become ready."; exit 1; }

echo "==> 3/4  Checking .env.local..."
touch .env.local
DEFAULT_DB_URL="postgresql://marketpilot:marketpilot@localhost:5432/marketpilot"
if ! grep -q "^DATABASE_URL=" .env.local; then
  echo "DATABASE_URL=$DEFAULT_DB_URL" >> .env.local
  echo "    Added default DATABASE_URL (docker PostgreSQL)."
fi
export DATABASE_URL
DATABASE_URL="$(grep "^DATABASE_URL=" .env.local | cut -d= -f2-)"
export DATABASE_URL

# Auto-detect the Codespace forwarded URL so Stripe redirects work.
if [ -n "${CODESPACE_NAME:-}" ]; then
  FWD_URL="https://${CODESPACE_NAME}-3000.app.github.dev"
  if grep -q "^NEXT_PUBLIC_APP_URL=" .env.local; then
    sed -i "s|^NEXT_PUBLIC_APP_URL=.*|NEXT_PUBLIC_APP_URL=$FWD_URL|" .env.local
  else
    echo "NEXT_PUBLIC_APP_URL=$FWD_URL" >> .env.local
  fi
  echo "    NEXT_PUBLIC_APP_URL=$FWD_URL"
fi

echo "==> 4/4  Running Prisma migrations..."
npx prisma migrate dev --name init

echo ""
echo "All done. Now run these two commands in separate terminals:"
echo "    stripe listen --forward-to localhost:3000/api/billing/webhook"
echo "        -> copy the whsec_... it prints into .env.local as STRIPE_WEBHOOK_SECRET"
echo "    npm run dev"
echo ""
echo "Then open the app, sign up, and subscribe with card 4242 4242 4242 4242."
