import type { ReactNode } from 'react';

export interface TextAccentProps {
  children?: ReactNode;
}

/** Inline primary-blue emphasis inside headings and copy (`.text-accent`). */
export function TextAccent({ children }: TextAccentProps) {
  return <span className="text-accent">{children}</span>;
}
