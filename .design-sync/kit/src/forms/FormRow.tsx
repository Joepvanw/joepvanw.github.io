import type { ReactNode } from 'react';

export interface FormRowProps {
  /** Exactly two fields, side by side (stacks ≤768px). */
  children?: ReactNode;
}

/** Two-column field row (`.form__row`), e.g. first name + last name. */
export function FormRow({ children }: FormRowProps) {
  return <div className="form__row">{children}</div>;
}
