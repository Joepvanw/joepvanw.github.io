import type { ReactNode } from 'react';
import { Badge } from '../content/Badge';
import { StatCard, type StatCardProps } from '../content/StatCard';

export interface HeroProps {
  /** Pill above the title. */
  badge?: ReactNode;
  /** Badge tone. The live site uses `light` (white text on translucent white) here; use `default` for a visible blue pill on the light gradient. */
  badgeTone?: 'default' | 'light';
  /** Large 800-weight headline; wrap key words in `TextAccent` for blue emphasis. */
  title: ReactNode;
  subtitle?: ReactNode;
  /** Bullet points, each with a blue filled check icon. */
  checks?: ReactNode[];
  /** Usually a primary + outline `Button` pair at size `lg`. */
  actions?: ReactNode;
  /** Up to 3 floating stat cards on the right; variants are assigned main/secondary/tertiary in order. */
  stats?: Omit<StatCardProps, 'variant'>[];
}

const VARIANTS = ['main', 'secondary', 'tertiary'] as const;

/** Two-column landing hero on a soft blue gradient: copy + checks + CTAs left, floating stat cards right (`.hero`). */
export function Hero({ badge, badgeTone = 'light', title, subtitle, checks, actions, stats }: HeroProps) {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          {badge != null && <Badge tone={badgeTone}>{badge}</Badge>}
          <h1 className="hero__title">{title}</h1>
          {subtitle != null && <p className="hero__subtitle">{subtitle}</p>}
          {checks && checks.length > 0 && (
            <ul className="hero__checks">
              {checks.map((c, i) => (
                <li key={i}>
                  <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#1a56db" /><path d="M6 10l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          )}
          {actions != null && <div className="hero__actions">{actions}</div>}
        </div>
        {stats && stats.length > 0 && (
          <div className="hero__visual">
            {stats.slice(0, 3).map((s, i) => <StatCard key={i} {...s} variant={VARIANTS[i]} />)}
          </div>
        )}
      </div>
    </section>
  );
}
