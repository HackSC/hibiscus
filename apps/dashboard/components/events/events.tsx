/* eslint-disable react/jsx-key */
import { Colors2023 } from '@hibiscus/styles';
import { H3, Label, Text, H4 } from '@hibiscus/ui';
import { EventsAPI } from '../../common/api/events.api';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { container } from 'tsyringe';
import { HackSCEvent } from './types';

/* eslint-disable-next-line */
export interface EventsProps {}

const events = [
  [
    {
      name: 'Opening Ceremony',
      startTime: '7:30',
      endTime: '9:00 PM',
      venue: 'Bovard Auditorium',
      bpPoints: '100',
    },
    {
      name: 'Team Matching & Game Night',
      startTime: '9:00',
      endTime: '11:00 PM',
      venue: 'Ballroom',
      bpPoints: '100',
    },
    {
      name: 'Workshop: Intro to Svelte',
      startTime: '11:00 PM',
      endTime: '12:00 AM',
      venue: 'Rosen Family Screening Room',
      bpPoints: '125',
    },
    {
      name: 'Workshop: Backend with Express.js',
      startTime: '12:00',
      endTime: '1:00 AM',
      venue: 'Rosen Family Screening Room',
      bpPoints: '125',
    },
  ],
  [
    {
      name: 'Workshop: Beginner Front-end',
      startTime: '9:00',
      endTime: '10:00 AM',
      venue: 'Rosen Family Screening Room',
      bpPoints: '125',
    },
    {
      name: 'BTS of HackSC Engineering',
      startTime: '10:00',
      endTime: '11:00 AM',
      venue: 'Rosen Family Screening Room',
      bpPoints: '125',
    },
    {
      name: 'Workshop: Elastic',
      startTime: '11:00',
      endTime: '11:30 AM',
      venue: 'Rosen Family Screening Room',
      bpPoints: '100',
    },
    {
      name: 'Lunch & Chat with Mark Hull',
      startTime: '12:00',
      endTime: '1:00 PM',
      venue: 'TCC 232',
      bpPoints: '125',
    },
    {
      name: 'Speakers: Verticals Panel',
      startTime: '2:00',
      endTime: '3:00 PM',
      venue: "Tommy's Place",
      bpPoints: '200',
    },
    {
      name: 'Puppy Pen',
      startTime: '3:00',
      endTime: '4:00 PM',
      venue: 'ALumni Park',
      bpPoints: '100',
    },
    {
      name: 'Workshop: Stickers!',
      startTime: '3:30',
      endTime: '4:30 PM',
      venue: 'Ballroom',
      bpPoints: '100',
    },
    {
      name: 'Scavenger Hunt',
      startTime: '5:00',
      endTime: '6:00 PM',
      venue: 'TCC Plaza',
      bpPoints: '150',
    },
    {
      name: 'Movie Night',
      startTime: '8:00',
      endTime: '10:30 PM',
      venue: 'Rosen Family Screening Room',
      bpPoints: '100',
    },
  ],
  [
    {
      name: 'Closing Ceremony',
      startTime: '12:00',
      endTime: '1:00 PM',
      venue: "Tommy's Place",
      bpPoints: '0',
    },
  ],
];

const eventApi = container.resolve(EventsAPI);

const getAMPMTime = (date: Date) => {
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

export function Events(props: EventsProps) {
  const [events, setEvents] = useState<{
    data: HackSCEvent[];
    loading: boolean;
  }>({ data: [], loading: true });

  useEffect(() => {
    (async () => {
      const { data, error } = await eventApi.getAllEvents(1);
      setEvents({
        data: data.map((item) => ({
          id: item.id,
          name: item.name,
          description: null,
          start: new Date(item.start),
          end: new Date(item.end),
          points: item.points,
          location: item.location,
        })),
        loading: false,
      });
    })();
  }, []);

  if (events.loading) return <>Loading</>;

  return (
    <StyledEvents>
      <EventsContainer>
        {events.data.map((item, index) => {
          return (
            <>
              <EventContainer>
                <DateDiv>
                  0{item.start.getDate()}
                  <br />
                  Feb
                </DateDiv>

                <Information>
                  <Title>{item.name}</Title>
                  <GrayText>
                    {item.location} | {getAMPMTime(item.start)} -{' '}
                    {getAMPMTime(item.end)}
                  </GrayText>
                </Information>
                <Points>{item.points} PTS</Points>
              </EventContainer>
            </>
          );
        })}
      </EventsContainer>
    </StyledEvents>
  );
}

export default Events;

const EventsContainer = styled.div`
  width: 52vw;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: ${Colors2023.GRAY.STANDARD};
  @media screen and (max-width: 820px) {
    width: 70vw;
  }
  @media screen and (max-width: 450px) {
    width: 90vw;
  }
  border: 4px solid ${Colors2023.GRAY.MEDIUM};
  border-radius: 10px;
  max-height: 40vh;
  overflow-y: auto;
`;

const StyledEvents = styled.div``;
const EventContainer = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  height: 100px;
  justify-content: space-between;
  border-bottom: 1px solid ${Colors2023.GRAY.MEDIUM};
`;
const DateDiv = styled(H3)`
  padding: 0px 1rem;
  @media screen and (max-width: 900px) {
    padding: 0px 0.5rem;
  }
  @media screen and (max-width: 450px) {
    padding: 0px 0.25rem;
  }
`;
const Information = styled.div`
  align-items: flex-start;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  min-width: 30vw;
`;
const Points = styled(Label)`
  letter-spacing: 3px;
  min-width: 80px;
  text-align: right;
  padding: 0px 10px;
`;
const Title = styled(H3)``;
const GrayText = styled(Text)`
  font-size: 12px;
  color: ${Colors2023.GRAY.SCHEMDIUM};
  text-align: center;
`;
