import { Colors2023 } from '@hibiscus/styles';
import { FaArrowLeft } from 'react-icons/fa';
import { Text, BoldText } from '@hibiscus/ui';
import { DatePicker, OneLineText, ParagraphText } from '@hibiscus/ui-kit-2023';
import styled from 'styled-components';
import {
  Event,
  getPinnedEvents,
  pinEvent,
  unpinEvent,
  updateEvent,
} from '../../common/events.utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { getCookie } from 'cookies-next';
import { getEnv } from '@hibiscus/env';
import { Button, Colors } from '@hacksc/sctw-ui-kit';

interface EventDetailsProps {
  event: Event;
  userId: string;
  pinnedEvents: Event[];
  setError: Dispatch<SetStateAction<string>>;
  setPinnedEvents: (events: Event[]) => void;
  refresh: () => void;
  admin: boolean;
}

function EventDetails(props: EventDetailsProps) {
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  if (!editingEvent) {
    // Normal mode (not in edit mode)
    return (
      <Container>
        {/* <div style={{display:"flex"}}>
          <ArrowIcon style={{marginTop: "3px"}} />
          <Text style={{marginLeft: "4px"}}>Back to All Events</Text>
        </div> */}
        <BoldText style={{ fontSize: '1.5rem' }}>
          {props.event.eventName}
        </BoldText>
        <Text style={{ fontSize: '0.75rem' }}>{props.event.bpPoints} PTS</Text>
        <Text>
          {props.event.startTime.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
          })}{' '}
          |{' '}
          {props.event.startTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          -{' '}
          {props.event.endTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
        <Text>{props.event.location}</Text>
        <Text>{props.event.description}</Text>
        {/* <Row>
          {props.event.eventTags?.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
          {props.event.industryTags?.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </Row> */}

        <Row>
          {props.admin && (
            <Button
              color="blue"
              onClick={editHandler(props.event, setEditingEvent)}
            >
              Edit
            </Button>
          )}

          {props.pinnedEvents.find((e) => e.eventId === props.event.eventId) ===
          undefined ? (
            // Event is not pinned
            <Button
              color="red"
              style={{
                marginLeft: 'auto',
                color: 'white',
                border: `3px solid white`,
              }}
              onClick={pinEventHandler(
                props.userId,
                props.event.eventId,
                props.setError,
                props.setPinnedEvents
              )}
            >
              + Add To My Events
            </Button>
          ) : (
            // Event is pinned
            <Button
              color="red"
              style={{
                marginLeft: 'auto',
                color: 'white',
                border: `3px solid white`,
              }}
              onClick={unpinEventHandler(
                props.userId,
                props.event.eventId,
                props.setError,
                props.setPinnedEvents
              )}
            >
              - Remove From My Events
            </Button>
          )}
        </Row>
      </Container>
    );
  } else {
    // In edit mode
    return (
      <Container>
        <OneLineText
          value={editingEvent.eventName}
          onChange={(e) =>
            setEditingEvent({ ...editingEvent, eventName: e.target.value })
          }
        />
        <Row>
          <DatePicker
            valueOneLineText={editingEvent.startTime.toLocaleDateString(
              'en-us'
            )}
            onClickDay={(d) => {
              const startTime = new Date(editingEvent.startTime);
              startTime.setFullYear(d.getFullYear());
              startTime.setMonth(d.getMonth());
              startTime.setDate(d.getDate());
              setEditingEvent({ ...editingEvent, startTime });
            }}
          />
          <OneLineText
            size={3}
            style={{ minWidth: 0 }}
            value={editingEvent.startTime.getHours()}
            onChange={(e) => {
              const time =
                e.target.value === '' ? 0 : Number.parseInt(e.target.value);
              const startTime = new Date(editingEvent.startTime);
              startTime.setHours(time);
              setEditingEvent({ ...editingEvent, startTime });
            }}
          />
          <OneLineText
            size={3}
            style={{ minWidth: 0 }}
            value={editingEvent.startTime.getMinutes()}
            onChange={(e) => {
              const time =
                e.target.value === '' ? 0 : Number.parseInt(e.target.value);
              const startTime = new Date(editingEvent.startTime);
              startTime.setMinutes(time);
              setEditingEvent({ ...editingEvent, startTime });
            }}
          />
        </Row>
        <Row>
          <DatePicker
            valueOneLineText={editingEvent.endTime.toLocaleDateString('en-us')}
            onClickDay={(d) => {
              const endTime = new Date(editingEvent.endTime);
              endTime.setFullYear(d.getFullYear());
              endTime.setMonth(d.getMonth());
              endTime.setDate(d.getDate());
              setEditingEvent({ ...editingEvent, endTime });
            }}
          />
          <OneLineText
            size={3}
            style={{ minWidth: 0 }}
            value={editingEvent.endTime.getHours()}
            onChange={(e) => {
              const time =
                e.target.value === '' ? 0 : Number.parseInt(e.target.value);
              const endTime = new Date(editingEvent.endTime);
              endTime.setHours(time);
              setEditingEvent({ ...editingEvent, endTime });
            }}
          />
          <OneLineText
            size={3}
            style={{ minWidth: 0 }}
            value={editingEvent.endTime.getMinutes()}
            onChange={(e) => {
              const time =
                e.target.value === '' ? 0 : Number.parseInt(e.target.value);
              const endTime = new Date(editingEvent.endTime);
              endTime.setMinutes(time);
              setEditingEvent({ ...editingEvent, endTime });
            }}
          />
        </Row>
        <OneLineText
          value={editingEvent.location}
          onChange={(e) =>
            setEditingEvent({ ...editingEvent, location: e.target.value })
          }
        />
        <ParagraphText
          value={editingEvent.description}
          onChange={(e) =>
            setEditingEvent({ ...editingEvent, description: e.target.value })
          }
        />

        <OneLineText
          value={editingEvent.eventTags?.join(',')}
          onChange={(e) =>
            setEditingEvent({
              ...editingEvent,
              eventTags: e.target.value !== '' ? e.target.value.split(',') : [],
            })
          }
        />
        <OneLineText
          value={editingEvent.industryTags?.join(',')}
          onChange={(e) =>
            setEditingEvent({
              ...editingEvent,
              industryTags:
                e.target.value !== '' ? e.target.value.split(',') : [],
            })
          }
        />

        <Button
          color="blue"
          onClick={saveHandler(
            editingEvent,
            props.setError,
            setEditingEvent,
            props.refresh
          )}
        >
          Save
        </Button>
      </Container>
    );
  }
}

