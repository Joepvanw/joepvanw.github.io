import { Step, Steps } from 'joepdeschademan';

export const FourSteps = () => (
  <Steps>
    <Step number={1} title="Gratis intake gesprek">U vult het contactformulier in. <strong>Binnen 2 weken staat er een expert bij u aan de deur.</strong></Step>
    <Step number={2} title="Dossieropbouw">Wij verzamelen alle documenten en dienen uw aanvraag in bij het Instituut Mijnbouwschade Groningen (IMG).</Step>
    <Step number={3} title="Begeleiding & onderhandeling">Wij houden de voortgang bij, communiceren namens u en handelen eventuele bezwaren af.</Step>
    <Step number={4} title="Vergoeding ontvangen">Na toewijzing wordt de vergoeding uitbetaald. Pas daarna brengen wij onze fee in rekening.</Step>
  </Steps>
);
