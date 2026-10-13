import { ReviewCard, ReviewsGrid } from 'joepdeschademan';

export const ThreeReviews = () => (
  <div>
    <ReviewsGrid>
      <ReviewCard quote="Binnen drie maanden was alles geregeld. Wij hoefden zelf niets te doen." author="Annemiek de Vries" meta="Loppersum" initials="AV" />
      <ReviewCard featured quote="Na een afwijzing kregen wij via het bezwaar alsnog een volledige vergoeding." author="Henk Bakker" meta="Appingedam" initials="HB" />
      <ReviewCard rating={4} quote="Duidelijke communicatie en snel een expert aan de deur." author="Familie Mulder" meta="Assen" initials="FM" />
    </ReviewsGrid>
  </div>
);
