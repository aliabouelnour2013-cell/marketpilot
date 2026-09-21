import type { TradeIdea } from "@/lib/types";

export function ChallengePanel({ idea }: { idea: TradeIdea }) {
  return (
    <div className="challenge-panel">
      <strong>Challenge this idea</strong>

      <p>
        <b>Bear case:</b> The visible values are demo-only, so there is no
        evidence that this setup currently exists.
      </p>

      <p>
        <b>Counterarguments:</b> Price trend, liquidity, earnings, industry
        conditions, valuation, macro conditions, and news could all contradict
        a future thesis.
      </p>

      <p>
        <b>Missing information:</b> Timestamped quote data, reported
        financials, current filings, verified earnings timing, and
        source-backed news.
      </p>

      <p>
        <b>Possible invalidation:</b> {idea.invalidation}
      </p>
    </div>
  );
}
