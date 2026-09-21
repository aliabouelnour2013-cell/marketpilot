import { successResponse } from "@/lib/server/api-response";
import { getPaperAccount } from "@/lib/server/paper-trading-service";

export const dynamic = "force-dynamic";

export async function GET() {
  return successResponse(getPaperAccount());
}
