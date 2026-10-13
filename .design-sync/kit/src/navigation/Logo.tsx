import type { ReactNode } from 'react';

export interface LogoProps {
  /** `default` for light backgrounds (header); `dark` for the navy footer (white wordmark). */
  tone?: 'default' | 'dark';
  /** Link target. Default "#". */
  href?: string;
  /** Regular-weight part of the wordmark. Default "Mijnbouwschade". */
  name?: ReactNode;
  /** Bold part of the wordmark. Default "Hulp". */
  nameStrong?: ReactNode;
  /** Small line under the wordmark. Default "JoepDeSchademan". */
  tagline?: ReactNode;
}

/** Brand lockup: blue rounded-square "A" mark + "Mijnbouwschade**Hulp**" wordmark + "JoepDeSchademan" tagline (`.logo`). */
export function Logo({ tone = 'default', href = '#', name = 'Mijnbouwschade', nameStrong = 'Hulp', tagline = 'JoepDeSchademan' }: LogoProps) {
  const dark = tone === 'dark';
  return (
    <a href={href} className="logo">
      <svg className="logo__icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill="#1a56db" />
        <path d="M10 28L20 12L30 28" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 22H26" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="logo__text" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2, color: dark ? '#fff' : undefined }}>
        <span>{name}<strong>{nameStrong}</strong></span>
        {tagline != null && (
          <span style={dark
            ? { fontSize: '0.7rem', color: 'rgba(255,255,255,.5)', fontWeight: 700 }
            : { fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 800 }}>
            {tagline}
          </span>
        )}
      </span>
    </a>
  );
}
