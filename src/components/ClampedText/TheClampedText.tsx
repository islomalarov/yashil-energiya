"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
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
  const clampStyle = { "--clamp-lines": lines } as CSSProperties;

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

  return (
    <span className={s.wrapper}>
      <p
        ref={textRef}
        className={className}
        style={clampStyle}
      >
        {children}
      </p>
      {isOverflowing && (
        <span className={s.tooltip} role="tooltip">
          {children}
        </span>
      )}
    </span>
  );
};
