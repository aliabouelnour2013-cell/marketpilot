import { CircleDollarSign, Wallet, XCircle } from "lucide-react";

import type { PaperAccountSnapshot } from "@/lib/contracts/paper-trading";

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
      <small>Source: paper simulator · DEMO MODE</small>
    </section>
  );
}

export function PaperTradingView({
  account,
  loading,
  error,
  cancellingOrderId,
  onOpenPaperTrade,
  onCancelOrder,
}: {
  account: PaperAccountSnapshot | null;
  loading: boolean;
  error: string | null;
  cancellingOrderId: string | null;
  onOpenPaperTrade: () => void;
  onCancelOrder: (orderId: string) => void;
}) {
  const orders = account?.orders ?? [];

  return (
    <section className="page-section">
      <PageHeading
        title="Paper Trading"
        description="SIMULATED / PAPER TRADE ONLY. No order is sent to a brokerage, and no simulated order can fill without a timestamped market-data source."
      />

      <div className="paper-overview">
        <MetricCard
          label="Virtual cash"
          value={account ? formatCurrency(account.virtualCash) : "Loading..."}
          kind="SIMULATED"
        />

        <MetricCard
          label="Portfolio value"
          value={account ? formatCurrency(account.portfolioValue) : "Loading..."}
          kind="SIMULATED"
        />

        <MetricCard
          label="Realized P/L"
          value={
            account ? formatCurrency(account.realizedProfitLoss) : "Loading..."
          }
          kind="SIMULATED"
        />

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
            <DataBadge kind="SIMULATED" />
          </div>

          <button
            className="outline small"
            type="button"
            onClick={onOpenPaperTrade}
          >
            New simulated order
          </button>
        </div>

        {error && (
          <div className="form-error paper-page-error" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-state">Loading server-side demo paper account...</div>
        ) : orders.length === 0 ? (
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
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => {
                  const isPending =
                    order.status === "PENDING — DEMO DATA REQUIRED";
                  const isCancelling = cancellingOrderId === order.id;

                  return (
                    <tr key={order.id}>
                      <td>{formatTimestamp(order.createdAt)}</td>
                      <td>{order.ticker}</td>
                      <td>{order.side}</td>
                      <td>{order.orderType}</td>
                      <td>{order.quantity}</td>
                      <td>{order.status}</td>
                      <td>
                        {isPending ? (
                          <button
                            type="button"
                            className="cancel-order"
                            disabled={isCancelling}
                            onClick={() => onCancelOrder(order.id)}
                          >
                            <XCircle size={13} />
                            {isCancelling ? "Cancelling..." : "Cancel"}
                          </button>
                        ) : (
                          <span className="muted">No action</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="paper-notice">
          <strong>Simulation status</strong>
          <p>
            {account?.simulationNotice ??
              "SIMULATED / PAPER TRADE ONLY. No brokerage connection exists."}
          </p>
          {account && (
            <div className="source-line">
              Source: {account.dataMetadata.source} · Timestamp:{" "}
              {formatTimestamp(account.dataMetadata.retrievedAt)} · Data status:{" "}
              {account.dataMetadata.status}
            </div>
          )}
        </div>

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

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function formatTimestamp(value: string) {
  return new Date(value).toLocaleString();
}
