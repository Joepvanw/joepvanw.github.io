import type { ReactNode } from 'react';

export interface ReviewsGridProps {
  /** `ReviewCard`s. */
  children?: ReactNode;
}

/** 3-column grid for testimonials (`.reviews__grid`; 1 column ≤768px). */
export function ReviewsGrid({ children }: ReviewsGridProps) {
  return <div className="reviews__grid">{children}</div>;
}
