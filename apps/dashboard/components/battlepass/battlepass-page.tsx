import { H3, Text } from '@hibiscus/ui';
import { useBattlepassAPI } from '../../hooks/use-battlepass-api/use-battlepass-api';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BattlepassPointsBar from './battlepass-points-bar';
import { BattlepassWelcomeHeader } from './battlepass-welcome-header';
import BattlepassLeaderboard from './leaderboard/battlepass-leaderboard';
import { LeaderboardEntry } from './leaderboard/types';
import { BonusPointItem } from './bonus-points/types';
import BattlepassBonusPointsList from './bonus-points/bonus-points-list';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import { setUser } from '@sentry/browser';
import { useStyleRegistry } from 'styled-jsx';

const BATTLEPASS_LEADERBOARD_PAGE_SIZE = 10;

function BattlepassPage() {
  const battlepassAPI = useBattlepassAPI();
  const [leaderboardResults, setLeaderboardResults] = useState<{
    data: LeaderboardEntry[];
    loading: boolean;
  }>({ data: [], loading: true });
  const [bonusPointItems, setBPItems] = useState<{
    data: BonusPointItem[];
    loading: boolean;
  }>({ data: [], loading: true });
  const [userRankLeaderboard, setUserRankLeaderboard] = useState<{
    data: LeaderboardEntry;
    loading: boolean;
  }>({ data: null, loading: true });
  const { user } = useHibiscusUser();

  useEffect(() => {
    // MOCK
    battlepassAPI
      .getLeaderboard(BATTLEPASS_LEADERBOARD_PAGE_SIZE, 0)
      .then((res) => {
        setLeaderboardResults({
          data: res.data.leaderboard.map((item, i) => ({
            firstName: item.first_name,
            lastName: item.last_name,
            points: item.bonus_points + item.event_points,
            rank: i + 1,
          })),
          loading: false,
        });
      });
  }, []);

  useEffect(() => {
    // MOCK
    battlepassAPI.getBonusPointEvents().then((res) => {
      setBPItems({
        data: res.data.map((item) => ({
          status: 'VERIFY',
          title: item.name,
          description: item.description,
          points: item.points,
        })),
        loading: false,
      });
    });
  }, []);

  useEffect(() => {
    // MOCK
    (async () => {
      const [resUserRank, resUserTotPoints] = await Promise.all([
        battlepassAPI.getUserRankLeaderboard(user.id),
        battlepassAPI.getUserTotalPoints(user.id),
      ]);
      setUserRankLeaderboard({
        data: {
          rank: resUserRank.data.place,
          firstName: user.firstName,
          lastName: user.lastName,
          points: resUserTotPoints.data.points,
        },
        loading: false,
      });
    })();
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
            {leaderboardResults.loading ? (
              <Text>Loading</Text>
            ) : (
              <BattlepassLeaderboard
                list={leaderboardResults.data}
                currentUserLeaderboardData={userRankLeaderboard.data}
              />
            )}
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
