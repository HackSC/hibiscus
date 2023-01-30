import { Colors2023 } from '@hibiscus/styles';
import { Text } from '@hibiscus/ui';
import { useEffect, useState } from 'react';
import { Button, GlowSpan, Search } from '@hibiscus/ui-kit-2023';
import addEvent from '../../../common/add-event';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { BiWifi2 } from 'react-icons/bi';
import React from 'react';
import { BackButton } from '../../../components/identity-portal/back-button/back-button';
import { SearchUserEventBox } from '../../../components/identity-portal/search-user-event-box/search-user-event-box';
import addEventUserId from '../../../common/add-event-user-id';
import searchEventId from '../../../common/search-event-id';

export function Index() {
  const [eventId, setEventId] = useState<number | null>(null);

  const router = useRouter();

  const [response, setResponse] = useState<boolean | null>(null);

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const [eventName, setEventName] = useState(
    [] as unknown as Awaited<ReturnType<typeof searchEventId>>
  );

  async function search(id: number) {
    setEventName(await searchEventId(id));
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
      setIsAlertVisible(true);
      setResponse(null);
      setTimeout(() => setIsAlertVisible(false), 50);
    } else {
      // setIsAlertVisible(false);
    }
  }, [response]);

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
            <SuccessText className={isAlertVisible ? 'shown' : 'hidden'}>
              Success!
            </SuccessText>
          </div>
        </GlowSpan>
      </div>

      <ColumnSpacedCenter>
        <GlowSpan
          color={Colors2023.YELLOW.STANDARD}
          style={{ fontSize: '3em' }}
        >
          {eventName} Check-in
        </GlowSpan>

        <FlexRow>
          <div>
            <LabelText>Search by Name</LabelText>
            <SearchUserEventBox
              onClick={(value) =>
                addEventUserId(eventId, value).then(setResponse)
              }
            />
          </div>

          <Text>or</Text>

          <div>
            <FlexRowTight>
              <LabelText>Scan Wristband</LabelText>
              <BiWifi2 size={36} style={{ transform: 'rotate(90deg)' }} />
            </FlexRowTight>
            <Search
              placeholder="ID number"
              onInput={(id) => addEvent(eventId, id).then(setResponse)}
            />
          </div>
        </FlexRow>

        <Button color="yellow">SUBMIT</Button>
      </ColumnSpacedCenter>
    </>
  );
}

export default Index;

const ColumnSpacedCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5em;

  min-height: 100%;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5em;
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

const SuccessText = styled(Text)`
  font-size: 1.5em;
  padding-left: 0.4em;
  padding-right: 0.4em;
  padding-top: 0.3em;
  padding-bottom: 0.3em;
  border-radius: 0.5em;
  border: 0.4em solid ${Colors2023.YELLOW.STANDARD};
  background-color: ${Colors2023.YELLOW.STANDARD};

  &.shown {
    opacity: 1;
  }

  &.hidden {
    transition: opacity 1s linear 1s;
    opacity: 0;
  }
`;
