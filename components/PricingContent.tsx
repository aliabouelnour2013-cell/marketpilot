"use client";

import { Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Check, Crown } from "lucide-react";

type BillingStatus = {
  authenticated: boolean;
  premium: boolean;
  status: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
};

const FREE_FEATURES = [
  "Market dashboard and stock research",
  "Watchlists",
  "Paper-trading simulator ($100,000 virtual cash)",
  "Market news and education",
];

const PREMIUM_FEATURES = [
  "AI Analyst — real AI trade-idea analysis powered by Google Gemini (20/day)",
  "Everything in Free",
  "New premium features as they launch: advanced screener, backtesting, price alerts",
];

function PricingInner() {
  const { status: sessionStatus } = useSession();
  const searchParams = useSearchParams();
  const [billing, setBilling] = useState<BillingStatus | null>(null);
  const [billingLoading, setBillingLoading] = useState(true);
  const [busyPlan, setBusyPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const showSuccess = searchParams.get("success") === "1";
  const showCancelled = searchParams.get("cancelled") === "1";

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const response = await fetch("/api/billing/status", {
          cache: "no-store",
        });
        const payload = (await response.json()) as {
          ok: boolean;
          data: BillingStatus;
        };
        if (!cancelled && payload.ok) {
          setBilling(payload.data);
        }
      } catch {
        // Billing status stays unknown; CTAs degrade to sign-in prompts.
      } finally {
        if (!cancelled) {
          setBillingLoading(false);
        }
      }
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, [showSuccess]);

  async function subscribe(plan: "monthly" | "yearly") {
    setError(null);
    setBusyPlan(plan);
    try {
      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const payload = (await response.json()) as {
        ok: boolean;
        data?: { url: string };
        error?: { message: string };
      };
      if (!payload.ok || !payload.data?.url) {
        throw new Error(payload.error?.message ?? "Could not start checkout.");
      }
      window.location.assign(payload.data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusyPlan(null);
    }
  }

  async function manageBilling() {
    setError(null);
    setBusyPlan("portal");
    try {
      const response = await fetch("/api/billing/portal", { method: "POST" });
      const payload = (await response.json()) as {
        ok: boolean;
        data?: { url: string };
        error?: { message: string };
      };
      if (!payload.ok || !payload.data?.url) {
        throw new Error(
          payload.error?.message ?? "Could not open the billing portal.",
        );
      }
      window.location.assign(payload.data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusyPlan(null);
    }
  }

  const isGuest = sessionStatus === "unauthenticated";
  const isPremium = billing?.premium === true;

  function premiumCta(plan: "monthly" | "yearly", label: string) {
    if (billingLoading || sessionStatus === "loading") {
      return (
        <button className="primary" type="button" disabled>
          Loading…
        </button>
      );
    }
    if (isPremium) {
      return (
        <button className="outline" type="button" disabled>
          Current plan
        </button>
      );
    }
    if (isGuest) {
      return (
        <a className="primary" href={`/login?callbackUrl=${encodeURIComponent("/pricing")}`}>
          Sign in to subscribe
        </a>
      );
    }
    return (
      <button
        className="primary"
        type="button"
        disabled={busyPlan !== null}
        onClick={() => void subscribe(plan)}
      >
        {busyPlan === plan ? "Redirecting to Stripe…" : label}
      </button>
    );
  }

  return (
    <div className="pricing">
      <div className="pricing-head">
        <h1>MarketPilot Premium</h1>
        <p className="muted">
          Real AI-powered market research. Cancel anytime. Billing is handled
          securely by Stripe.
        </p>
      </div>

      {showSuccess && (
        <p className="banner success">
          Welcome to Premium — your subscription is active. It can take a few
          seconds to appear; refresh if needed.
        </p>
      )}
      {showCancelled && (
        <p className="banner muted-banner">
          Checkout was cancelled — no charge was made.
        </p>
      )}
      {error && <p className="banner error">{error}</p>}

      <div className="pricing-grid">
        <section className="card price-card">
          <h2>Free</h2>
          <p className="price-amount">
            $0 <span className="muted">forever</span>
          </p>
          <ul className="feature-list">
            {FREE_FEATURES.map((feature) => (
              <li key={feature}>
                <Check size={15} /> {feature}
              </li>
            ))}
          </ul>
          {isGuest ? (
            <a className="outline" href="/login">
              Get started free
            </a>
          ) : (
            <button className="outline" type="button" disabled>
              {isPremium ? "Included in Premium" : "Your current plan"}
            </button>
          )}
        </section>

        <section className="card price-card featured">
          <div className="featured-tag">
            <Crown size={14} /> Most popular
          </div>
          <h2>Premium Monthly</h2>
          <p className="price-amount">
            $15 <span className="muted">per month</span>
          </p>
          <ul className="feature-list">
            {PREMIUM_FEATURES.map((feature) => (
              <li key={feature}>
                <Check size={15} /> {feature}
              </li>
            ))}
          </ul>
          {premiumCta("monthly", "Subscribe monthly")}
        </section>

        <section className="card price-card">
          <h2>Premium Yearly</h2>
          <p className="price-amount">
            $120 <span className="muted">per year</span>
          </p>
          <p className="muted">Two months free compared to monthly billing.</p>
          <ul className="feature-list">
            {PREMIUM_FEATURES.map((feature) => (
              <li key={feature}>
                <Check size={15} /> {feature}
              </li>
            ))}
          </ul>
          {premiumCta("yearly", "Subscribe yearly")}
        </section>
      </div>

      {isPremium && billing && (
        <section className="card billing-manage">
          <div>
            <h2>Your subscription</h2>
            <p className="muted">
              Status: {billing.status}
              {billing.currentPeriodEnd &&
                ` · Renews ${new Date(billing.currentPeriodEnd).toLocaleDateString()}`}
              {billing.cancelAtPeriodEnd && " · Cancels at period end"}
            </p>
          </div>
          <button
            className="outline"
            type="button"
            disabled={busyPlan !== null}
            onClick={() => void manageBilling()}
          >
            {busyPlan === "portal" ? "Opening…" : "Manage billing"}
          </button>
        </section>
      )}

      <p className="muted pricing-disclaimer">
        MarketPilot provides research tools and education, not financial
        advice. Paper trading is simulated. Subscriptions renew automatically
        until cancelled.
      </p>
    </div>
  );
}

export function PricingContent() {
  return (
    <Suspense>
      <PricingInner />
    </Suspense>
  );
}