export default EventDetails;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #ff514f;
  border: 3px solid #ff514f;
  border-radius: 10px;

  padding: 2rem;
  gap: 1rem;

  width: 600px;
  max-width: 90vw;
`;

const ArrowIcon = styled(FaArrowLeft)``;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.div`
  padding: 0.2rem 0.5rem;
  background-color: #336675;
  border-radius: 5px;
`;

const pinEventHandler =
  (
    userId: string,
    eventId: string,
    setError: Dispatch<SetStateAction<string>>,
    setPinnedEvents: Dispatch<SetStateAction<Event[]>>
  ) =>
  async () => {
    try {
      await pinEvent(
        userId,
        eventId,
        getCookie(getEnv().Hibiscus.Cookies.accessTokenName)?.toString()
      );
      const pinned = await getPinnedEvents(
        userId,
        getCookie(getEnv().Hibiscus.Cookies.accessTokenName)?.toString()
      );
      setPinnedEvents(pinned);
    } catch (e) {
      setError(e.message);
    }
  };

const unpinEventHandler =
  (
    userId: string,
    eventId: string,
    setError: Dispatch<SetStateAction<string>>,
    setPinnedEvents: Dispatch<SetStateAction<Event[]>>
  ) =>
  async () => {
    try {
      await unpinEvent(
        userId,
        eventId,
        getCookie(getEnv().Hibiscus.Cookies.accessTokenName)?.toString()
      );
      const pinned = await getPinnedEvents(
        userId,
        getCookie(getEnv().Hibiscus.Cookies.accessTokenName)?.toString()
      );
      setPinnedEvents(pinned);
    } catch (e) {
      setError(e.message);
    }
  };

const editHandler =
  (event: Event, setEditingEvent: Dispatch<SetStateAction<Event | null>>) =>
  () => {
    setEditingEvent(event);
  };

const saveHandler =
  (
    event: Event,
    setError: Dispatch<SetStateAction<string>>,
    setEditingEvent: Dispatch<SetStateAction<Event | null>>,
    refresh: () => void
  ) =>
  async () => {
    try {
      await updateEvent(
        event.eventId,
        event,
        getCookie(getEnv().Hibiscus.Cookies.accessTokenName)?.toString()
      );
      setEditingEvent(null);
      refresh();
    } catch (e) {
      setError(e.message);
    }
  };
