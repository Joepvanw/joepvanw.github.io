import type { MouseEventHandler, ReactNode } from 'react';
import { cx } from '../cx';

export interface ButtonProps {
  /** `primary` = solid blue pill, `outline` = blue border on transparent. */
  variant?: 'primary' | 'outline';
  /** `lg` is the hero/CTA size. */
  size?: 'md' | 'lg';
  /** Stretch to the container width (`.btn--full`). */
  fullWidth?: boolean;
  /** When set, renders an `<a>` link styled as a button. */
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  children?: ReactNode;
}

/** Rounded pill button (`.btn`). Renders `<a>` when `href` is given, otherwise `<button>`. */
export function Button({ variant = 'primary', size = 'md', fullWidth, href, type = 'button', disabled, onClick, children }: ButtonProps) {
  const className = cx('btn', `btn--${variant}`, size === 'lg' && 'btn--lg', fullWidth && 'btn--full');
  if (href != null) {
    return <a href={href} className={className} onClick={onClick}>{children}</a>;
  }
  return <button type={type} className={className} disabled={disabled} onClick={onClick}>{children}</button>;
}
