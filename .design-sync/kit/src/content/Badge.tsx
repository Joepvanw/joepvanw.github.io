import type { ReactNode } from 'react';
import { cx } from '../cx';

export interface BadgeProps {
  /** `default` = blue text on light blue; `light` = white on translucent white, for blue/dark backgrounds. */
  tone?: 'default' | 'light';
  children?: ReactNode;
}

/** Small uppercase pill label (`.badge`) used above section titles. */
export function Badge({ tone = 'default', children }: BadgeProps) {
  return <span className={cx('badge', tone === 'light' && 'badge--light')}>{children}</span>;
}
