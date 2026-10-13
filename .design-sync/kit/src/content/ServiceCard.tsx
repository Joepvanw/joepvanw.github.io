import type { ReactNode } from 'react';
import { cx } from '../cx';

export interface ServiceCardProps {
  /** Emoji or small icon at the top. */
  icon?: ReactNode;
  title: ReactNode;
  /** Muted description paragraph. */
  children?: ReactNode;
  /** Link target for the bottom link. Omit to hide the link. */
  href?: string;
  /** Bottom link text. Default "Meer informatie →". */
  linkLabel?: ReactNode;
  /** Highlighted blue border + glow. */
  featured?: boolean;
  /** Small pill in the top-right corner, e.g. "Populair". */
  badge?: ReactNode;
}

/** Bordered white service card with icon, title, description and link; lifts on hover (`.service-card`). */
export function ServiceCard({ icon, title, children, href, linkLabel = 'Meer informatie →', featured, badge }: ServiceCardProps) {
  return (
    <div className={cx('service-card', featured && 'service-card--featured')}>
      {badge != null && <span className="service-card__badge">{badge}</span>}
      {icon != null && <div className="service-card__icon">{icon}</div>}
      <h3>{title}</h3>
      {children != null && <p>{children}</p>}
      {href != null && <a href={href} className="service-card__link">{linkLabel}</a>}
    </div>
  );
}
