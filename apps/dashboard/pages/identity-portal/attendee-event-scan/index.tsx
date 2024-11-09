import { Colors2023 } from '@hibiscus/styles';
import { BoldText, Text } from '@hibiscus/ui';
import { useEffect, useRef, useState } from 'react';
import { Button, GlowSpan, OneLineText, Search } from '@hibiscus/ui-kit-2023';
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
import { formatTimestamp } from '../../../common/format-timestamp';
import { PostgrestError } from '@supabase/supabase-js';
import { HibiscusRole } from '@hibiscus/types';
import useHibiscusUser from '../../../hooks/use-hibiscus-user/use-hibiscus-user';
import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';
import { SearchUserBox } from 'apps/dashboard/components/identity-portal/search-user-box/search-user-box';

const SUCCESS_MESSAGE = 'Success';

interface Attendee {
  checkInTimeDisplay: string;
  firstName: string;
  lastName: string;
}

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

  const [attendees, setAttendees] = useState<Attendee[]>([]);

  const { supabase } = useHibiscusSupabase();

  const wristbandIdRef = useRef(null);

  async function search(id: number) {
    setEventName(await searchEventId(id, supabase));
  }

  async function searchUserQuery(name: string) {
    setSearchRes(await searchUser(name, supabase));

    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (wristbandId !== '') {
      const res = await addEvent(eventId, wristbandId, supabase);
      setWristbandId('');
      setResponse(res);
    } else if (searchQuery !== '') {
      await searchUserQuery(searchQuery);
      setSearchQuery('');
    }
  }

  async function fetchDataInit() {
    const res = await supabase
      .getClient()
      .from('event_log')
      .select()
      .eq('event_id', eventId)
      .order('check_in_time', { ascending: false })
      .limit(20);

    if (res.error) {
      return setResponse(res.error);
    }

    const logs = res.data;

    if (logs.length > 0) {
      // Get participant names
      const filter = logs.map((log) => `user_id.eq.${log.user_id}`).join(',');
      const { data: nameData, error } = await supabase
        .getClient()
        .from('user_profiles')
        .select()
        .or(filter);

      if (error !== null) {
        return setResponse(error);
      }

      const newAttendees: Attendee[] = logs.map((log) => {
        const { first_name, last_name } = nameData.find(
          (user) => user.user_id == log.user_id
        );
        return {
          checkInTimeDisplay: formatTimestamp(log.check_in_time),
          firstName: first_name,
          lastName: last_name,
        };
      });
      setAttendees(newAttendees);
    }
  }

  /**
   * Adds a new attendee to the attendees list
   *
   * @param userId userID of attendee
   * @param timestamp when the attendee was checked in
   */
  async function updateData(userId: string, timestamp: string) {
    const {
      data: { first_name, last_name },
      error,
    } = await supabase
      .getClient()
      .from('user_profiles')
      .select()
      .eq('user_id', userId)
      .single();

    if (error !== null) {
      return setResponse(error);
    }

    const newAttendee: Attendee = {
      checkInTimeDisplay: formatTimestamp(timestamp),
      firstName: first_name,
      lastName: last_name,
    };

    setAttendees((prevAttendees) =>
      [newAttendee, ...prevAttendees].slice(0, 20)
    );
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
      setTimeout(() => setIsAlertVisible(false), 1000);
    }
  }, [response]);

  useEffect(() => {
    if (eventId != null) {
      fetchDataInit();
    }
  }, [eventId]);

  useEffect(() => {
    if (eventId != null) {
      // Listen to new check-ins for specific event
      const channel = supabase
        .getClient()
        .channel('db-changes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'event_log',
            filter: `event_id=eq.${eventId}`,
          },
          (payload) =>
            updateData(payload.new.user_id, payload.new.check_in_time)
        )
        .subscribe();

      // Unsubscribe when component unmounts
      return () => {
        supabase.getClient().removeChannel(channel);
      };
    }
  }, [eventId]);

  const { user: authUser } = useHibiscusUser();
  if (authUser == null) {
    return <>Loading</>;
  }
  // Limit access to only volunteer role
  if (
    authUser?.role !== HibiscusRole.VOLUNTEER &&
    authUser?.role !== HibiscusRole.SPONSOR
  ) {
    router.push('/');
    return <></>;
  }

  if (eventId == null) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        No parameters provided!
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col p-[40px]">
        <p className="mb-[64px]">Scan attendee in for {eventName}</p>

        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="flex flex-col gap-[10px]">
              <h2 className="m-0 text-xl text-theme-redward">Search by Name</h2>
              <SearchUserBox
                onClick={async (id) => {
                  {
                    const res = await addEventUserId(eventId, id, supabase);
                    setResponse(res);
                  }
                }}
                placeholder="Search by attendee name"
              />
            </div>

            <p className="my-[30px]">or</p>

            <div className="flex flex-col gap-[10px]">
              <h2 className="m-0 text-xl text-theme-redward">Scan Wristband</h2>
              <Search
                placeholder="ID number"
                onInput={async (id) => {
                  wristbandIdRef.current.value = '';
                  const res = await addEvent(eventId, id, supabase);
                  setResponse(res);
                }}
                externalRef={(element) => {
                  wristbandIdRef.current = element;
                }}
              />
            </div>
          </div>

          <ScrollableListBox width={510}>
            {attendees.map((attendee, i) => (
              <ScrollableListBox.Item key={i}>
                <BoldText style={{ fontSize: '1em' }}>
                  {attendee.firstName} {attendee.lastName}
                </BoldText>
                <Text style={{ fontSize: '0.75em' }}>
                  {attendee.checkInTimeDisplay}
                </Text>
              </ScrollableListBox.Item>
            ))}
          </ScrollableListBox>
        </div>
      </div>

      <div style={{ position: 'absolute', right: '100px', top: '100px' }}>
        <div>
          <SuccessText
            className={isAlertVisible ? 'shown' : 'hidden'}
            error={alertMessage !== SUCCESS_MESSAGE}
          >
            {alertMessage}
          </SuccessText>
        </div>
      </div>
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
    ${(props) => (props.error ? Colors2023.RED.LIGHT : Colors2023.YELLOW.LIGHT)};
  background-color: ${(props) =>
    props.error ? Colors2023.RED.LIGHT : Colors2023.YELLOW.LIGHT};

  &.shown {
    opacity: 1;
  }

  &.hidden {
    transition: opacity 1s linear 1s;
    opacity: 0;
  }
`;
