import { Event } from '../../common/events.utils';
import EventCard from './event-card';

interface PinnedEventsProps {
  events: Event[];
  openModal: (eventId: number) => void;
}

export function PinnedEvents(props: PinnedEventsProps) {
  return (
    <>
      {props.events.map((e, i) => (
        <EventCard key={i} openModal={props.openModal} {...e} />
      ))}
    </>
  );
}

export default PinnedEvents;
