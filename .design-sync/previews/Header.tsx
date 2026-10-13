import { Header } from 'joepdeschademan';

const links = [
  { label: 'Diensten', href: '#diensten' },
  { label: 'Kom ik in aanmerking?', href: '#aanmerking' },
  { label: 'Werkwijze', href: '#werkwijze' },
  { label: 'FAQ', href: '#faq' },
];

export const Default = () => <Header links={links} cta={{ label: 'Gratis intake', href: '#contact' }} />;

export const Scrolled = () => (
  <div style={{ paddingBottom: 24 }}>
    <Header scrolled links={links} cta={{ label: 'Gratis intake', href: '#contact' }} />
  </div>
);
