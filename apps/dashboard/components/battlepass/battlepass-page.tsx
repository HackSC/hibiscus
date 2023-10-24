import { H3, Text } from '@hibiscus/ui';
import { useBattlepassAPI } from '../../hooks/use-battlepass-api/use-battlepass-api';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BattlepassPointsBar from './battlepass-points-bar';
import { BattlepassWelcomeHeader } from './battlepass-welcome-header';
import BattlepassLeaderboard from './leaderboard/battlepass-leaderboard';
import { BonusPointItem } from './bonus-points/types';
import BattlepassBonusPointsList from './bonus-points/bonus-points-list';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import Image from 'next/image';
import {
  BattlepassProgress,
  BATTLEPASS_LEVEL_POINTS,
  calculateBattlepassProgress,
} from '../../common/calculate-battlepass-progress';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';

function BattlepassPage() {
  const battlepassAPI = useBattlepassAPI();
  const [bonusPointItems, setBPItems] = useState<{
    data: BonusPointItem[];
    loading: boolean;
  }>({ data: [], loading: true });
  const { user } = useHibiscusUser();
  const [bpProg, setBattlepassProgress] = useState<BattlepassProgress | null>(
    null
  );
  const [userPoints, setUserPoints] = useState<number | null>(null);

  useEffect(() => {
    battlepassAPI.getBonusPointEventsUserStatus(user.id).then((res) => {
      setBPItems({
        data: res.data.map((item) => ({
          id: item.id,
          status: item.status,
          title: item.name,
          description: item.description,
          points: item.points,
          link: item.link,
        })),
        loading: false,
      });
    });
  }, []);

  useEffect(() => {
    battlepassAPI.getUserTotalPoints(user.id).then((res) => {
      const bpp = calculateBattlepassProgress(res.data.points);
      setUserPoints(res.data.points);
      setBattlepassProgress(bpp);
    });
  }, []);

  return (
    <Wrapper>
      <BattlepassWelcomeHeader />
      <WidgetContainer>
        <WidgetHeader>Your Points</WidgetHeader>
        {bpProg !== null && (
          <BattlepassPointsBar
            rangeMinPoint={bpProg.level}
            rangeMaxPoint={bpProg.nextLevel}
            currentPoint={userPoints}
            minLabel={
              <Text>
                Current points: <GlowSpan>{userPoints}</GlowSpan>
              </Text>
            }
            maxLabel={
              BATTLEPASS_LEVEL_POINTS[bpProg.level] <
              BATTLEPASS_LEVEL_POINTS[3] ? (
                <Text>
                  Next level points:{' '}
                  <GlowSpan color={Colors2023.BLUE.STANDARD}>
                    {bpProg.nextLevel}
                  </GlowSpan>
                </Text>
              ) : null
            }
          />
        )}
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
  background-color: white;
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
  color: var(--Redward, #ff514f);
  font-feature-settings: 'cv05' on;
  font-family: Filson Pro;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1.25px;
`;
