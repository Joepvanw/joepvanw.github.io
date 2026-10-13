import type { ReactNode } from 'react';
import { cx } from '../cx';

export interface SectionProps {
  /** `default` = white, `alt` = light grey (`--color-bg-alt`), `dark` = navy (`--color-dark`) with white text. */
  variant?: 'default' | 'alt' | 'dark';
  /** Anchor id for in-page navigation (e.g. `diensten`, `faq`, `contact`). */
  id?: string;
  /** Wrap children in a `.container`. Default true. */
  contained?: boolean;
  children?: ReactNode;
}

/** Full-width page band (`.section`, 88px vertical padding) with an inner `.container`. */
export function Section({ variant = 'default', id, contained = true, children }: SectionProps) {
  return (
    <section id={id} className={cx('section', variant === 'alt' && 'section--alt', variant === 'dark' && 'section--dark')}>
      {contained ? <div className="container">{children}</div> : children}
    </section>
  );
}
