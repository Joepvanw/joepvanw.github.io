import { ServiceCard } from 'joepdeschademan';

export const Default = () => (
  <div style={{ width: 340 }}>
    <ServiceCard icon="🔧" title="Schadeherstel" href="#contact">
      Begeleiding bij het aanvragen van herstel van fysieke schade aan uw woning of bedrijfspand.
    </ServiceCard>
  </div>
);

export const Featured = () => (
  <div style={{ width: 340 }}>
    <ServiceCard featured badge="Populair" icon="📋" title="Volledige Aanvraagbegeleiding" href="#contact">
      Wij nemen het gehele traject uit handen: van intake en documentatie tot onderhandeling en uitbetaling.
    </ServiceCard>
  </div>
);
