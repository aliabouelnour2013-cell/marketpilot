export type ApiSuccess<T> = {
  ok: true;
  data: T;
  meta: {
    requestId: string;
    timestamp: string;
  };
};

export type ApiError = {
  ok: false;
  error: {
    code:
      | "BAD_REQUEST"
      | "NOT_FOUND"
      | "METHOD_NOT_ALLOWED"
      | "INTERNAL_ERROR";
    message: string;
    details?: Record<string, string>;
  };
  meta: {
    requestId: string;
    timestamp: string;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
