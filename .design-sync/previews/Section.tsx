import { Section, SectionHeader } from 'joepdeschademan';

export const Default = () => (
  <Section id="diensten">
    <SectionHeader badge="Onze diensten" title="Waarmee kunnen wij u helpen?" subtitle="Van eenvoudige schademeldingen tot complexe bezwaarprocedures." />
  </Section>
);

export const Alt = () => (
  <Section variant="alt" id="aanmerking">
    <SectionHeader badge="Kom ik in aanmerking?" title="Controleer uw situatie in één minuut" />
  </Section>
);

export const Dark = () => (
  <Section variant="dark" id="contact">
    <h2 className="section__title section__title--light">Klaar om uw aanvraag te starten?</h2>
    <p className="contact__subtitle">Vul het formulier in en wij nemen binnen één werkdag contact met u op.</p>
  </Section>
);
