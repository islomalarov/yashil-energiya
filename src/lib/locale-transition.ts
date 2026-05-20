"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";

const LOCALE_TRANSITION_KEY = "yashil-energiya:locale-transition-at";
const VIEWED_MOTION_KEYS = "yashil-energiya:viewed-motion-keys";
const LOCALE_TRANSITION_WINDOW_MS = 3000;

function isRecentLocaleTransition() {
  if (typeof window === "undefined") return false;

  const value = window.sessionStorage.getItem(LOCALE_TRANSITION_KEY);
  if (!value) return false;

  const timestamp = Number(value);
  return Number.isFinite(timestamp)
    ? Date.now() - timestamp < LOCALE_TRANSITION_WINDOW_MS
    : false;
}

export function markLocaleTransition() {
  if (typeof window === "undefined") return;

  window.sessionStorage.setItem(LOCALE_TRANSITION_KEY, String(Date.now()));
}

export function useSkipLocaleMotion() {
  const [skipMotion, setSkipMotion] = useState(false);

  useEffect(() => {
    setSkipMotion(isRecentLocaleTransition());
  }, []);

  return skipMotion;
}

function readViewedMotionKeys() {
  if (typeof window === "undefined") return new Set<string>();

  try {
    const value = window.sessionStorage.getItem(VIEWED_MOTION_KEYS);
    const keys = value ? JSON.parse(value) : [];
    return new Set(Array.isArray(keys) ? keys.filter(Boolean) : []);
  } catch {
    return new Set<string>();
  }
}

function hasViewedMotionKey(key: string) {
  return readViewedMotionKeys().has(key);
}

function rememberMotionKey(key: string) {
  if (typeof window === "undefined") return;

  const keys = readViewedMotionKeys();
  keys.add(key);
  window.sessionStorage.setItem(
    VIEWED_MOTION_KEYS,
    JSON.stringify(Array.from(keys)),
  );
}

export function useLocaleMotionState(key: string) {
  const [skipMotion, setSkipMotion] = useState(false);

  useLayoutEffect(() => {
    setSkipMotion(isRecentLocaleTransition() && hasViewedMotionKey(key));
  }, [key]);

  const markViewed = useCallback(() => {
    rememberMotionKey(key);
  }, [key]);

  return { skipMotion, markViewed };
}
