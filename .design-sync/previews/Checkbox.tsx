import { Checkbox } from 'joepdeschademan';

export const Default = () => <Checkbox id="gebeld" label="Ik wil gebeld worden" />;

export const CheckedWithLink = () => (
  <Checkbox id="akkoord" required defaultChecked label={<>Ik ga akkoord met de <a href="privacy.html" className="link">privacyverklaring</a></>} />
);

export const WithError = () => (
  <Checkbox id="akkoord2" required label={<>Ik ga akkoord met de <a href="privacy.html" className="link">privacyverklaring</a></>} error="U moet akkoord gaan met de privacyverklaring." />
);
