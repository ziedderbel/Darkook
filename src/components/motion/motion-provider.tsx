"use client";

import { useEffect } from "react";
import { MotionConfig } from "motion/react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Suppress unhandled rejection when reason is a DOM Event object or empty
      if (!event.reason || (typeof event.reason === "object" && "type" in event.reason && !(event.reason instanceof Error))) {
        event.preventDefault();
      }
    };

    const handleError = (event: ErrorEvent | Event) => {
      // If error is not an Error instance (e.g. resource load event), prevent Next.js [object Event] overlay
      if (!(event instanceof ErrorEvent) || !event.error || !(event.error instanceof Error)) {
        if ("preventDefault" in event) {
          event.preventDefault();
        }
      }
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    window.addEventListener("error", handleError, true);
    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
      window.removeEventListener("error", handleError, true);
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
