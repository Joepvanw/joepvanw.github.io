import { ContactList } from 'joepdeschademan';

export const OnDark = () => (
  <div style={{ background: 'var(--color-dark)', padding: 32, width: 420 }}>
    <ContactList items={[
      { icon: 'location', label: 'Groningen, Groningen' },
      { icon: 'email', label: 'info@joepdeschademan.nl' },
      { icon: 'phone', label: '050 123 45 67' },
    ]} />
  </div>
);
