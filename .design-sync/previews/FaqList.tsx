import { FaqList } from 'joepdeschademan';

const items = [
  {
    question: 'Wat kost uw dienstverlening?',
    answer: <>Wij werken uitsluitend op basis van <strong>No Cure, No Pay</strong>. U betaalt pas als uw aanvraag succesvol wordt toegewezen en u daadwerkelijk een vergoeding ontvangt.</>,
  },
  {
    question: 'Hoe lang duurt het proces?',
    answer: <>De doorlooptijd varieert per situatie, maar gemiddeld duurt een aanvraag <strong>6 tot 12 weken</strong>.</>,
  },
  {
    question: 'Kan ik ook helpen als mijn schade al eerder is afgewezen?',
    answer: 'Ja, zeker. Een eerdere afwijzing is geen eindoordeel. Wij beoordelen uw dossier opnieuw.',
  },
  {
    question: 'Werken jullie ook buiten Groningen?',
    answer: 'Ja, naast Groningen bedienen wij ook gedupeerden in Drenthe en andere mijnbouwgebieden.',
  },
];

export const FirstOpen = () => <FaqList items={items} defaultOpenIndex={0} />;

export const AllClosed = () => <FaqList items={items} />;
