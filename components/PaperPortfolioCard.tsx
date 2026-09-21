import { Wallet } from "lucide-react";

import type { PaperOrder } from "@/lib/types";

export function PaperPortfolioCard({
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
