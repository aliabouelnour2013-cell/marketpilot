// Tiny in-memory rate limiter for sensitive endpoints (auth, AI analysis).
//
// NOTE: counters live in this server instance's memory. On multi-instance
// deployments use a shared store (e.g. Redis). Good enough to blunt
// brute-force and per-user API cost abuse on a single deployment.

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

/**
 * Returns true when the call is allowed, false when the caller is over the
 * limit. A rejected caller should receive HTTP 429.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  bucket.count += 1;
  return bucket.count <= limit;
}
