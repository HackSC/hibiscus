import { Colors2023 } from '@hibiscus/styles';
import { BoldText, ItalicText, Text } from '@hibiscus/ui';
import { Button, GlowSpan } from '@hibiscus/ui-kit-2023';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { BiCheckCircle } from 'react-icons/bi';
import { ScrollableListBox } from '../../../components/identity-portal/scrollable-list-box/scrollable-list-box';
import Image from 'next/image';
import { BackButton } from '../../../components/identity-portal/back-button/back-button';
import { CheckInBox } from '../../../components/identity-portal/check-in-box/check-in-box';
import { ImCross } from 'react-icons/im';
import { formatTimestamp } from '../../../common/format-timestamp';
import useHibiscusUser from '../../../hooks/use-hibiscus-user/use-hibiscus-user';
import { HibiscusRole } from '@hibiscus/types';
import {
  BATTLEPASS_LEVEL_POINTS,
  calculateBattlepassProgress,
} from '../../../common/calculate-battlepass-progress';
import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';
import BattlepassPointsBar from 'apps/dashboard/components/battlepass/battlepass-points-bar';
import { BsExclamationTriangle } from 'react-icons/bs';
import { MdCheckCircleOutline } from 'react-icons/md';

const COLUMN_WIDTH = 510;
const TEAM_MEMBER_ICONS = [
  '/hackform-illustrations/purple-planet-stand.svg',
  '/hackform-illustrations/detective.svg',
  '/hackform-illustrations/heart-flying.svg',
];

enum State {
  LOADING,
  USER_FOUND,
  USER_NOT_FOUND,
  NO_ID_PROVIDED,
}

