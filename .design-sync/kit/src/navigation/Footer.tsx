import type { ReactNode } from 'react';
import { Logo } from './Logo';

export interface FooterColumn {
  title: ReactNode;
  links: { label: ReactNode; href: string }[];
}

export interface FooterProps {
  /** Short brand blurb under the logo. */
  description?: ReactNode;
  /** Link columns (the site uses "Diensten" and "Informatie"). */
  columns?: FooterColumn[];
  /** Contact column lines (address, email link...). */
  contact?: ReactNode[];
  /** Small faded KvK line in the contact column, e.g. "KvK: 74311131". */
  kvk?: ReactNode;
  /** Bottom bar: left and right text (copyright, registration). */
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
}

/** Navy site footer: logo + blurb, link columns, contact column, and a bottom copyright bar (`.footer`). */
export function Footer({ description, columns = [], contact, kvk, bottomLeft, bottomRight }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo tone="dark" />
          {description != null && <p>{description}</p>}
        </div>
        {columns.map((col, i) => (
          <div key={i} className="footer__links">
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((l, j) => <li key={j}><a href={l.href}>{l.label}</a></li>)}
            </ul>
          </div>
        ))}
        {(contact || kvk) && (
          <div className="footer__contact">
            <h4>Contact</h4>
            {contact?.map((c, i) => <p key={i}>{c}</p>)}
            {kvk != null && <p className="footer__kvk">{kvk}</p>}
          </div>
        )}
      </div>
      {(bottomLeft != null || bottomRight != null) && (
        <div className="footer__bottom">
          <div className="container">
            {bottomLeft != null && <p>{bottomLeft}</p>}
            {bottomRight != null && <p>{bottomRight}</p>}
          </div>
        </div>
      )}
    </footer>
  );
}
