import { BattlepassAPIProvider } from '../../hooks/use-battlepass-api/use-battlepass-api';
import BattlepassPage from '../../components/battlepass/battlepass-page';

const Index = () => (
  <BattlepassAPIProvider mock={false}>
    <BattlepassPage />
  </BattlepassAPIProvider>
);

export default Index;
