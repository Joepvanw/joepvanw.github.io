import { FaqItem } from 'joepdeschademan';

export const Open = () => (
  <div style={{ width: 680 }}>
    <FaqItem defaultOpen question="Welke documenten heb ik nodig?">
      U dient <strong>eigenaar van de woning</strong> te zijn. Meer heeft u in principe niet nodig om te beginnen.
    </FaqItem>
  </div>
);

export const Closed = () => (
  <div style={{ width: 680 }}>
    <FaqItem question="Werken jullie ook buiten Groningen?">Ja, ook in Drenthe en andere mijnbouwgebieden.</FaqItem>
  </div>
);
