"use client";

import type { ReactNode } from "react";
import { Info } from "lucide-react";
import s from "./SolarCalculator.module.scss";

type InfoTooltipProps = {
  /** Accessible label for the trigger button. */
  label: string;
  children: ReactNode;
};

/**
 * Small info "footnote": an (i) trigger that reveals a tooltip on hover/focus.
 * CSS-driven (`:hover` / `:focus-within`) so it works without extra state, and
 * the tooltip sits flush under the trigger so the pointer can reach links
 * inside it without the tooltip closing.
 */
export const InfoTooltip = ({ label, children }: InfoTooltipProps) => (
  <span className={s.infoTip}>
    <button
      type="button"
      className={s.infoBtn}
      aria-label={label}
      onClick={(e) => e.preventDefault()}
    >
      <Info size={15} aria-hidden="true" />
    </button>
    <span className={s.tooltip} role="tooltip">
      {children}
    </span>
  </span>
);
