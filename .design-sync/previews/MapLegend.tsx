import { MapLegend } from 'joepdeschademan';

export const Zones = () => (
  <div style={{ width: 720 }}>
    <MapLegend title="Klik op een zone voor meer informatie" items={[
      { label: 'Aardbevingsgebied – kom ik in aanmerking?', color: '#fc6603' },
      { label: 'Randgebied (5 km omgeving) – mogelijk in aanmerking', color: '#fc6603', opacity: 0.4 },
      { label: 'Bijzonder aandachtsgebied – Norg & Grijpskerk (6 km)', color: '#fc3103', shape: 'circle' },
    ]} />
  </div>
);
