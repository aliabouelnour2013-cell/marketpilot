import { errorResponse, successResponse } from "@/lib/server/api-response";
import {
  createPaperOrder,
  listPaperOrders,
} from "@/lib/server/paper-trading-service";
import { validateCreatePaperOrder } from "@/lib/server/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  return successResponse({
    orders: listPaperOrders(),
    dataStatus: "DEMO",
    message:
      "Orders are simulated only. No broker connection or verified quote provider is configured.",
  });
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return errorResponse("BAD_REQUEST", "Request body must be valid JSON.", {
      status: 400,
    });
  }

  const validation = validateCreatePaperOrder(payload);

  if (!validation.ok) {
    return errorResponse(
      "BAD_REQUEST",
      "The simulated paper order could not be validated.",
      {
        status: 400,
        details: validation.errors,
      },
    );
  }

  const order = createPaperOrder(validation.value);

  return successResponse(
    {
      order,
      message:
        "Simulated order created. It remains pending because no verified quote provider is configured.",
    },
    201,
  );
}
