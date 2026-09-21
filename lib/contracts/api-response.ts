import { NextResponse } from "next/server";

import type { ApiError, ApiSuccess } from "@/lib/contracts/api";

function createRequestId() {
  return `mp_${crypto.randomUUID()}`;
}

function createMeta(requestId?: string) {
  return {
    requestId: requestId ?? createRequestId(),
    timestamp: new Date().toISOString(),
  };
}

export function successResponse<T>(
  data: T,
  status = 200,
  requestId?: string,
) {
  const body: ApiSuccess<T> = {
    ok: true,
    data,
    meta: createMeta(requestId),
  };

  return NextResponse.json(body, { status });
}

export function errorResponse(
  code: ApiError["error"]["code"],
  message: string,
  options?: {
    status?: number;
    details?: Record<string, string>;
    requestId?: string;
  },
) {
  const body: ApiError = {
    ok: false,
    error: {
      code,
      message,
      details: options?.details,
    },
    meta: createMeta(options?.requestId),
  };

  return NextResponse.json(body, {
    status: options?.status ?? 400,
  });
}
