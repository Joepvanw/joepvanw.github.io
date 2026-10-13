import { FormRow, TextField } from 'joepdeschademan';

export const TwoFields = () => (
  <div style={{ width: 520 }}>
    <FormRow>
      <TextField id="voornaam" label="Voornaam" required />
      <TextField id="telefoon" type="tel" label="Telefoonnummer" />
    </FormRow>
  </div>
);
