import type Stripe from "stripe";

import { prisma } from "@/lib/server/prisma";
import { getStripe } from "@/lib/server/stripe";

// Stripe sends the raw request body; signature verification requires the
// exact bytes, so this route must run on Node and read the body as text.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function upsertSubscription(
  userId: string,
  customerId: string,
  subscription: Stripe.Subscription,
) {
  const priceId = subscription.items.data[0]?.price.id ?? "";
  // In current Stripe API versions the billing period lives on the
  // subscription item, not on the subscription itself.
  const periodEnd = subscription.items.data[0]?.current_period_end
    ? new Date(subscription.items.data[0].current_period_end * 1000)
    : null;

  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: subscription.id },
    create: {
      userId,
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      status: subscription.status,
      currentPeriodEnd: periodEnd,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
    update: {
      stripeCustomerId: customerId,
      stripePriceId: priceId,
      status: subscription.status,
      currentPeriodEnd: periodEnd,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return new Response("Stripe webhook is not configured.", { status: 400 });
  }

  const rawBody = await request.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret,
    );
  } catch {
    return new Response("Invalid webhook signature.", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const checkoutSession =
          event.data.object as Stripe.Checkout.Session;
        const userId = checkoutSession.metadata?.userId;
        const subscriptionId =
          typeof checkoutSession.subscription === "string"
            ? checkoutSession.subscription
            : null;
        const customerId =
          typeof checkoutSession.customer === "string"
            ? checkoutSession.customer
            : null;

        if (userId && subscriptionId && customerId) {
          const subscription =
            await getStripe().subscriptions.retrieve(subscriptionId);
          await upsertSubscription(userId, customerId, subscription);
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;
        const customerId =
          typeof subscription.customer === "string"
            ? subscription.customer
            : null;

        if (userId && customerId) {
          await upsertSubscription(userId, customerId, subscription);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await prisma.subscription.deleteMany({
          where: { stripeSubscriptionId: subscription.id },
        });
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.error("Stripe webhook handler failed:", error);
    return new Response("Webhook handler failed.", { status: 500 });
  }

  return new Response("ok", { status: 200 });
}
