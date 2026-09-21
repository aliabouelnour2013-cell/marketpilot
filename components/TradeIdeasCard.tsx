import { Sparkles } from "lucide-react";

import type { TradeIdea } from "@/lib/types";

export function TradeIdeasCard({
  ideas,
  onSelectTicker,
}: {
  ideas: TradeIdea[];
  onSelectTicker: (ticker: string) => void;
}) {
  return (
    <section className="card ideas">
      <div className="card-head">
        <div className="card-title">
          <Sparkles size={18} />
          Trade Ideas
        </div>

        <span className="muted">Demo templates</span>
      </div>

      <div className="idea-list">
        {ideas.length === 0 ? (
          <p className="empty-inline">
            No matching demo records. A source-backed search will be added with
            provider integration.
          </p>
        ) : (
          ideas.map((idea) => (
            <button
              className="idea"
              key={idea.ticker}
              type="button"
              onClick={() => onSelectTicker(idea.ticker)}
            >
              <div className="idea-top">
                <strong>{idea.ticker}</strong>

                <span
                  className={
                    idea.direction === "POTENTIAL SHORT"
                      ? "pill red"
                      : idea.direction === "WATCH"
                        ? "pill gray"
                        : "pill"
                  }
                >
                  {idea.direction}
                </span>

                <span
                  className={idea.change.startsWith("-") ? "down" : "up"}
                >
                  {idea.change}
                </span>
              </div>

              <div className="idea-reason">{idea.assumptions}</div>

              <small>Risk: {idea.risk}</small>

              <small className="idea-meta">
                {idea.source} · {idea.timestamp}
              </small>
            </button>
          ))
        )}
      </div>
    </section>
  );
}
