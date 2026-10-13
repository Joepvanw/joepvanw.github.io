import type { ReactNode } from 'react';

export interface ServicesGridProps {
  /** `ServiceCard`s (or `ReviewCard`s). */
  children?: ReactNode;
}

/** Responsive 3-column card grid (`.services__grid`; 2 columns ≤1024px, 1 column ≤768px). */
export function ServicesGrid({ children }: ServicesGridProps) {
  return <div className="services__grid">{children}</div>;
}
