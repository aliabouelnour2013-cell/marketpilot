import { BrainCircuit, ChevronRight, ShieldAlert } from "lucide-react";

import type { TradeIdea } from "@/lib/types";

import { ChallengePanel } from "./ChallengePanel";
import { DataBadge } from "./DataBadge";

export function AiSummaryCard({
  idea,
  onChallenge,
  challengeOpen,
}: {
  idea: TradeIdea;
  onChallenge: () => void;
  challengeOpen: boolean;
}) {
  return (
    <section className="card ai">
      <div className="card-title">
        <BrainCircuit size={19} />
        AI Analyst <DataBadge kind="DEMO DATA" />
      </div>

      <h2>Why might {idea.ticker} be interesting?</h2>

      <p className="summary">
        This is a transparent demo analysis template. It is not based on a
        connected provider and does not assert current market conditions.
      </p>

      <Evidence label="TECHNICAL" value={idea.technicalEvidence} />
      <Evidence label="FUNDAMENTAL" value={idea.fundamentalEvidence} />
      <Evidence label="CATALYST" value={idea.catalystEvidence} />

      <div className="warning">
        <ShieldAlert size={17} />
        <span>
          <b>Invalidation:</b> {idea.invalidation}
        </span>
      </div>

      <button className="challenge" type="button" onClick={onChallenge}>
        Challenge this idea <ChevronRight size={16} />
      </button>

      {challengeOpen && <ChallengePanel idea={idea} />}
    </section>
  );
}

function Evidence({ label, value }: { label: string; value: string }) {
  return (
    <div className="evidence">
      <b>{label}</b>
      <span>{value}</span>
    </div>
  );
}
