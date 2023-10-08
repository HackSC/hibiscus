import styled from 'styled-components';
import { Event } from '../../common/events.utils';
import EventCard from './event-card';

interface PinnedEventsProps {
  events: Event[];
  openModal: (eventId: string) => void;
}

export function PinnedEvents(props: PinnedEventsProps) {
  return (
    props.events && (
      <Container>
        {props.events.map((e, i) => (
          <EventCard key={i} openModal={props.openModal} event={e} />
        ))}
      </Container>
    )
  );
}

export default PinnedEvents;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  height: 65vh;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;
