import { Text } from '@hibiscus/ui';
import React from 'react';
import styled from 'styled-components';
import { GrayBox } from '../../gray-box/gray-box';
import { LeaderboardEntry } from './types';
import { TfiCrown } from 'react-icons/tfi';
import { Colors2023 } from '@hibiscus/styles';

interface Props {
  list: LeaderboardEntry[];
  currentUserLeaderboardData: LeaderboardEntry;
}

function BattlepassLeaderboard(props: Props) {
  return (
    <GrayContainer>
      {props.list.map((item) => (
        <Entry key={item.rank}>
          <Text>{item.rank}</Text>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Text>
              {item.firstName} {item.lastName}
            </Text>
            {item.rank === 1 && <TfiCrown color="yellow" />}
            {item.rank === 2 && <TfiCrown color="silver" />}
            {item.rank === 3 && <TfiCrown color="#FFD23C" />}
          </div>
          <Text>{item.points} pts</Text>
        </Entry>
      ))}
      <CurrentUserEntry>
        <Text>{props.currentUserLeaderboardData.rank}</Text>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Text>
            {props.currentUserLeaderboardData.firstName}{' '}
            {props.currentUserLeaderboardData.lastName}
          </Text>
        </div>
        <Text>{props.currentUserLeaderboardData.points} pts</Text>
      </CurrentUserEntry>
    </GrayContainer>
  );
}

export default BattlepassLeaderboard;

const GrayContainer = styled(GrayBox)`
  gap: 20px;
  padding: 30px;
`;

const Entry = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CurrentUserEntry = styled(Entry)`
  background-color: ${Colors2023.GRAY.SCHEMDIUM};
`;
