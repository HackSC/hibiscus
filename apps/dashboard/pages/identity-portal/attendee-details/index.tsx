import { Colors2023 } from '@hibiscus/styles';
import { BoldText, ItalicText, Text } from '@hibiscus/ui';
import { Button, GlowSpan } from '@hibiscus/ui-kit-2023';
import { useContext, useEffect, useState } from 'react';
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
import { calculateBattlepassProgress } from '../../../common/calculate-battlepass-progress';
import { SupabaseContext } from '@hibiscus/hibiscus-supabase-client';

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
  const { supabase } = useContext(SupabaseContext);

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
      <Container>
        <ColumnSpacedLeft>
          <BackButton link="/identity-portal/attendee-details-scan" />

          <ColumnSpacedCenter>
            <UserCardContainer>
              <GlowSpan
                color={Colors2023.YELLOW.LIGHT}
                style={{ fontSize: '2em' }}
              >
                {user.first_name} {user.last_name}
              </GlowSpan>
              <div>
                <ItalicText>{user.school ?? 'No school provided'}</ItalicText>
                <ItalicText>
                  {user.graduation_year ?? 'No graduation date provided'}
                </ItalicText>
                <ItalicText>{user.major ?? 'No major provided'}</ItalicText>
              </div>
              <div>
                <Text>{user.email}</Text>
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <GlowSpan
                  style={{ letterSpacing: '0.2em', fontWeight: 'bold' }}
                >
                  CHECKED IN?
                </GlowSpan>
                {user.wristband_id != null ? (
                  <BiCheckCircle color={Colors2023.GREEN.DARK} size="1.5em" />
                ) : (
                  <ImCross color={Colors2023.RED.DARK} size="1em" />
                )}
              </div>
            </UserCardContainer>

            <Button color="yellow" onClick={() => setModalOpen(true)}>
              {user.wristband_id != null ? 'RE' : ''}ASSIGN BAND
            </Button>
          </ColumnSpacedCenter>
        </ColumnSpacedLeft>

        <ColumnSpacedLeft>
          <div>
            <Text>{user.first_name}&apos;s Points</Text>
            <ProgressBarOuter>
              <ProgressBarInner progress={battlepassProgress.progress} />
            </ProgressBarOuter>
            {user.event_points != null ? (
              <SpacedRow>
                <GlowSpan
                  color={Colors2023.YELLOW.STANDARD}
                  style={{ letterSpacing: '0.2em', fontWeight: 'bold' }}
                >
                  {user.event_points + user.bonus_points} PTS
                </GlowSpan>
                {battlepassProgress.nextLevel ? (
                  <div style={{ display: 'flex', gap: '0.3em' }}>
                    <span
                      style={{
                        color: Colors2023.GRAY.SHLIGHT,
                        fontSize: '0.9em',
                      }}
                    >
                      Next prize @
                    </span>
                    <GlowSpan
                      color={Colors2023.YELLOW.STANDARD}
                      style={{ letterSpacing: '0.2em', fontWeight: 'bold' }}
                    >
                      {battlepassProgress.nextLevel} PTS
                    </GlowSpan>
                  </div>
                ) : (
                  <div>Max level</div>
                )}
              </SpacedRow>
            ) : (
              <Text>ERROR: User has no leaderboard entry</Text>
            )}
          </div>

          <div>
            <Text>Most recent swipes</Text>
            <ScrollableListBox width={`${COLUMN_WIDTH}px`} height="200px">
              {user.checkIns.map((event) => (
                <ScrollableListBox.Item key={event.log_id}>
                  <BoldText style={{ fontSize: '1em' }}>
                    {event.events.name}
                  </BoldText>
                  <Text style={{ fontSize: '0.75em' }}>
                    {event.events.location} on{' '}
                    {formatTimestamp(event.check_in_time)}
                  </Text>
                </ScrollableListBox.Item>
              ))}
            </ScrollableListBox>
          </div>

          <div>
            <Text>{user.first_name}&apos;s Team</Text>
            {user.team == null ? (
              <TeamContainerEmpty>
                {user.first_name} is not in a team!
              </TeamContainerEmpty>
            ) : user.team.length == 0 ? (
              <TeamContainerEmpty>
                No other team members to display
              </TeamContainerEmpty>
            ) : user.team.length > 3 ? (
              <TeamContainerEmpty>
                ERROR: Team has more than 3 members!
              </TeamContainerEmpty>
            ) : (
              <TeamContainer>
                {user.team.map((member, i) => (
                  <TeamMember key={member.user_id}>
                    <Image
                      src={TEAM_MEMBER_ICONS[i]}
                      width={100}
                      height={100}
                      alt=""
                    />
                    <Text>
                      {member.first_name} {member.last_name}
                    </Text>
                  </TeamMember>
                ))}
              </TeamContainer>
            )}
          </div>
        </ColumnSpacedLeft>
      </Container>

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
