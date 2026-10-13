import { ServiceCard, ServicesGrid } from 'joepdeschademan';

export const ThreeColumns = () => (
  <div>
    <ServicesGrid>
      <ServiceCard icon="🔧" title="Schadeherstel" href="#contact">Begeleiding bij het aanvragen van herstel van fysieke schade aan uw woning.</ServiceCard>
      <ServiceCard icon="💰" title="Vaste Vergoeding" href="#contact">Claimen van de vaste vergoeding (tot €10.000) binnen het aardbevingsgebied.</ServiceCard>
      <ServiceCard featured badge="Populair" icon="📋" title="Volledige Aanvraagbegeleiding" href="#contact">Wij nemen het gehele traject uit handen, van intake tot uitbetaling.</ServiceCard>
      <ServiceCard icon="🔍" title="Rapportcontrole" href="#contact">Wij controleren het rapport en zorgen dat de compensatie juist is.</ServiceCard>
      <ServiceCard icon="✍️" title="Zienswijze & Bezwaar" href="#contact">Professioneel opgestelde bezwaarschriften bij een onjuiste beslissing.</ServiceCard>
      <ServiceCard icon="🤝" title="Maatwerk Oplossingen" href="#contact">Complexe situaties? Wij bepalen samen de beste strategie.</ServiceCard>
    </ServicesGrid>
  </div>
);
