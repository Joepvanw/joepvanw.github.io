import { Container } from 'joepdeschademan';

export const PageWidth = () => (
  <div style={{ background: 'var(--color-bg-alt)', padding: '24px 0' }}>
    <Container>
      <div style={{ border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-sm)', padding: 16, color: 'var(--color-text-muted)', background: '#fff' }}>
        Inhoud blijft binnen 1160px met 24px zijmarge.
      </div>
    </Container>
  </div>
);
