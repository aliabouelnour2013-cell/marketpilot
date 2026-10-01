import Stripe from "stripe";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

let stripeClient: Stripe | null = null;

/** Lazily constructed Stripe client. Throws a clear error when unconfigured. */
export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
      "STRIPE_SECRET_KEY is not configured. Add it to the server environment.",
    );
  }

  stripeClient ??= new Stripe(process.env.STRIPE_SECRET_KEY);
  return stripeClient;
}

export type BillingPlan = "monthly" | "yearly";

export const PLAN_DETAILS: Record<
  BillingPlan,
  { label: string; price: string; interval: string; blurb: string }
> = {
  monthly: {
    label: "Premium Monthly",
    price: "$15",
    interval: "per month",
    blurb: "Full premium access, billed monthly. Cancel anytime.",
  },
  yearly: {
    label: "Premium Yearly",
    price: "$120",
    interval: "per year",
    blurb: "Full premium access for a year — two months free vs monthly.",
  },
};

/** Stripe Price id for a plan, from the server environment. */
export function getPriceId(plan: BillingPlan): string {
  const id =
    plan === "monthly"
      ? process.env.STRIPE_PRICE_ID_PREMIUM_MONTHLY
      : process.env.STRIPE_PRICE_ID_PREMIUM_YEARLY;

  if (!id) {
    const varName =
      plan === "monthly"
        ? "STRIPE_PRICE_ID_PREMIUM_MONTHLY"
        : "STRIPE_PRICE_ID_PREMIUM_YEARLY";
    throw new Error(
      `${varName} is not configured. Create the price in the Stripe dashboard and add its id to the server environment.`,
    );
  }

  return id;
}

export function getAppUrl(): string {
  return APP_URL;
}
