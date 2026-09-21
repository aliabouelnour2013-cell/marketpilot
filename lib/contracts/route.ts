import { successResponse } from "@/lib/server/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return successResponse({
    service: "marketpilot",
    status: "ok",
    mode: "DEMO MODE",
    message:
      "MarketPilot is running with frontend demo data and an in-memory simulated paper-trading store. No live market-data or brokerage provider is configured.",
  });
}
