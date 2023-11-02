import styled from 'styled-components';
import { Event } from '../../common/events.utils';
import EventCard from './event-card';

interface PinnedEventsProps {
  isMobile: boolean;
  events: Event[];
  openModal: (eventId: string) => void;
}

export function PinnedEvents(props: PinnedEventsProps) {
  if (props.isMobile) {
    return (
      props.events && (
        <MobileContainer>
          {props.events.map((e, i) => (
            <EventCard
              isMobile={true}
              key={i}
              openModal={props.openModal}
              event={e}
            />
          ))}
        </MobileContainer>
      )
    );
  }
  return (
    props.events && (
      <Container>
        {props.events.map((e, i) => (
          <EventCard
            isMobile={false}
            key={i}
            openModal={props.openModal}
            event={e}
          />
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

  height: 38.6vh;
  max-width: 31vw;
  overflow-y: auto;
  scrollbar-width: 4px;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 6px;
    height: 350px;
    background-color: #ffacab;
    margin-right: 20px;
    // border: 8px solid #FFACAB;
    right: -10px;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background: #ff514f;
    right: 20px; /* Adjust the right position of the thumb */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #ff514f;
  }

  &::-webkit-scrollbar-track {
    border-radius: 20px;
    background: #ffacab;
    left: 20px; /* Adjust the left position of the track */
  }
`;

const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  height: 50vh;
  max-width: 92vw;
  overflow-y: auto;
  scrollbar-width: 4px;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 6px;
    height: 350px;
    background-color: #ffacab;
    margin-right: 20px;
    // border: 8px solid #FFACAB;
    right: -10px;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background: #ff514f;
    right: 20px; /* Adjust the right position of the thumb */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #ff514f;
  }

  &::-webkit-scrollbar-track {
    border-radius: 20px;
    background: #ffacab;
    left: 20px; /* Adjust the left position of the track */
  }
`;
