import { prisma } from "./prisma";

// Stripe subscription statuses that count as "paying premium".
const ACTIVE_STATUSES = new Set(["active", "trialing"]);

export type BillingStatus = {
  authenticated: boolean;
  premium: boolean;
  status: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
};

export const FREE_BILLING_STATUS: BillingStatus = {
  authenticated: false,
  premium: false,
  status: null,
  currentPeriodEnd: null,
  cancelAtPeriodEnd: false,
};

/** Reads the user's latest subscription and reports premium access. */
export async function getBillingStatus(
  userId: string | null,
): Promise<BillingStatus> {
  if (!userId) {
    return FREE_BILLING_STATUS;
  }

  const subscription = await prisma.subscription.findFirst({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });

  if (!subscription) {
    return { ...FREE_BILLING_STATUS, authenticated: true };
  }

  return {
    authenticated: true,
    premium: ACTIVE_STATUSES.has(subscription.status),
    status: subscription.status,
    currentPeriodEnd:
      subscription.currentPeriodEnd?.toISOString() ?? null,
    cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
  };
}
