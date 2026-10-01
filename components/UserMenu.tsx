"use client";

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Crown } from "lucide-react";

export function UserMenu() {
  const { data: session, status } = useSession();
  const [premiumState, setPremiumState] = useState(false);

  // Only meaningful while signed in; avoids resetting state inside the effect.
  const premium = status === "authenticated" && premiumState;

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    let cancelled = false;
    fetch("/api/billing/status", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload: { ok: boolean; data?: { premium?: boolean } }) => {
        if (!cancelled && payload.ok) {
          setPremiumState(payload.data?.premium === true);
        }
      })
      .catch(() => {
        // Premium badge stays hidden when the status check fails.
      });

    return () => {
      cancelled = true;
    };
  }, [status]);

  if (status === "loading") {
    return (
      <div className="avatar" title="Loading account">
        …
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <a className="outline small" href="/login">
        Sign in
      </a>
    );
  }

  const email = session?.user?.email ?? "Account";
  const displayName =
    session?.user?.name?.trim() || email.split("@")[0] || "Account";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="user-menu">
      {premium && (
        <span className="premium-badge" title="Premium subscriber">
          <Crown size={13} /> PRO
        </span>
      )}
      <a href="/pricing" className="avatar" title={email}>
        {initial}
      </a>
      <button
        className="outline small"
        type="button"
        onClick={() => void signOut({ callbackUrl: "/" })}
      >
        Sign out
      </button>
    </div>
  );
}
