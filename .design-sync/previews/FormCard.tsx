import { Button, Checkbox, FormCard, FormRow, TextField } from 'joepdeschademan';

export const IntakeOnDark = () => (
  <div style={{ background: 'var(--color-dark)', padding: 32, width: 640 }}>
    <FormCard>
      <FormRow>
        <TextField id="voornaam" label="Voornaam" required />
        <TextField id="achternaam" label="Achternaam" required />
      </FormRow>
      <TextField id="email" type="email" label="E-mailadres" required />
      <TextField id="adres" label="Adres van het pand" required />
      <Checkbox id="akkoord" required label={<>Ik ga akkoord met de <a href="privacy.html" className="link">privacyverklaring</a></>} />
      <Button type="submit" size="lg" fullWidth>Gratis intake aanvragen</Button>
    </FormCard>
  </div>
);
