import type { ReactNode } from 'react';

export interface FormSuccessProps {
  children?: ReactNode;
}

/** Green confirmation banner with a check icon, shown after a successful submit (`.form__success.visible`). */
export function FormSuccess({ children }: FormSuccessProps) {
  return (
    <div className="form__success visible">
      <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#16a34a" /><path d="M6 10l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <p>{children}</p>
    </div>
  );
}
