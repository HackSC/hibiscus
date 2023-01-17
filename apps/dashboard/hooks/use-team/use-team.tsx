import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { Team } from '../../common/types';

const TeamContext = React.createContext<{
  team: Team | null;
  setTeam: Dispatch<SetStateAction<Team>> | null;
}>({
  team: null,
  setTeam: null,
});

export const TeamProvider = (props: React.PropsWithChildren) => {
  const [team, setTeam] = useState<Team | null>(null);
  return (
    <TeamContext.Provider value={{ team, setTeam }}>
      {props.children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const { team, setTeam } = useContext(TeamContext);
  const isLoading = team === null;
  const noTeam = team !== null && team.id === null;
  const setNoTeam = () => {
    setTeam({ id: null, name: null, description: null });
  };

  return {
    team,
    setTeam,
    isLoading,
    noTeam,
    setNoTeam,
  };
};
