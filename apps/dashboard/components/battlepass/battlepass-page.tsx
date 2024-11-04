import { Text } from '@hibiscus/ui';
import { useBattlepassAPI } from '../../hooks/use-battlepass-api/use-battlepass-api';
import React, { useEffect, useState } from 'react';
import BattlepassPointsBar from './battlepass-points-bar';
import BattlepassLeaderboard from './leaderboard/battlepass-leaderboard';
import { BonusPointItem } from './bonus-points/types';
import BattlepassBonusPointsList from './bonus-points/bonus-points-list';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import {
  BattlepassProgress,
  BATTLEPASS_LEVEL_POINTS,
  calculateBattlepassProgress,
} from '../../common/calculate-battlepass-progress';

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
    <div className="border-neutral-200 border">
      {/* content */}
      <div className="flex space-x-[90px]">
        {/* left column */}
        <div className="flex-1 space-y-[60px] flex flex-col justify-between">
          {/* points bar */}
          <div>
            <h2 className="text-base m-0 mb-[10px]">Points</h2>
            {bpProg !== null && (
              <BattlepassPointsBar
                rangeMinPoint={bpProg.level}
                rangeMaxPoint={bpProg.nextLevel}
                currentPoint={userPoints}
                minLabel={
                  <div className="text-sm italic">{userPoints + ' pts'}</div>
                }
                maxLabel={
                  BATTLEPASS_LEVEL_POINTS[bpProg.level] <
                  BATTLEPASS_LEVEL_POINTS[3] ? (
                    <div className="text-theme-gray text-sm">
                      {'NEXT LEVEL @ '}{' '}
                      <span className="text-theme-blue italic font-medium">
                        {bpProg.nextLevel + ' pts'}
                      </span>
                    </div>
                  ) : null
                }
              />
            )}
          </div>
          {/* bonus points activities */}
          <div>
            <h2 className="text-base m-0 mb-[10px]">Bonus Points</h2>
            {bonusPointItems.loading ? (
              <Text>Loading</Text>
            ) : (
              <BattlepassBonusPointsList items={bonusPointItems.data} />
            )}
          </div>
        </div>
        {/* leaderboard */}
        <div className="flex-1">
          <h2 className="text-base m-0 mb-[10px]">Leaderboard</h2>
          <BattlepassLeaderboard />
        </div>
      </div>
    </div>
  );
}

export default BattlepassPage;
