import { Badge } from 'joepdeschademan';

export const Default = () => <Badge>Onze diensten</Badge>;

export const LightOnDark = () => (
  <div style={{ background: 'var(--color-dark)', padding: 24, borderRadius: 'var(--radius-md)' }}>
    <Badge tone="light">Gratis intake</Badge>
  </div>
);
