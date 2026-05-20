"use client";

import { useState } from "react";

const LOCALE_TRANSITION_KEY = "yashil-energiya:locale-transition-at";
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
  const [skipMotion] = useState(isRecentLocaleTransition);
  return skipMotion;
}
