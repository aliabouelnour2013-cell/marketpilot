import { Wallet } from "lucide-react";

import type { PaperAccountSnapshot } from "@/lib/contracts/paper-trading";

function formatMoney(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function PaperPortfolioCard({
  account,
  loading,
  onOpenPaperTrade,
}: {
  account: PaperAccountSnapshot | null;
  loading: boolean;
  onOpenPaperTrade: () => void;
}) {
  const orders = account?.orders ?? [];

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

      {loading || !account ? (
        <div className="portfolio-value">
          <span className="muted">Loading simulated account…</span>
        </div>
      ) : (
        <>
          <div className="portfolio-value">
            {formatMoney(account.portfolioValue)}{" "}
            <span className="muted">SIMULATED PORTFOLIO VALUE</span>
          </div>

          <p className="portfolio-status">
            {orders.length === 0
              ? `No simulated orders recorded. ${formatMoney(account.virtualCash)} virtual cash available.`
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
        </>
      )}
    </section>
  );
}
