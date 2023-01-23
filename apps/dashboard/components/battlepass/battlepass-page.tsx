import React from 'react';
import {
  BattlepassAPIProvider,
  useBattlepassAPI,
} from '../../hooks/use-battlepass-api/use-battlepass-api';
import BonusPointsList from './bonus-points/bonus-points-list';

function BattlepassPage() {
  return <BattlepassAPIProvider></BattlepassAPIProvider>;
}

export default BattlepassPage;
