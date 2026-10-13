import { StatCard } from 'joepdeschademan';

export const Main = () => <StatCard icon="🏠" label="Gemiddelde vergoeding" value="€ 12.650" />;

export const Secondary = () => <StatCard variant="secondary" icon="✅" label="Succesratio" value="94%" />;

export const Tertiary = () => <StatCard variant="tertiary" icon="⚡" label="Doorlooptijd" value="6–12 weken" />;
