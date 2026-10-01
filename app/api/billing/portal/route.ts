import { errorResponse, successResponse } from "@/lib/server/api-response";
import { auth } from "@/lib/server/auth";
import { prisma } from "@/lib/server/prisma";
import { getAppUrl, getStripe } from "@/lib/server/stripe";

export const dynamic = "force-dynamic";

export async function POST() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return errorResponse("UNAUTHORIZED", "Sign in to manage billing.", {
      status: 401,
    });
  }

  const subscription = await prisma.subscription.findFirst({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    select: { stripeCustomerId: true },
  });

  if (!subscription) {
    return errorResponse(
      "NOT_FOUND",
      "No billing account found yet. Subscribe to Premium first.",
      { status: 404 },
    );
  }

  const portalSession = await getStripe().billingPortal.sessions.create({
    customer: subscription.stripeCustomerId,
    return_url: `${getAppUrl()}/pricing`,
  });

  return successResponse({ url: portalSession.url });
}
