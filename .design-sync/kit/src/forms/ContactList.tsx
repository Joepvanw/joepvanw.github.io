import type { ReactNode } from 'react';

const ICONS = {
  location: <path d="M10 2C7.24 2 5 4.24 5 7c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5zm0 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="currentColor" />,
  email: <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293.293a1 1 0 000 1.414L10 11.414l4.707-4.707a1 1 0 00-1.414-1.414L10 8.586 6.707 5.293a1 1 0 00-1.414 0z" fill="currentColor" />,
  phone: <path d="M3 3.5A1.5 1.5 0 014.5 2h2.1a1 1 0 01.97.76l.7 2.8a1 1 0 01-.29.98L6.6 7.9a10.5 10.5 0 005.5 5.5l1.36-1.38a1 1 0 01.98-.29l2.8.7a1 1 0 01.76.97v2.1A1.5 1.5 0 0116.5 17C9.04 17 3 10.96 3 3.5z" fill="currentColor" />,
};

export interface ContactListItem {
  icon: 'location' | 'email' | 'phone';
  label: ReactNode;
}

export interface ContactListProps {
  items: ContactListItem[];
}

/** Icon + text contact lines in white-on-dark (`.contact__list`). Place on a `dark` Section. */
export function ContactList({ items }: ContactListProps) {
  return (
    <ul className="contact__list">
      {items.map((it, i) => (
        <li key={i}>
          <svg viewBox="0 0 20 20" fill="none">{ICONS[it.icon]}</svg>
          <span>{it.label}</span>
        </li>
      ))}
    </ul>
  );
}
