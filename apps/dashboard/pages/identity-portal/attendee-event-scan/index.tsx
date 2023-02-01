import { Colors2023 } from '@hibiscus/styles';
import { BoldText, Text } from '@hibiscus/ui';
import { useEffect, useState } from 'react';
import { Button, GlowSpan, OneLineText } from '@hibiscus/ui-kit-2023';
import addEvent from '../../../common/add-event';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { BiWifi2 } from 'react-icons/bi';
import React from 'react';
import { BackButton } from '../../../components/identity-portal/back-button/back-button';
import { SearchUserEventBox } from '../../../components/identity-portal/search-user-event-box/search-user-event-box';
import addEventUserId from '../../../common/add-event-user-id';
import searchEventId from '../../../common/search-event-id';
import searchUser from '../../../common/search-user';
import { ScrollableListBox } from '../../../components/identity-portal/scrollable-list-box/scrollable-list-box';
import { container } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { formatTimestamp } from 'apps/dashboard/common/format-timestamp';
import { PostgrestError } from '@supabase/supabase-js';

const SUCCESS_MESSAGE = 'Success';

export function Index() {
  const [eventId, setEventId] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  const [searchRes, setSearchRes] = useState(
    [] as Awaited<ReturnType<typeof searchUser>>
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [wristbandId, setWristbandId] = useState('');

  const [response, setResponse] = useState<PostgrestError | boolean | null>(
    null
  );

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState(SUCCESS_MESSAGE);

  const [eventName, setEventName] = useState(
    [] as unknown as Awaited<ReturnType<typeof searchEventId>>
  );

  const [attendees, setAttendees] = useState([]);

  const supabase = container.resolve(HibiscusSupabaseClient).getClient();

  async function search(id: number) {
    setEventName(await searchEventId(id));
  }

  async function searchUserQuery(name: string) {
    setSearchRes(await searchUser(name));

    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (wristbandId !== '') {
      const res = await addEvent(eventId, wristbandId);
      setWristbandId('');
      setResponse(res);
    } else if (searchQuery !== '') {
      await searchUserQuery(searchQuery);
      setSearchQuery('');
    }
  }

  useEffect(() => {
    const id = router.query['id']?.toString();
    if (id != null) {
      setEventId(Number(id));
      search(Number(id));
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (response) {
      if (response === true) {
        setAlertMessage(SUCCESS_MESSAGE);
      } else {
        setAlertMessage(response.message);
      }
      setIsAlertVisible(true);
      setResponse(null);
      setTimeout(() => setIsAlertVisible(false), 50);
    } else {
      // setIsAlertVisible(false);
    }
  }, [response]);

  useEffect(() => {
    async function fetchData() {
      const res = await supabase
        .from('event_log')
        .select()
        .eq('event_id', eventId)
        .order('check_in_time', { ascending: false })
        .limit(20);

      const logs = res.data;
      const mappedLogs = await Promise.all(
        logs.map(async (log) => {
          const {
            data: [{ first_name, last_name }],
          } = await supabase
            .from('user_profiles')
            .select()
            .eq('user_id', log.user_id);

          return {
            ...log,
            check_in_time: formatTimestamp(log.check_in_time),
            first_name,
            last_name,
          };
        })
      );
      setAttendees(mappedLogs);
    }

    if (eventId != null) {
      fetchData();

      const events = supabase
        .channel('identity-channel')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'event_log',
            filter: `event_id=eq.${eventId}`,
          },
          (payload) => {
            console.log('Change received!', payload);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(events);
      };
    }
  }, [eventId]);

  if (eventId == null) {
    return <></>;
  }

  return (
    <>
      <div style={{ position: 'absolute', left: '100px' }}>
        <BackButton link="/" />
      </div>

      <div style={{ position: 'absolute', right: '100px' }}>
        <GlowSpan color={Colors2023.GRAY.DARK} style={{ fontSize: '.68em' }}>
          <div>
            <SuccessText
              className={isAlertVisible ? 'shown' : 'hidden'}
              error={alertMessage !== SUCCESS_MESSAGE}
            >
              {alertMessage}
            </SuccessText>
          </div>
        </GlowSpan>
      </div>

      <Container>
        <GlowSpan
          color={Colors2023.YELLOW.STANDARD}
          style={{ fontSize: '3em' }}
        >
          {eventName} Check-in
        </GlowSpan>

        <ContainerInner>
          <ColumnSpaced onSubmit={handleSubmit}>
            <div>
              <LabelText>Search by Name</LabelText>
              <SearchUserEventBox
                onClick={(value) =>
                  addEventUserId(eventId, value).then(setResponse)
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                searchRes={searchRes}
                isModalOpen={isModalOpen}
                setModalOpen={setModalOpen}
              />
            </div>

            <Text>or</Text>

            <div>
              <FlexRowTight>
                <LabelText>Scan Wristband</LabelText>
                <BiWifi2 size={36} style={{ transform: 'rotate(90deg)' }} />
              </FlexRowTight>
              <OneLineText
                autoFocus
                placeholder="ID number"
                value={wristbandId}
                onChange={(e) => setWristbandId(e.target.value)}
              />
            </div>

            <Button color="yellow">SUBMIT</Button>
          </ColumnSpaced>

          <ScrollableListBox width={510}>
            {attendees.map((attendee, i) => (
              <ScrollableListBox.Item key={i}>
                <BoldText style={{ fontSize: '1em' }}>
                  {attendee.first_name} {attendee.last_name}
                </BoldText>
                <Text style={{ fontSize: '0.75em' }}>
                  {attendee.check_in_time}
                </Text>
              </ScrollableListBox.Item>
            ))}
          </ScrollableListBox>
        </ContainerInner>
      </Container>
    </>
  );
}

export default Index;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5em;

  height: 100%;
`;

const ContainerInner = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 3em;

  width: 100%;
`;

const ColumnSpaced = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5em;

  min-height: 100%;
`;

const FlexRowTight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LabelText = styled(Text)`
  color: ${Colors2023.YELLOW.LIGHT};
  font-size: 1.5em;
`;

const SuccessText = styled(Text)<{ error: boolean }>`
  font-size: 1.5em;
  padding-left: 0.4em;
  padding-right: 0.4em;
  padding-top: 0.3em;
  padding-bottom: 0.3em;
  border-radius: 0.5em;
  border: 0.4em solid
    ${(props) =>
      props.error ? Colors2023.RED.STANDARD : Colors2023.YELLOW.STANDARD};
  background-color: ${(props) =>
    props.error ? Colors2023.RED.STANDARD : Colors2023.YELLOW.STANDARD};

  &.shown {
    opacity: 1;
  }

  &.hidden {
    transition: opacity 1s linear 1s;
    opacity: 0;
  }
`;
