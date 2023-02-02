import { Text } from '@hibiscus/ui';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GrayBox } from '../../gray-box/gray-box';
import { LeaderboardEntry } from './types';
import { TfiCrown } from 'react-icons/tfi';
import { Colors2023 } from '@hibiscus/styles';
import { BATTLEPASS_LEADERBOARD_PAGE_SIZE } from '../../../common/constants';
import { useBattlepassAPI } from '../../../hooks/use-battlepass-api/use-battlepass-api';
import useHibiscusUser from '../../../hooks/use-hibiscus-user/use-hibiscus-user';

function BattlepassLeaderboard() {
  const battlepassAPI = useBattlepassAPI();
  const { user } = useHibiscusUser();
  const [leaderboardResults, setLeaderboardResults] = useState<{
    data: LeaderboardEntry[];
    loading: boolean;
    fetch: boolean;
    pageSize: number;
    pageNumber: number;
  }>({
    data: [],
    loading: true,
    fetch: true,
    pageSize: BATTLEPASS_LEADERBOARD_PAGE_SIZE,
    pageNumber: 0,
  });
  const [userRankLeaderboard, setUserRankLeaderboard] = useState<{
    data: LeaderboardEntry;
    loading: boolean;
  }>({ data: null, loading: true });

  useEffect(() => {
    // MOCK
    if (leaderboardResults.fetch) {
      battlepassAPI
        .getLeaderboard(
          BATTLEPASS_LEADERBOARD_PAGE_SIZE,
          leaderboardResults.pageNumber
        )
        .then((res) => {
          setLeaderboardResults({
            data: res.data.leaderboard.map((item, i) => ({
              firstName: item.first_name,
              lastName: item.last_name,
              points: item.bonus_points + item.event_points,
              rank: res.data.page_number * res.data.page_count + i + 1,
            })),
            loading: false,
            fetch: false,
            pageSize: res.data.page_count,
            pageNumber: res.data.page_number,
          });
        });
    }
  }, [leaderboardResults.fetch]);

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
    <GrayContainer>
      {leaderboardResults.data.map((item) => (
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
      {!userRankLeaderboard.loading && (
        <CurrentUserEntry>
          <Text style={{ fontWeight: 'bold' }}>
            {userRankLeaderboard.data.rank}
          </Text>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold' }}>
              {user.firstName} {user.lastName}
            </Text>
          </div>
          <Text style={{ fontWeight: 'bold' }}>
            {userRankLeaderboard.data.points} pts
          </Text>
        </CurrentUserEntry>
      )}
      <LeaderboardPageTabs
        totalPages={10}
        onClickNext={(num) => {
          setLeaderboardResults((prev) => ({
            ...prev,
            fetch: true,
            pageNumber: num,
          }));
        }}
        onClickPrev={(num) => {
          setLeaderboardResults((prev) => ({
            ...prev,
            fetch: true,
            pageNumber: num,
          }));
        }}
      />
    </GrayContainer>
  );
}

export default BattlepassLeaderboard;

interface LeaderboardPageTabsProps {
  totalPages: number;
  onClickNext: (newPageNumber: number) => void;
  onClickPrev: (newPageNumber: number) => void;
}

const LeaderboardPageTabs = (props: LeaderboardPageTabsProps) => {
  const [currentPageIndex, setCPI] = useState(0);
  const minPageIndex = 0;

  const handleClickPrev = () => {
    if (currentPageIndex === minPageIndex) return;
    setCPI((prev) => prev - 1);
    props.onClickPrev(currentPageIndex - 1);
  };

  const handleClickNext = () => {
    if (currentPageIndex >= props.totalPages - 1) return;
    setCPI((prev) => prev + 1);
    props.onClickNext(currentPageIndex + 1);
  };

  return (
    <LeaderboardTabContainer>
      <button
        style={{
          appearance: 'none',
          background: 'none',
          color: 'white',
          cursor: 'pointer',
        }}
        onClick={handleClickPrev}
      >
        <Text>{'<'}</Text>
      </button>
      <Text>{currentPageIndex + 1}</Text>
      <button
        style={{
          appearance: 'none',
          background: 'none',
          color: 'white',
          cursor: 'pointer',
        }}
        onClick={handleClickNext}
      >
        <Text>{'>'}</Text>
      </button>
    </LeaderboardTabContainer>
  );
};

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
  padding: 10px;
  border-radius: 5px;
`;

const LeaderboardTabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
