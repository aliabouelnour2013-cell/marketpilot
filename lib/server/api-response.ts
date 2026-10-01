// Server-only API response helpers.
//
// `lib/contracts` holds the shared implementation; `lib/server` is the
// import surface used by Next.js route handlers so server code stays
// out of client bundles. Import from `@/lib/server/*` in `app/api/**`.

export { errorResponse, successResponse } from "@/lib/contracts/api-response";
