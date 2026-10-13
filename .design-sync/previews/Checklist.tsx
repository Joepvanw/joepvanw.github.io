import { Checklist } from 'joepdeschademan';

export const Eligibility = () => (
  <div style={{ maxWidth: 640 }}>
    <Checklist items={[
      'Uw woning of pand staat in een mijnbouwgebied (o.a. Groningen en Drenthe)',
      'U heeft zichtbare schade: scheuren in muren, plafonds of fundering',
      'U heeft last van verzakking, scheefstand of andere structurele problemen',
      'Uw schade is nog niet eerder vergoed of onvoldoende afgehandeld',
    ]} />
  </div>
);
