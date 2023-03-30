import styled from 'styled-components';
import { Colors2023 } from '@hibiscus/styles';
import { BoldText, Text } from '@hibiscus/ui';
import { useEffect, useState } from 'react';
import { EventServiceAPI, Event } from '../common/api';

export function Index() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    EventServiceAPI.getEvents()
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        }
        console.log(data);
        setEvents(data.data as Event[]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getDayString = (timeStamp: string) => {
    const date = new Date(timeStamp);
    const dayString = date.toDateString();
    const wordArary = dayString.split(' ');
    return wordArary[2];
  };

  const getMonthString = (timeStamp: string) => {
    const date = new Date(timeStamp);
    const dayString = date.toDateString();
    const wordArary = dayString.split(' ');
    return wordArary[1];
  };

  const getTimeString = (timeStamp: string) => {
    const date = new Date(timeStamp);
    const hoursMin = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return hoursMin;
  };

  const getEvents = () => {
    if (events.length) {
      return events.map((event, index) => (
        <EventContainer key={index}>
          <DateContainer>
            <BoldText style={{ fontSize: 40, color: 'white' }}>
              {getDayString(event.start)}
            </BoldText>
            <Text style={{ fontSize: 30, color: 'white' }}>
              {getMonthString(event.start)}
            </Text>
          </DateContainer>

          <DetailContainer>
            <BoldText style={{ fontSize: 35, color: 'white' }}>
              {event.name}
            </BoldText>
            <LocationContainer>
              <LocationText>{event.location}</LocationText>
              <TimeText>
                {getTimeString(event.start)} - {getTimeString(event.end)}
              </TimeText>
            </LocationContainer>
            <DescriptionText>{event.description}</DescriptionText>
          </DetailContainer>

          <PointContainer>
            <BoldText
              style={{
                fontSize: 15,
                color: 'white',
                letterSpacing: 3,
                paddingTop: 10,
                textAlign: 'right',
              }}
            >
              {event.points} PTS
            </BoldText>
          </PointContainer>
        </EventContainer>
      ));
    }
  };

  return (
    <Wrapper>
      <Container>{getEvents()}</Container>
    </Wrapper>
  );
}

export default Index;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: ${Colors2023.GRAY.STANDARD};
  border-radius: 10px;
  border: 4px solid ${Colors2023.GRAY.MEDIUM};
  height: 600px;
  overflow-y: auto;
`;

const EventContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid ${Colors2023.GRAY.MEDIUM};
  padding: 40px;
`;

const DateContainer = styled.div`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DetailContainer = styled.div`
  flex: 3;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LocationText = styled(Text)`
  padding-right: 10px;
  border-right: 1px solid ${Colors2023.GRAY.SCHEMDIUM};
  color: ${Colors2023.GRAY.SCHEMDIUM};
  font-size: small;
`;

const TimeText = styled(Text)`
  padding-left: 10px;
  color: ${Colors2023.GRAY.SCHEMDIUM};
  font-size: small;
`;

const DescriptionText = styled(Text)`
  color: ${Colors2023.GRAY.SHLIGHT};
  margin-top: 10px;
`;

const PointContainer = styled(Text)`
  flex: 1;
  height: 100%;
  flex-direction: column;
`;
