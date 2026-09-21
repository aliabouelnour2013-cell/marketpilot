import { CircleDollarSign, Wallet } from "lucide-react";

import type { PaperOrder } from "@/lib/types";

import { DataBadge } from "./DataBadge";
import { EmptyState } from "./EmptyState";
import { PageHeading } from "./PageHeading";

function MetricCard({
  label,
  value,
  kind,
}: {
  label: string;
  value: string;
  kind: "SIMULATED" | "UNAVAILABLE";
}) {
  return (
    <section className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <DataBadge kind={kind} />
      <small>
        Source: paper simulator · Demo data loaded with the application
      </small>
    </section>
  );
}

export function PaperTradingView({
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

        <MetricCard
          label="Portfolio value"
          value="$100,000.00"
          kind="SIMULATED"
        />

        <MetricCard label="Realized P/L" value="$0.00" kind="SIMULATED" />

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

          <button
            className="outline small"
            type="button"
            onClick={onOpenPaperTrade}
          >
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
