import { successResponse } from "@/lib/server/api-response";
import { auth } from "@/lib/server/auth";
import { getBillingStatus } from "@/lib/server/billing";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  const status = await getBillingStatus(session?.user?.id ?? null);
  return successResponse(status);
}
