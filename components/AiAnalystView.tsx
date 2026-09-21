import { BrainCircuit, ChevronRight } from "lucide-react";

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
}: {
  selectedIdea: TradeIdea;
  onOpenPaperTrade: () => void;
  onChallenge: () => void;
  challengeOpen: boolean;
}) {
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
