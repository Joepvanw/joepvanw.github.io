import { Fragment, type ReactNode } from 'react';

export interface TrustBarItem {
  title: ReactNode;
  subtitle?: ReactNode;
}

export interface TrustBarProps {
  /** Usually 3 short trust claims; thin dividers are inserted between them. */
  items: TrustBarItem[];
}

/** Full-width solid-blue band of centered trust claims separated by dividers (`.trustbar`). */
export function TrustBar({ items }: TrustBarProps) {
  return (
    <section className="trustbar">
      <div className="container trustbar__inner">
        {items.map((it, i) => (
          <Fragment key={i}>
            {i > 0 && <div className="trustbar__divider" />}
            <div className="trustbar__item">
              <strong>{it.title}</strong>
              {it.subtitle != null && <span>{it.subtitle}</span>}
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
