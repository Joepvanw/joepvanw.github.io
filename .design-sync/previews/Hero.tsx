import { Button, Hero, TextAccent } from 'joepdeschademan';

export const Landing = () => (
  <Hero
    badgeTone="default"
    badge="No Cure · No Pay"
    title={<>Heeft u schade door <TextAccent>mijnbouwactiviteiten</TextAccent>?</>}
    subtitle="Scheuren in muren, verzakkingen of andere schade door gaswinning? Wij regelen uw volledige schadeaanvraag — van intake tot uitbetaling."
    checks={[
      'U betaalt pas als uw vergoeding is uitgekeerd',
      'Binnen 2 weken staat er een expert bij u aan de deur',
      'Persoonlijk advies op maat',
    ]}
    actions={<>
      <Button size="lg" href="#contact">Gratis intake aanvragen</Button>
      <Button size="lg" variant="outline" href="#aanmerking">Kijk of u in aanmerking komt</Button>
    </>}
    stats={[
      { icon: '🏠', label: 'Gemiddelde vergoeding', value: '€ 12.650' },
      { icon: '✅', label: 'Succesratio', value: '94%' },
      { icon: '⚡', label: 'Doorlooptijd', value: '6–12 weken' },
    ]}
  />
);

export const CopyOnly = () => (
  <Hero
    badgeTone="default"
    badge="Gratis intake"
    title={<>Uw schade, <TextAccent>onze zorg</TextAccent></>}
    subtitle="Wij nemen het hele traject uit handen."
    actions={<Button size="lg" href="#contact">Start uw aanvraag</Button>}
  />
);
