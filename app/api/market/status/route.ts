import type { ProviderStatus } from "@/lib/contracts/market-data";
import { successResponse } from "@/lib/server/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date().toISOString();

  const providerStatus: ProviderStatus = {
    mode: "DEMO MODE",
    quoteProvider: "NOT CONFIGURED",
    historicalPriceProvider: "NOT CONFIGURED",
    fundamentalsProvider: "NOT CONFIGURED",
    filingsProvider: "NOT CONFIGURED",
    newsProvider: "NOT CONFIGURED",
    earningsProvider: "NOT CONFIGURED",
    insiderProvider: "NOT CONFIGURED",
    institutionalProvider: "NOT CONFIGURED",
    economicCalendarProvider: "NOT CONFIGURED",
    message:
      "No external data provider is configured. MarketPilot must display demo or unavailable status and must not present demo values as live, delayed, reported, or estimated data.",
    metadata: {
      source: "MarketPilot market-data status endpoint",
      retrievedAt: now,
      status: "DEMO",
      classification: "DEMO DATA",
    },
  };

  return successResponse(providerStatus);
}
