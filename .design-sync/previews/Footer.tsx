import { Footer } from 'joepdeschademan';

export const Full = () => (
  <Footer
    description="Wij staan voor u klaar bij uw schadeaanvraag voor mijnbouwschade. Betrouwbaar, persoonlijk en resultaatgericht."
    columns={[
      { title: 'Diensten', links: [
        { label: 'Schadeherstel', href: '#diensten' },
        { label: 'Vaste Vergoeding', href: '#diensten' },
        { label: 'Aanvraagbegeleiding', href: '#diensten' },
        { label: 'Rapportcontrole', href: '#diensten' },
      ] },
      { title: 'Informatie', links: [
        { label: 'In aanmerking komen', href: '#aanmerking' },
        { label: 'Werkwijze', href: '#werkwijze' },
        { label: 'Veelgestelde vragen', href: '#faq' },
        { label: 'Privacyverklaring', href: 'privacy.html' },
      ] },
    ]}
    contact={['Groningen, Groningen', <a href="#contact">Contactformulier</a>]}
    kvk="KvK: 74311131"
    bottomLeft="© 2024 MijnbouwschadeHulp. Alle rechten voorbehouden."
    bottomRight="Geregistreerd bij de Kamer van Koophandel · No Cure, No Pay"
  />
);
