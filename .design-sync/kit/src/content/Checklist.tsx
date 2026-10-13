import type { ReactNode } from 'react';

export interface ChecklistProps {
  /** One entry per criterion; each gets a blue circled check mark. */
  items: ReactNode[];
}

/** Vertical list with circled blue check marks (`.checklist`), e.g. eligibility criteria. */
export function Checklist({ items }: ChecklistProps) {
  return (
    <ul className="checklist">
      {items.map((item, i) => (
        <li key={i} className="checklist__item checklist__item--check">{item}</li>
      ))}
    </ul>
  );
}
