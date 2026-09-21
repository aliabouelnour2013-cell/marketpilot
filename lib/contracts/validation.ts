import type {
  CreatePaperOrderInput,
  PaperOrderSide,
  PaperOrderType,
} from "@/lib/contracts/paper-trading";

type ValidationSuccess<T> = {
  ok: true;
  value: T;
};

type ValidationFailure = {
  ok: false;
  errors: Record<string, string>;
};

type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

const allowedSides: PaperOrderSide[] = ["LONG", "SHORT"];

const allowedOrderTypes: PaperOrderType[] = [
  "Market",
  "Limit",
  "Stop",
  "Stop-limit",
];

export function validateCreatePaperOrder(
  payload: unknown,
): ValidationResult<CreatePaperOrderInput> {
  if (!payload || typeof payload !== "object") {
    return {
      ok: false,
      errors: {
        request: "A JSON paper-order request body is required.",
      },
    };
  }

  const request = payload as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const rawTicker = typeof request.ticker === "string" ? request.ticker : "";
  const ticker = rawTicker.trim().toUpperCase();

  if (!/^[A-Z0-9.-]{1,12}$/.test(ticker)) {
    errors.ticker =
      "Ticker must contain 1 to 12 uppercase letters, numbers, periods, or hyphens.";
  }

  const side = request.side;
  if (
    typeof side !== "string" ||
    !allowedSides.includes(side as PaperOrderSide)
  ) {
    errors.side = "Side must be LONG or SHORT.";
  }

  const orderType = request.orderType;
  if (
    typeof orderType !== "string" ||
    !allowedOrderTypes.includes(orderType as PaperOrderType)
  ) {
    errors.orderType =
      "Order type must be Market, Limit, Stop, or Stop-limit.";
  }

  const quantity =
    typeof request.quantity === "number"
      ? request.quantity
      : Number(request.quantity);

  if (
    !Number.isFinite(quantity) ||
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > 1000000
  ) {
    errors.quantity =
      "Quantity must be a whole number between 1 and 1,000,000.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      errors,
    };
  }

  return {
    ok: true,
    value: {
      ticker,
      side: side as PaperOrderSide,
      orderType: orderType as PaperOrderType,
      quantity,
    },
  };
}
