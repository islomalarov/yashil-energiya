"use client";

import { useEffect } from "react";

type NewsViewTrackerProps = {
  id: string;
  slug: string;
};

const STORAGE_PREFIX = "yashil-energiya:news-view:";

export function TheNewsViewTracker({ id, slug }: NewsViewTrackerProps) {
  useEffect(() => {
    const storageKey = `${STORAGE_PREFIX}${id}`;

    try {
      if (sessionStorage.getItem(storageKey)) {
        return;
      }

      sessionStorage.setItem(storageKey, "1");
    } catch {
      // Continue tracking even when browser storage is unavailable.
    }

    fetch("/api/news-views", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, slug }),
      keepalive: true,
    }).catch(() => {
      try {
        sessionStorage.removeItem(storageKey);
      } catch {
        // No recovery needed when browser storage is unavailable.
      }
    });
  }, [id, slug]);

  return null;
}
