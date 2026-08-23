"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AxiosError } from "axios";

export function useRateLimitCountdown() {
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearCooldown = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  useEffect(() => clearCooldown, [clearCooldown]);

  const startCooldown = useCallback(
    (seconds: number) => {
      clearCooldown();
      setCooldownSeconds(seconds);
      intervalRef.current = setInterval(() => {
        setCooldownSeconds((previous) => {
          if (previous <= 1) {
            clearCooldown();
            return 0;
          }
          return previous - 1;
        });
      }, 1000);
    },
    [clearCooldown],
  );

  const handleRateLimitError = useCallback(
    (error: unknown): boolean => {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status !== 429) return false;

      const retryAfter = axiosError.response.headers?.["retry-after"];
      const seconds = Number(retryAfter);
      startCooldown(Number.isFinite(seconds) && seconds > 0 ? seconds : 60);
      return true;
    },
    [startCooldown],
  );

  return {
    cooldownSeconds,
    isRateLimited: cooldownSeconds > 0,
    handleRateLimitError,
  };
}
