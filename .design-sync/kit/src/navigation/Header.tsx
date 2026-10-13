import { useState, type ReactNode } from 'react';
import { cx } from '../cx';
import { Logo } from './Logo';

export interface HeaderLink {
  label: ReactNode;
  href: string;
  /** Highlight as the current section. */
  active?: boolean;
}

export interface HeaderProps {
  /** Plain nav links (muted grey, blue on hover). */
  links: HeaderLink[];
  /** Solid blue pill link at the end of the nav, e.g. "Gratis intake". */
  cta?: { label: ReactNode; href: string };
  /** Replace the default `Logo`. */
  logo?: ReactNode;
  /** Adds the drop shadow used once the page is scrolled. */
  scrolled?: boolean;
}

/** Sticky translucent white top bar: logo left, nav links + CTA pill right; hamburger menu ≤768px (`.header`). */
export function Header({ links, cta, logo, scrolled }: HeaderProps) {
  const [open, setOpen] = useState(false);
  return (
    <header className={cx('header', scrolled && 'scrolled')}>
      <div className="container header__inner">
        {logo ?? <Logo />}
        <nav className={cx('nav', open && 'open')}>
          <ul className="nav__list">
            {links.map((l, i) => (
              <li key={i}><a href={l.href} className={cx('nav__link', l.active && 'active')} onClick={() => setOpen(false)}>{l.label}</a></li>
            ))}
            {cta && <li><a href={cta.href} className="nav__link nav__link--cta" onClick={() => setOpen(false)}>{cta.label}</a></li>}
          </ul>
        </nav>
        <button type="button" className={cx('hamburger', open && 'open')} aria-label="Menu openen" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
