import { H3, Text } from '@hibiscus/ui';
import { useBattlepassAPI } from '../../hooks/use-battlepass-api/use-battlepass-api';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BattlepassPointsBar from './battlepass-points-bar';
import { BattlepassWelcomeHeader } from './battlepass-welcome-header';
import BattlepassLeaderboard from './leaderboard/battlepass-leaderboard';
import { BonusPointItem } from './bonus-points/types';
import BattlepassBonusPointsList from './bonus-points/bonus-points-list';

function BattlepassPage() {
  const battlepassAPI = useBattlepassAPI();
  const [bonusPointItems, setBPItems] = useState<{
    data: BonusPointItem[];
    loading: boolean;
  }>({ data: [], loading: true });

  useEffect(() => {
    // MOCK
    battlepassAPI.getBonusPointEvents().then((res) => {
      setBPItems({
        data: res.data.map((item) => ({
          status: 'VERIFY',
          title: item.name,
          description: item.description,
          points: item.points,
          link: item.link,
        })),
        loading: false,
      });
    });
  }, []);

  return (
    <Wrapper>
      <BattlepassWelcomeHeader />
      <WidgetContainer>
        <WidgetHeader>Your Points</WidgetHeader>
        <BattlepassPointsBar
          rangeMinPoint={100}
          rangeMaxPoint={300}
          currentPoint={200}
        />
      </WidgetContainer>
      <SecondSection>
        <LeftColumnSecondSection>
          <WidgetContainer>
            <WidgetHeader>Leaderboard</WidgetHeader>
            <BattlepassLeaderboard />
          </WidgetContainer>
        </LeftColumnSecondSection>
        <RightColumnSecondSection>
          <WidgetContainer>
            <WidgetHeader>Bonus Points</WidgetHeader>
            {bonusPointItems.loading ? (
              <Text>Loading</Text>
            ) : (
              <BattlepassBonusPointsList items={bonusPointItems.data} />
            )}
          </WidgetContainer>
        </RightColumnSecondSection>
      </SecondSection>
    </Wrapper>
  );
}

export default BattlepassPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LeftColumnSecondSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const RightColumnSecondSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const SecondSection = styled.div`
  display: flex;
  gap: 30px;
`;

const WidgetHeader = styled(H3)`
  font-size: 120%;
`;
