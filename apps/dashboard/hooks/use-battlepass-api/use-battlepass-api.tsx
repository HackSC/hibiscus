import React from 'react';
import {
  BattlepassAPI,
  BattlepassAPIInterface,
} from '../../common/apis/battlepass/battlepass.api';

export const BattlepassAPIContext =
  React.createContext<BattlepassAPIInterface>(null);

interface Props extends React.PropsWithChildren {
  mock?: boolean;
}

export const BattlepassAPIProvider = (props: Props) => {
  const battlepassAPIInstance = new BattlepassAPI(props.mock);
  return (
    <BattlepassAPIContext.Provider value={battlepassAPIInstance}>
      {props.children}
    </BattlepassAPIContext.Provider>
  );
};

export const useBattlepassAPI = () => {
  const instance = React.useContext(BattlepassAPIContext);
  return instance;
};
