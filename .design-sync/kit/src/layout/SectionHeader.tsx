import type { ReactNode } from 'react';
import { Badge } from '../content/Badge';

export interface SectionHeaderProps {
  /** Small uppercase pill above the title (rendered as a `Badge`). */
  badge?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
}

/** Centered section intro: badge pill + large bold title + muted subtitle (`.section__header`). */
export function SectionHeader({ badge, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="section__header">
      {badge != null && <Badge>{badge}</Badge>}
      <h2 className="section__title">{title}</h2>
      {subtitle != null && <p className="section__subtitle">{subtitle}</p>}
    </div>
  );
}
