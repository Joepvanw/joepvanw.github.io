import type { ReactNode } from 'react';

export interface StepsProps {
  /** `Step` elements; a gradient connector line joins consecutive steps automatically. */
  children?: ReactNode;
}

/** Vertical numbered process timeline, max 760px wide and centered (`.steps`). */
export function Steps({ children }: StepsProps) {
  return <div className="steps">{children}</div>;
}
