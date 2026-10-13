import type { ReactNode } from 'react';

export interface StepProps {
  /** Shown inside the blue circle. */
  number: ReactNode;
  title: ReactNode;
  /** Muted description; may contain `<strong>`. */
  children?: ReactNode;
}

/** One numbered step: blue numbered circle + title + description (`.step`). Use inside `Steps`. */
export function Step({ number, title, children }: StepProps) {
  return (
    <div className="step">
      <div className="step__number">{number}</div>
      <div className="step__content">
        <h3>{title}</h3>
        {children != null && <p>{children}</p>}
      </div>
    </div>
  );
}

