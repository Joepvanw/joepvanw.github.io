import type { ReactNode } from 'react';
import { cx } from '../cx';

export interface StatCardProps {
  /** Emoji or small icon shown above the label. */
  icon?: ReactNode;
  /** Small uppercase caption, e.g. "Succesratio". */
  label: ReactNode;
  /** Big blue figure, e.g. "94%". */
  value: ReactNode;
  /** Width/offset preset used in the hero stack: main 220px, secondary 180px (offset), tertiary 200px. */
  variant?: 'main' | 'secondary' | 'tertiary';
}

/** White floating stat card with icon, uppercase label and large blue value (`.hero__card`, gently animates up/down). */
export function StatCard({ icon, label, value, variant = 'main' }: StatCardProps) {
  return (
    <div className={cx('hero__card', `hero__card--${variant}`)}>
      {icon != null && <div className="hero__card-icon">{icon}</div>}
      <p className="hero__card-label">{label}</p>
      <p className="hero__card-value">{value}</p>
    </div>
  );
}
