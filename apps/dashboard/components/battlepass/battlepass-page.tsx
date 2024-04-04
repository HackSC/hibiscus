import { H3, Text } from '@hibiscus/ui';
import { GlobalStyles } from '@hibiscus/styles';
import {
  GlobalStyle,
  BodyTextSmall,
  BodyText,
  Heading,
} from '@hacksc/sctw-ui-kit';
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
            minLabel={<YellowPoints>{userPoints} PTS</YellowPoints>}
            maxLabel={
              BATTLEPASS_LEVEL_POINTS[bpProg.level] <
              BATTLEPASS_LEVEL_POINTS[3] ? (
                <PreNextLevelText>
                  Next level @{' '}
                  <NextLevelTextSpan color={Colors2023.BLUE.STANDARD}>
                    {bpProg.nextLevel} PTS
                  </NextLevelTextSpan>
                </PreNextLevelText>
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

const PreNextLevelText = styled(BodyTextSmall)`
  color: #939393;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const NextLevelTextSpan = styled.span`
  color: var(--Redward, #ff514f);
  text-align: center;
  /* smaller red glow */
  text-shadow: 0px 0px 10px rgba(255, 94, 92, 0.5);
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0;
  text-transform: uppercase;
`;

const YellowPoints = styled(BodyTextSmall)`
  color: var(--Arthurs-Sweater, #ecb400);
  text-align: center;
  /* smaller yellow glow */
  text-shadow: 0px 0px 10px #ffd13c;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0;
  text-transform: uppercase;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: white;
  padding-bottom: 50px;
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
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const WidgetHeader = styled.p`
  font-family: 'filson-pro', sans-serif;
  color: var(--Redward, #ff514f);
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1.25px;
`;
