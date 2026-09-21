import { ShieldAlert, X } from "lucide-react";

import type { OrderSide, OrderType } from "@/lib/types";

export function PaperOrderModal({
  ticker,
  orderSide,
  orderType,
  quantity,
  onClose,
  onSetOrderSide,
  onSetOrderType,
  onSetQuantity,
  onSubmit,
}: {
  ticker: string;
  orderSide: OrderSide;
  orderType: OrderType;
  quantity: number;
  onClose: () => void;
  onSetOrderSide: (side: OrderSide) => void;
  onSetOrderType: (type: OrderType) => void;
  onSetQuantity: (quantity: number) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <section
        className="modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Paper trade ${ticker}`}
      >
        <button
          className="close"
          type="button"
          onClick={onClose}
          aria-label="Close paper-trading ticket"
        >
          <X />
        </button>

        <div className="eyebrow">SIMULATED / PAPER TRADE</div>
        <h2>Paper trade {ticker}</h2>

        <p>
          This creates a virtual order only. It does not connect to a brokerage
          or execute a real-money trade.
        </p>

        <div className="order-grid">
          <button
            className={
              orderSide === "LONG"
                ? "order long selected-order"
                : "order long"
            }
            type="button"
            onClick={() => onSetOrderSide("LONG")}
          >
            LONG
          </button>

          <button
            className={
              orderSide === "SHORT"
                ? "order short selected-order"
                : "order short"
            }
            type="button"
            onClick={() => onSetOrderSide("SHORT")}
          >
            SHORT
          </button>
        </div>

        <label>
          Shares
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(event) => onSetQuantity(Number(event.target.value))}
          />
        </label>

        <label>
          Order type
          <select
            value={orderType}
            onChange={(event) =>
              onSetOrderType(event.target.value as OrderType)
            }
          >
            <option value="Market">Market</option>
            <option value="Limit">Limit</option>
            <option value="Stop">Stop</option>
            <option value="Stop-limit">Stop-limit</option>
          </select>
        </label>

        <div className="modal-status">
          <ShieldAlert size={16} />

          <span>
            Price status: <b>DEMO DATA / unavailable for fills.</b> The order
            will be recorded as pending and will not alter virtual cash,
            positions, or P/L.
          </span>
        </div>

        <button className="primary" type="button" onClick={onSubmit}>
          Explicitly place simulated order
        </button>

        <p className="modal-footnote">
          MarketPilot&apos;s AI and research components cannot execute orders.
          Real-money execution is not implemented.
        </p>
      </section>
    </div>
  );
}
