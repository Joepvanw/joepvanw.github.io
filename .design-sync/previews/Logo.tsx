import { Logo } from 'joepdeschademan';

export const OnLight = () => <Logo />;

export const OnDark = () => (
  <div style={{ background: 'var(--color-dark)', padding: 24, borderRadius: 'var(--radius-md)', display: 'inline-block' }}>
    <Logo tone="dark" />
  </div>
);
