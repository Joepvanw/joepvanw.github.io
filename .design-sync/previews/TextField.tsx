import { FormRow, TextField } from 'joepdeschademan';

export const Default = () => (
  <div style={{ width: 420 }}>
    <TextField id="email" type="email" label="E-mailadres" required placeholder="naam@voorbeeld.nl" />
  </div>
);

export const WithError = () => (
  <div style={{ width: 420 }}>
    <TextField id="adres" label="Adres van het pand" required defaultValue="Hoofdstraat" error="Vul een volledig adres in, inclusief huisnummer." />
  </div>
);

export const Multiline = () => (
  <div style={{ width: 420 }}>
    <TextField id="situatie" label="Beschrijf uw situatie kort" multiline placeholder="Bijv. scheuren in de woning, eerdere afwijzing van IMG..." />
  </div>
);

export const NameRow = () => (
  <div style={{ width: 520 }}>
    <FormRow>
      <TextField id="voornaam" label="Voornaam" required defaultValue="Joep" />
      <TextField id="achternaam" label="Achternaam" required />
    </FormRow>
  </div>
);
