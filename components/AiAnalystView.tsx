import { BrainCircuit, ChevronRight } from "lucide-react";

import type { ProviderStatus } from "@/lib/contracts/market-data";
import type { TradeIdea } from "@/lib/types";

import { ChallengePanel } from "./ChallengePanel";
import { DataBadge } from "./DataBadge";
import { PageHeading } from "./PageHeading";

function AnalysisRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="analysis-row">
      <strong>{label}</strong>
      <span>{value}</span>
    </div>
  );
}

export function AiAnalystView({
  selectedIdea,
  onOpenPaperTrade,
  onChallenge,
  challengeOpen,
  providerStatus,
  providerStatusLoading,
}: {
  selectedIdea: TradeIdea;
  onOpenPaperTrade: () => void;
  onChallenge: () => void;
  challengeOpen: boolean;
  providerStatus: ProviderStatus | null;
  providerStatusLoading: boolean;
}) {
  const providerMessage = providerStatusLoading
    ? "Checking the server-side market-data provider status."
    : providerStatus?.message ??
      "Provider status is unavailable. MarketPilot must not present demo values as live or source-backed market data.";

  const providerTimestamp = providerStatus
    ? new Date(providerStatus.metadata.retrievedAt).toLocaleString()
    : "Unavailable";

  return (
    <section className="page-section">
      <PageHeading
        title="AI Analyst"
        description="AI interpretation must be separated from reported data, calculated values, estimated values, and unavailable data."
      />

      <section className="card analyst-page">
        <div className="card-title">
          <BrainCircuit size={19} />
          Demo analysis template — {selectedIdea.ticker}
          <DataBadge kind="DEMO DATA" />
        </div>

        <h2>What MarketPilot can say now</h2>

        <p className="summary">
          MarketPilot cannot provide a data-backed trade conclusion because no
          market-data, SEC, earnings, company, or permitted news source is
          connected. The structure below demonstrates the required transparent
          format for a future analysis.
        </p>

        <AnalysisRow
          label="Classification"
          value="AI interpretation of demo-only placeholders. This is not reported, calculated, estimated, or live provider data."
        />

        <AnalysisRow label="Summary" value="WATCH — not a recommendation." />

        <AnalysisRow
          label="Facts"
          value="No verified live, delayed, reported, or estimated observations are available."
        />

        <AnalysisRow
          label="Technical context"
          value={selectedIdea.technicalEvidence}
        />

        <AnalysisRow
          label="Fundamental context"
          value={selectedIdea.fundamentalEvidence}
        />

        <AnalysisRow label="Catalysts" value={selectedIdea.catalystEvidence} />

        <AnalysisRow label="Assumptions" value={selectedIdea.assumptions} />

        <AnalysisRow label="Risks" value={selectedIdea.risk} />

        <AnalysisRow label="Invalidation" value={selectedIdea.invalidation} />

        <AnalysisRow
          label="Uncertainties"
          value={selectedIdea.uncertainty}
        />

        <AnalysisRow label="Source" value={selectedIdea.source} />

        <AnalysisRow label="Timestamp" value={selectedIdea.timestamp} />

        <AnalysisRow
          label="Provider status"
          value={providerMessage}
        />

        <AnalysisRow
          label="Provider timestamp"
          value={providerTimestamp}
        />

        <div className="analyst-actions">
          <button className="challenge" type="button" onClick={onChallenge}>
            Challenge this idea <ChevronRight size={16} />
          </button>

          <button
            className="outline"
            type="button"
            onClick={onOpenPaperTrade}
          >
            Open paper ticket
          </button>
        </div>

        {challengeOpen && <ChallengePanel idea={selectedIdea} />}
      </section>
    </section>
  );
}