export function Index() {
  const [user, setUser] = useState<any>(null);
  const [state, setState] = useState(State.LOADING);
  const [isModalOpen, setModalOpen] = useState(false);
  const [battlepassProgress, setBattlepassProgress] = useState(null);
  const router = useRouter();
  const { supabase } = useHibiscusSupabase();

  useEffect(() => {
    async function getUserProfile(id: string, wristband = true): Promise<any> {
      const participantRes = await supabase
        .getClient()
        .from('participants')
        .select()
        .eq(wristband ? 'wristband_id' : 'id', id);

      if (participantRes.data?.length !== 1) {
        // User either not found or duplicates found == DB corrupted
        setState(State.USER_NOT_FOUND);
        return null;
      }

      const userId = participantRes.data[0].id;

      const userRes = await supabase
        .getClient()
        .from('user_profiles')
        .select()
        .eq('user_id', userId);

      const teamId = userRes.data[0].team_id;

      const leaderboardRes = await supabase
        .getClient()
        .from('leaderboard')
        .select()
        .eq('user_id', userId);

      const eventRes = await supabase
        .getClient()
        .from('event_log')
        .select(
          `
          *,
          events (
            *
          )
        `
        )
        .eq('user_id', userId)
        .limit(5)
        .order('check_in_time', { ascending: false });

      let team = null;
      if (teamId != null) {
        const teamRes = await supabase
          .getClient()
          .from('user_profiles')
          .select()
          .eq('team_id', teamId)
          .neq('user_id', userId);

        team = teamRes.data ?? [];
      }

      setState(State.USER_FOUND);

      return {
        ...userRes.data[0],
        ...participantRes.data?.[0],
        ...leaderboardRes.data?.[0],
        checkIns: eventRes.data ?? [],
        team,
      };
    }

    const wristbandId = router.query['wristband_id']?.toString();
    if (wristbandId != null) {
      getUserProfile(wristbandId).then((user) => {
        setBattlepassProgress(
          calculateBattlepassProgress(
            (user.bonus_points ?? 0) + (user.event_points ?? 0)
          )
        );
        setUser(user);
      });
    } else {
      const userId = router.query['user_id']?.toString();
      if (userId != null) {
        getUserProfile(userId, false).then((user) => {
          setBattlepassProgress(
            calculateBattlepassProgress(
              (user.bonus_points ?? 0) + (user.event_points ?? 0)
            )
          );

          setUser(user);
        });
      } else {
        setState(State.NO_ID_PROVIDED);
      }
    }
  }, [router.isReady, router.query]);

  const { user: authUser } = useHibiscusUser();
  if (authUser == null) {
    return <>Loading</>;
  }
  // Limit access to only volunteer role
  if (authUser?.role !== HibiscusRole.VOLUNTEER) {
    router.push('/');
    return <></>;
  }

  if (state !== State.USER_FOUND) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        {state === State.LOADING
          ? 'Loading'
          : state === State.USER_NOT_FOUND
          ? 'User not found!'
          : state === State.NO_ID_PROVIDED
          ? 'No parameters provided!'
          : 'An unknown error occured'}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-[20px]">
        <h2 className="text-3xl m-0">
          {user.first_name} {user.last_name}
        </h2>

        <div className="flex flex-row gap-[40px] flex-wrap">
          <div className="flex flex-col flex-1 gap-[10px]">
            <div>
              <h3 className="text-xl m-0">Points</h3>
              <BattlepassPointsBar
                rangeMinPoint={battlepassProgress.level}
                rangeMaxPoint={battlepassProgress.nextLevel}
                currentPoint={battlepassProgress.points}
                minLabel={
                  <div className="text-sm italic">
                    {battlepassProgress.points + ' pts'}
                  </div>
                }
                maxLabel={
                  BATTLEPASS_LEVEL_POINTS[battlepassProgress.level] <
                  BATTLEPASS_LEVEL_POINTS[3] ? (
                    <div className="text-theme-gray text-sm">
                      {'NEXT LEVEL @ '}{' '}
                      <span className="text-theme-blue italic font-medium">
                        {battlepassProgress.nextLevel + ' pts'}
                      </span>
                    </div>
                  ) : null
                }
              />
            </div>

            <div>
              <h3 className="text-xl m-0">Profile Details</h3>
              <div className="flex flex-col gap-[20px] border-solid border-black border-[1px] rounded-[8px] p-[30px] text-sm">
                <div>
                  <p className="text-theme-blue">Email:</p>
                  <p>{user.email}</p>
                </div>
                <div>
                  <p className="text-theme-blue">School:</p>
                  <p>{user.school}</p>
                </div>
                <div>
                  <p className="text-theme-blue">Year:</p>
                  <p>{user.graduation_year}</p>
                </div>
                <div>
                  <p className="text-theme-blue">Major:</p>
                  <p>{user.major}</p>
                </div>

                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-[10px] items-center">
                    {user.wristband_id == null ? (
                      <div className="text-theme-redward">
                        <p className="text-xl font-medium">NOT CHECKED IN</p>
                        <BsExclamationTriangle size={20} />
                      </div>
                    ) : (
                      <>
                        <p className="text-xl font-medium">CHECKED IN</p>
                        <MdCheckCircleOutline size={20} />
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="bg-theme-redward hover:bg-red-400 active:bg-theme-redward px-[20px] py-[8px] text-white rounded-[8px] border-black border-[1px] border-solid text-xs"
                  >
                    Assign Band
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 h-full">
            <h3 className="text-xl m-0">Recent Activity</h3>
            <ScrollableListBox width={`100%`} height="425px">
              {user.checkIns.map((event) => (
                <ScrollableListBox.Item key={event.log_id}>
                  <p>{event.events.name}</p>
                  <p>
                    {event.events.location} on{' '}
                    {formatTimestamp(event.check_in_time)}
                  </p>
                </ScrollableListBox.Item>
              ))}
            </ScrollableListBox>
          </div>
        </div>
      </div>

      <CheckInBox
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        user={user}
      />
    </>
  );
}

export default Index;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${COLUMN_WIDTH}px, 1fr));
  justify-items: center;
  min-height: 100%;
`;

const ColumnSpacedCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5em;
`;

const ColumnSpacedLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`;

const UserCardContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 360px;

  padding: 1.5em 2.5em;

  gap: 1.5em;

  background-color: ${Colors2023.GRAY.STANDARD};

  border: thick solid ${Colors2023.GRAY.MEDIUM};
  border-radius: 9px;
`;

const SpacedRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProgressBarOuter = styled.div`
  width: ${COLUMN_WIDTH}px;
  height: 20px;

  border: 3px solid ${Colors2023.YELLOW.LIGHT};
  border-radius: 10px;

  overflow: hidden;
`;

const ProgressBarInner = styled.div<{ progress: number }>`
  width: ${(props) => props.progress * COLUMN_WIDTH}px;
  height: 100%;

  background-color: ${Colors2023.YELLOW.STANDARD};

  margin-left: -2px;

  overflow: hidden;
`;

const TeamContainerEmpty = styled.div`
  width: ${COLUMN_WIDTH}px;

  padding: 1.5em 2.5em;

  gap: 1.5em;

  background-color: ${Colors2023.GRAY.STANDARD};

  border: thick solid ${Colors2023.GRAY.MEDIUM};
  border-radius: 9px;
`;

const TeamContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  width: ${COLUMN_WIDTH}px;

  padding: 1.5em 2.5em;

  gap: 1.5em;

  background-color: ${Colors2023.GRAY.STANDARD};

  border: thick solid ${Colors2023.GRAY.MEDIUM};
  border-radius: 9px;
`;

const TeamMember = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  gap: 1em;
`;
