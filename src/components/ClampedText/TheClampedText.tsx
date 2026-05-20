"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import s from "./TheClampedText.module.scss";

type ClampedTextProps = {
  children: string;
  className?: string;
  lines?: number;
};

export const TheClampedText = ({
  children,
  className,
  lines = 3,
}: ClampedTextProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
  });
  const clampStyle = { "--clamp-lines": lines } as CSSProperties;

  const showTooltip = () => {
    const element = textRef.current;
    if (!element || !isOverflowing) return;

    const rect = element.getBoundingClientRect();
    const viewportPadding = 12;
    const tooltipMaxHeight = 240;
    const width = Math.min(rect.width, window.innerWidth - viewportPadding * 2);
    const left = Math.min(
      Math.max(rect.left, viewportPadding),
      window.innerWidth - width - viewportPadding,
    );
    const top = Math.min(
      Math.max(rect.top - 6, viewportPadding),
      window.innerHeight - tooltipMaxHeight - viewportPadding,
    );

    setTooltipPosition({
      left,
      top,
      width,
    });
    setIsTooltipVisible(true);
  };

  const hideTooltip = () => {
    setIsTooltipVisible(false);
  };

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const checkOverflow = () => {
      setIsOverflowing(element.scrollHeight > element.clientHeight + 1);
    };

    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(element);

    return () => observer.disconnect();
  }, [children, lines]);

  useEffect(() => {
    if (!isTooltipVisible) return;

    window.addEventListener("scroll", hideTooltip, true);
    window.addEventListener("resize", hideTooltip);

    return () => {
      window.removeEventListener("scroll", hideTooltip, true);
      window.removeEventListener("resize", hideTooltip);
    };
  }, [isTooltipVisible]);

  return (
    <span className={s.wrapper}>
      <p
        ref={textRef}
        className={className}
        style={clampStyle}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </p>
      {isOverflowing &&
        isTooltipVisible &&
        createPortal(
          <span
            className={s.tooltip}
            role="tooltip"
            style={{
              left: tooltipPosition.left,
              top: tooltipPosition.top,
              width: tooltipPosition.width,
            }}
          >
            {children}
          </span>,
          document.body,
        )}
    </span>
  );
};
