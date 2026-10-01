import { z } from "zod";

import { errorResponse, successResponse } from "@/lib/server/api-response";
import { auth } from "@/lib/server/auth";
import { prisma } from "@/lib/server/prisma";
import {
  getAppUrl,
  getPriceId,
  getStripe,
  type BillingPlan,
} from "@/lib/server/stripe";

export const dynamic = "force-dynamic";

const checkoutSchema = z.object({
  plan: z.enum(["monthly", "yearly"]),
});

export async function POST(request: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return errorResponse("UNAUTHORIZED", "Sign in to subscribe.", {
      status: 401,
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("VALIDATION_ERROR", "Request body must be JSON.", {
      status: 400,
    });
  }

  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(
      "VALIDATION_ERROR",
      "Plan must be 'monthly' or 'yearly'.",
      { status: 400 },
    );
  }

  const plan: BillingPlan = parsed.data.plan;

  let priceId: string;
  try {
    priceId = getPriceId(plan);
  } catch (error) {
    return errorResponse(
      "INTERNAL_ERROR",
      error instanceof Error ? error.message : "Billing is not configured.",
      { status: 500 },
    );
  }

  const stripe = getStripe();
  const appUrl = getAppUrl();

  // Reuse the existing Stripe customer when the user already has one so
  // subscriptions, invoices, and the portal stay on one customer record.
  const existing = await prisma.subscription.findFirst({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    select: { stripeCustomerId: true },
  });

  let customerId = existing?.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: session.user.email ?? undefined,
      name: session.user.name ?? undefined,
      metadata: { userId },
    });
    customerId = customer.id;
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    // Copy our user id onto the subscription itself so webhooks can map
    // subscription events back to the MarketPilot user even if the
    // customer record lookup fails.
    subscription_data: { metadata: { userId } },
    metadata: { userId, plan },
    success_url: `${appUrl}/pricing?success=1`,
    cancel_url: `${appUrl}/pricing?cancelled=1`,
  });

  if (!checkoutSession.url) {
    return errorResponse(
      "INTERNAL_ERROR",
      "Stripe did not return a checkout URL.",
      { status: 500 },
    );
  }

  return successResponse({ url: checkoutSession.url });
}
