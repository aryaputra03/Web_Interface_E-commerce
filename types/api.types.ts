export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface ApiErrorShape {
  status: number | null;
  message: string;
  isNetworkError: boolean;
  isRateLimited: boolean;
  retryAfterSeconds?: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
}
