import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type UiStatusBadgeTone = "ready" | "neutral";

export type UiStatusBadgeProps = Omit<ComponentPropsWithoutRef<"span">, "children"> & {
  children: ReactNode;
  tone?: UiStatusBadgeTone;
};

export function UiStatusBadge({ children, className, tone = "neutral", ...props }: UiStatusBadgeProps) {
  const toneClassName = `ds-status-badge ds-status-badge--${tone}`;

  return (
    <span className={className ? `${toneClassName} ${className}` : toneClassName} {...props}>
      {children}
    </span>
  );
}
