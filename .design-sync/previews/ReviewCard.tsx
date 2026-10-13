import { ReviewCard } from 'joepdeschademan';

export const Default = () => (
  <div style={{ width: 340 }}>
    <ReviewCard
      quote="Na jaren gedoe met het IMG had Joep binnen drie maanden alles geregeld. Heel prettig dat wij zelf niets hoefden te doen."
      author="Annemiek de Vries" meta="Loppersum · Schadeherstel" initials="AV" />
  </div>
);

export const Featured = () => (
  <div style={{ width: 340 }}>
    <ReviewCard featured rating={5}
      quote="Onze eerdere aanvraag was afgewezen. Dankzij het bezwaar kregen wij alsnog een volledige vergoeding."
      author="Henk Bakker" meta="Appingedam · Bezwaar" initials="HB" />
  </div>
);

export const FourStars = () => (
  <div style={{ width: 340 }}>
    <ReviewCard rating={4} quote="Duidelijke communicatie en snel een expert aan de deur." author="Familie Mulder" meta="Assen" initials="FM" />
  </div>
);
