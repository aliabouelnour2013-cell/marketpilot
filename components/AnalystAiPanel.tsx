"use client";

import { useState } from "react";
import { BrainCircuit, Lock, Sparkles } from "lucide-react";

import type { TradeIdea } from "@/lib/types";

type Analysis = {
  facts: string[];
  interpretation: string[];
  uncertainty: string[];
  risks: string[];
  verdict: string;
  dataWarning: string;
  generatedAt: string;
  model: string;
};

function BulletList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <p className="muted">Nothing reported.</p>;
  }
  return (
    <ul className="analyst-list">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

/**
 * Premium AI Analyst panel. Free users and guests see an honest upsell;
 * premium subscribers can generate real Gemini-powered analysis of the
 * selected trade idea, with facts separated from interpretation.
 */
export function AnalystAiPanel({
  idea,
  premium,
  billingLoading,
}: {
  idea: TradeIdea;
  premium: boolean;
  billingLoading: boolean;
}) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsUpgrade, setNeedsUpgrade] = useState(false);

  async function generate() {
    setLoading(true);
    setError(null);
    setNeedsUpgrade(false);

    try {
      const response = await fetch("/api/analyst/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticker: idea.ticker,
          company: idea.company,
          direction: idea.direction,
          timeframe: idea.timeframe,
          technicalEvidence: idea.technicalEvidence,
          fundamentalEvidence: idea.fundamentalEvidence,
          catalystEvidence: idea.catalystEvidence,
          assumptions: idea.assumptions,
          risk: idea.risk,
          invalidation: idea.invalidation,
        }),
      });

      if (response.status === 402) {
        setNeedsUpgrade(true);
        return;
      }
      if (response.status === 401) {
        setError("Sign in to use the AI Analyst.");
        return;
      }

      const payload = (await response.json()) as {
        ok: boolean;
        data?: Analysis;
        error?: { message: string };
      };

      if (!payload.ok || !payload.data) {
        throw new Error(payload.error?.message ?? "Analysis failed.");
      }

      setAnalysis(payload.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card analyst-ai">
      <div className="card-title">
        <BrainCircuit size={19} />
        AI-Powered Analysis
        <span className="premium-tag">
          <Sparkles size={12} /> PREMIUM
        </span>
      </div>

      {billingLoading ? (
        <p className="muted">Checking your plan…</p>
      ) : !premium || needsUpgrade ? (
        <div className="upsell">
          <Lock size={20} />
          <p>
            <strong>Real AI analysis is a Premium feature.</strong>
          </p>
          <p className="muted">
            Subscribe to generate grounded AI analysis of {idea.ticker} — facts
            separated from interpretation, uncertainty called out, never
            presented as financial advice.
          </p>
          <a className="primary" href="/pricing">
            See Premium plans
          </a>
        </div>
      ) : (
        <>
          <p className="muted">
            Generate a grounded AI read of {idea.ticker} ({idea.company}).
            Limited to 20 analyses per day.
          </p>
          <button
            className="primary"
            type="button"
            disabled={loading}
            onClick={() => void generate()}
          >
            {loading
              ? "Analyzing…"
              : analysis
                ? "Regenerate analysis"
                : `Analyze ${idea.ticker}`}
          </button>

          {error && <p className="auth-error">{error}</p>}

          {analysis && (
            <div className="analysis-result">
              <h3>Verdict</h3>
              <p className="summary">{analysis.verdict}</p>

              <h3>Facts (from the provided evidence only)</h3>
              <BulletList items={analysis.facts} />

              <h3>AI interpretation (hypotheses, not advice)</h3>
              <BulletList items={analysis.interpretation} />

              <h3>Uncertainty</h3>
              <BulletList items={analysis.uncertainty} />

              <h3>Risks</h3>
              <BulletList items={analysis.risks} />

              <p className="muted data-warning">{analysis.dataWarning}</p>
              <p className="muted tiny">
                Generated {new Date(analysis.generatedAt).toLocaleString()} ·
                Educational research context, not financial advice.
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
