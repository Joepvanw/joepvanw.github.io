import { useState, type ReactNode } from 'react';
import { cx } from '../cx';

export interface FaqItemProps {
  question: ReactNode;
  /** Answer copy (rendered inside a `<p>`). */
  children?: ReactNode;
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
}

/** One accordion row: question button with rotating chevron, collapsible muted answer (`.faq__item`). Blue border when open. */
export function FaqItem({ question, children, open, defaultOpen = false, onToggle }: FaqItemProps) {
  const [inner, setInner] = useState(defaultOpen);
  const isOpen = open ?? inner;
  const toggle = () => {
    if (open === undefined) setInner(!isOpen);
    onToggle?.(!isOpen);
  };
  return (
    <div className="faq__item">
      <button type="button" className="faq__question" aria-expanded={isOpen} onClick={toggle}>
        {question}
        <svg className="faq__chevron" viewBox="0 0 20 20" fill="none"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </button>
      <div className={cx('faq__answer', isOpen && 'open')}>
        <p>{children}</p>
      </div>
    </div>
  );
}

