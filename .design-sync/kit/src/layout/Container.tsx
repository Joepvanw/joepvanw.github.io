import type { ReactNode } from 'react';
import { cx } from '../cx';

export interface ContainerProps {
  children?: ReactNode;
  /** Extra classes, e.g. a BEM `__inner` layout class such as `contact__inner`. */
  className?: string;
}

/** Centered page-width wrapper (`.container`: max-width 1160px, 24px side padding). */
export function Container({ children, className }: ContainerProps) {
  return <div className={cx('container', className)}>{children}</div>;
}
