import { Button } from 'joepdeschademan';

export const Primary = () => <Button href="#contact">Gratis intake aanvragen</Button>;

export const Outline = () => <Button variant="outline" href="#aanmerking">Kijk of u in aanmerking komt</Button>;

export const HeroPair = () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <Button size="lg" href="#contact">Gratis intake aanvragen</Button>
    <Button size="lg" variant="outline" href="#aanmerking">Kijk of u in aanmerking komt</Button>
  </div>
);

export const FullWidthSubmit = () => (
  <div style={{ width: 360 }}>
    <Button type="submit" size="lg" fullWidth>Gratis intake aanvragen</Button>
  </div>
);
