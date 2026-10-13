import type { ReactNode } from 'react';
import { cx } from '../cx';

export interface ReviewCardProps {
  /** Number of filled stars (0-5). Default 5. */
  rating?: number;
  /** The testimonial text (rendered italic). */
  quote: ReactNode;
  /** Reviewer name. */
  author: ReactNode;
  /** Secondary line under the name, e.g. place or case type. */
  meta?: ReactNode;
  /** 1-2 letters shown in the round avatar. */
  initials?: string;
  /** Light-blue highlighted variant. */
  featured?: boolean;
}

/** Testimonial card with amber stars, italic quote and avatar + author line (`.review-card`). */
export function ReviewCard({ rating = 5, quote, author, meta, initials, featured }: ReviewCardProps) {
  const r = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className={cx('review-card', featured && 'review-card--featured')}>
      <div className="review-card__stars" aria-label={`${r} van 5 sterren`}>{'★'.repeat(r) + '☆'.repeat(5 - r)}</div>
      <p className="review-card__text">{quote}</p>
      <div className="review-card__author">
        {initials && <div className="review-card__avatar">{initials}</div>}
        <div>
          <strong>{author}</strong>
          {meta != null && <span>{meta}</span>}
        </div>
      </div>
    </div>
  );
}
