import { GoogleGenerativeAI } from "@google/generative-ai";

// MarketPilot AI Analyst engine (Google Gemini).
//
// Grounding rules (non-negotiable):
// - The model only ever sees what we put in the prompt. Input market data is
//   DEMO/SIMULATED unless a real provider is wired in — the model is told this
//   and must never present demo numbers as live, reported, or estimated data.
// - Output is split into Facts / Interpretation / Uncertainty / Risks so the
//   UI can never blur AI opinion into reported data.
// - Nothing here is financial advice. Output is educational research context.

let client: GoogleGenerativeAI | null = null;

export function getGeminiClient(): GoogleGenerativeAI {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      "GEMINI_API_KEY is not configured. Add it to the server environment.",
    );
  }

  client ??= new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return client;
}

export function getGeminiModel(): string {
  return process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
}

export type AnalystInput = {
  ticker: string;
  company: string;
  direction: string;
  timeframe: string;
  technicalEvidence: string;
  fundamentalEvidence: string;
  catalystEvidence: string;
  assumptions: string;
  risk: string;
  invalidation: string;
};

export type AnalystOutput = {
  facts: string[];
  interpretation: string[];
  uncertainty: string[];
  risks: string[];
  verdict: string;
  dataWarning: string;
};

const SYSTEM_PROMPT = `You are the MarketPilot AI Analyst, an educational market-research assistant.

CRITICAL GROUNDING RULES — follow them exactly:
1. The "provided evidence" below is DEMO / SIMULATED data unless it is explicitly labeled as coming from a real provider. Treat every number in it as illustrative, never as a live quote, reported earning, or filed figure.
2. NEVER invent, estimate, or imply specific prices, price targets, earnings numbers, filing contents, news events, or statistics that are not in the provided evidence. If the evidence does not contain it, say it is unavailable.
3. Separate everything you output into the JSON sections defined below. Never mix interpretation into "facts".
4. This is educational research context, NOT financial advice and NOT a recommendation to buy, sell, or hold anything. Never use imperative trading language like "buy now" or "you should".
5. Keep each bullet concise (1-2 sentences). No markdown formatting inside strings — plain text only.

Respond with valid JSON ONLY, no code fences, using exactly this shape:
{
  "facts": ["bullet points restating ONLY what the provided evidence says"],
  "interpretation": ["bullet points of AI interpretation, each framed as a hypothesis, e.g. 'One possible read is...'"],
  "uncertainty": ["bullet points naming what is unknown or would change the read"],
  "risks": ["bullet points of concrete risk factors for this thesis"],
  "verdict": "one short paragraph: overall posture (WATCH / leaning-long / leaning-short) as a hypothesis, never a directive",
  "dataWarning": "one sentence reminding the reader the underlying data shown is demo/simulated and not live market data"
}`;

function buildUserPrompt(input: AnalystInput): string {
  return `Analyze this trade idea. Provided evidence (DEMO DATA unless labeled otherwise):

Ticker: ${input.ticker}
Company: ${input.company}
Idea direction: ${input.direction}
Timeframe: ${input.timeframe}
Technical evidence: ${input.technicalEvidence}
Fundamental evidence: ${input.fundamentalEvidence}
Catalyst evidence: ${input.catalystEvidence}
Stated assumptions: ${input.assumptions}
Stated risk: ${input.risk}
Invalidation condition: ${input.invalidation}

Apply the grounding rules and respond with the JSON object.`;
}

function sanitizeList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim().slice(0, 500))
    .filter(Boolean)
    .slice(0, 10);
}

function sanitizeText(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim()
    ? value.trim().slice(0, 1200)
    : fallback;
}

/** Runs the grounded analyst prompt and returns structured sections. */
export async function analyzeTradeIdea(
  input: AnalystInput,
): Promise<AnalystOutput> {
  const model = getGeminiClient().getGenerativeModel({
    model: getGeminiModel(),
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.4,
      maxOutputTokens: 1500,
    },
  });

  const result = await model.generateContent(buildUserPrompt(input));
  const text = result.response.text().trim();

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(text) as Record<string, unknown>;
  } catch {
    throw new Error("The AI engine returned an unreadable response.");
  }

  return {
    facts: sanitizeList(parsed.facts),
    interpretation: sanitizeList(parsed.interpretation),
    uncertainty: sanitizeList(parsed.uncertainty),
    risks: sanitizeList(parsed.risks),
    verdict: sanitizeText(
      parsed.verdict,
      "No verdict could be produced from the available evidence.",
    ),
    dataWarning: sanitizeText(
      parsed.dataWarning,
      "The underlying market data shown is demo/simulated, not live market data.",
    ),
  };
}
