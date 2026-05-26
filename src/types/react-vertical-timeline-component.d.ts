declare module "react-vertical-timeline-component" {
  import type { CSSProperties, ReactNode } from "react";

  type TimelineLayout = "1-column" | "1-column-left" | "1-column-right" | "2-columns";

  type VerticalTimelineProps = {
    animate?: boolean;
    children?: ReactNode;
    className?: string;
    layout?: TimelineLayout;
    lineColor?: string;
  };

  type VerticalTimelineElementProps = {
    children?: ReactNode;
    className?: string;
    contentArrowStyle?: CSSProperties;
    contentStyle?: CSSProperties;
    date?: ReactNode;
    dateClassName?: string;
    icon?: ReactNode;
    iconClassName?: string;
    iconOnClick?: () => void;
    iconStyle?: CSSProperties;
    id?: string;
    intersectionObserverProps?: Record<string, unknown>;
    position?: "left" | "right";
    textClassName?: string;
    visible?: boolean;
  };

  export function VerticalTimeline(props: VerticalTimelineProps): ReactNode;
  export function VerticalTimelineElement(
    props: VerticalTimelineElementProps,
  ): ReactNode;
}
