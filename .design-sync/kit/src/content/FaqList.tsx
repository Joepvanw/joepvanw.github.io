import { useState, type ReactNode } from 'react';
import { FaqItem } from './FaqItem';

export interface FaqListItem {
  question: ReactNode;
  answer: ReactNode;
}

export interface FaqListProps {
  items: FaqListItem[];
  /** Index opened initially; omit for all closed. Only one item is open at a time. */
  defaultOpenIndex?: number;
}

/** Accordion of `FaqItem`s where opening one closes the others (`.faq__list`, max 760px centered). */
export function FaqList({ items, defaultOpenIndex }: FaqListProps) {
  const [openIdx, setOpenIdx] = useState<number | undefined>(defaultOpenIndex);
  return (
    <div className="faq__list">
      {items.map((it, i) => (
        <FaqItem key={i} question={it.question} open={openIdx === i} onToggle={(o) => setOpenIdx(o ? i : undefined)}>
          {it.answer}
        </FaqItem>
      ))}
    </div>
  );
}
