import { Text } from '@hibiscus/ui';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GrayBox } from '../../gray-box/gray-box';
import { LeaderboardEntry } from './types';
import { TfiCrown } from 'react-icons/tfi';
import { Colors2023 } from '@hibiscus/styles';
import {
  BATTLEPASS_LEADERBOARD_PAGE_SIZE,
  MAX_BATTLEPASS_PAGES,
} from '../../../common/constants';
import { useBattlepassAPI } from '../../../hooks/use-battlepass-api/use-battlepass-api';
import useHibiscusUser from '../../../hooks/use-hibiscus-user/use-hibiscus-user';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

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
    pageNumber: 1,
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
              rank: (res.data.page_number - 1) * res.data.page_count + i + 1,
            })),
            loading: false,
            fetch: false,
            pageSize: res.data.page_count,
            pageNumber: res.data.page_number,
          });
        })
        .catch(() => {
          setLeaderboardResults({
            data: [],
            loading: false,
            fetch: false,
            pageSize: BATTLEPASS_LEADERBOARD_PAGE_SIZE,
            pageNumber: leaderboardResults.pageNumber,
          });
        });
    }
  }, [leaderboardResults.fetch]);

  useEffect(() => {
    // MOCK
    (async () => {
      try {
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
      } catch {
        setUserRankLeaderboard({
          data: {
            rank: 0,
            firstName: user.firstName,
            lastName: user.lastName,
            points: 0,
          },
          loading: false,
        });
      }
    })();
  }, []);

  return (
    <div className="border rounded-lg p-[30px] text-theme-gray">
      {leaderboardResults.data.map((item) => (
        <div key={item.rank} className="flex py-[10px] text-sm">
          <p className="w-[50px] flex-[1]">{item.rank}</p>
          <div className="flex flex-[2] items-center">
            <p className="truncate min-w-0">
              {item.firstName} {item.lastName}
            </p>
            {item.rank === 1 && (
              <TfiCrown color="#ECB400" className="ml-[10px]" />
            )}
            {item.rank === 2 && (
              <TfiCrown color="#979797" className="ml-[10px]" />
            )}
            {item.rank === 3 && (
              <TfiCrown color="#AE8C1D" className="ml-[10px]" />
            )}
          </div>
          <p>{item.points} pts</p>
        </div>
      ))}
      {!userRankLeaderboard.loading && (
        <div className="mt-[15px] bg-theme-redward flex justify-between text-white py-[10px] px-[20px] border border-black rounded-lg text-sm font-medium">
          <p>{userRankLeaderboard.data.rank}</p>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <p>
              You
              {userRankLeaderboard.data.rank === 1 && (
                <TfiCrown color="yellow" />
              )}
              {userRankLeaderboard.data.rank === 2 && (
                <TfiCrown color="silver" />
              )}
              {userRankLeaderboard.data.rank === 3 && (
                <TfiCrown color="#FFD23C" />
              )}
            </p>
          </div>
          <p>{userRankLeaderboard.data.points} pts</p>
        </div>
      )}
      {/* <LeaderboardPageTabs
        totalPages={MAX_BATTLEPASS_PAGES}
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
      /> */}
    </div>
  );
}

export default BattlepassLeaderboard;

// interface LeaderboardPageTabsProps {
//   totalPages: number;
//   onClickNext: (newPageNumber: number) => void;
//   onClickPrev: (newPageNumber: number) => void;
// }

// const LeaderboardPageTabs = (props: LeaderboardPageTabsProps) => {
//   const [currentPageNum, setCPN] = useState(1);
//   const minPageNumber = 1;

//   const handleClickPrev = () => {
//     if (currentPageNum === minPageNumber) return;
//     setCPN((prev) => prev - 1);
//     props.onClickPrev(currentPageNum - 1);
//   };

//   const handleClickNext = () => {
//     if (currentPageNum >= props.totalPages - 1) return;
//     setCPN((prev) => prev + 1);
//     props.onClickNext(currentPageNum + 1);
//   };

//   return (
//     <div className="flex justify-between">
//       <button
//         style={{
//           appearance: 'none',
//           background: 'none',
//           color: 'black',
//           cursor: 'pointer',
//         }}
//         onClick={handleClickPrev}
//       >
//         <Text>
//           <AiFillCaretLeft />
//         </Text>
//       </button>
//       <Text>{currentPageNum}</Text>
//       <button
//         style={{
//           appearance: 'none',
//           background: 'none',
//           color: 'black',
//           cursor: 'pointer',
//         }}
//         onClick={handleClickNext}
//       >
//         <Text>
//           <AiFillCaretRight />
//         </Text>
//       </button>
//     </div>
//   );
// };
