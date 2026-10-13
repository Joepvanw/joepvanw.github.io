import type { ReactNode } from 'react';

export interface InfoNoteProps {
  children?: ReactNode;
}

/** Light-blue callout with a left blue border and an info icon (`.eligibility__note`). */
export function InfoNote({ children }: InfoNoteProps) {
  return (
    <div className="eligibility__note">
      <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#1a56db" strokeWidth="1.5" /><path d="M10 6v5M10 14v.5" stroke="#1a56db" strokeWidth="1.5" strokeLinecap="round" /></svg>
      <p>{children}</p>
    </div>
  );
}
