import { hash } from "bcryptjs";
import { z } from "zod";

import { errorResponse, successResponse } from "@/lib/server/api-response";
import { prisma } from "@/lib/server/prisma";
import { rateLimit } from "@/lib/server/rate-limit";

export const dynamic = "force-dynamic";

const signupSchema = z.object({
  email: z.string().email("Enter a valid email address.").max(254),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password must be at most 128 characters."),
  name: z.string().trim().max(100).optional(),
});

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (!rateLimit(`signup:${ip}`, 10, 60_000)) {
    return errorResponse(
      "RATE_LIMITED",
      "Too many signup attempts. Please try again in a minute.",
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("VALIDATION_ERROR", "Request body must be JSON.", {
      status: 400,
    });
  }

  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    const details: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "request";
      details[key] = issue.message;
    }
    return errorResponse("VALIDATION_ERROR", "Invalid signup details.", {
      status: 400,
      details,
    });
  }

  const email = parsed.data.email.toLowerCase().trim();

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return errorResponse(
      "CONFLICT",
      "An account with this email already exists. Try signing in instead.",
      { status: 409 },
    );
  }

  const passwordHash = await hash(parsed.data.password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      name: parsed.data.name?.trim() || null,
      passwordHash,
    },
    select: { id: true, email: true },
  });

  return successResponse(
    {
      id: user.id,
      email: user.email,
      message:
        "Account created. Sign in to continue.",
    },
    201,
  );
}
