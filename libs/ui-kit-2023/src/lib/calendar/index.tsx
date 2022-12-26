import { ChevronRightIcon } from '@hibiscus/icons';
import { useState } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import { GlowSpan } from '@hacksc-platforms/ui-kit-2023';
import './calendar.less';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CalendarProps {
  navigationColor?: string;
  navigationShadowColor?: string;
}

export function Calendar(props: CalendarProps) {
  const [date, setDate] = useState(new Date());

  return (
    <Wrapper>
      <ReactCalendar
        onChange={setDate}
        value={date}
        minDetail="year"
        formatShortWeekday={(locale, date) => date.toString()[0]}
        navigationLabel={({ label }) => (
          <GlowSpan
            color={props.navigationColor}
            shadowColor={props.navigationShadowColor}
          >
            {label}
          </GlowSpan>
        )}
        nextLabel={
          <ChevronRightIcon
            alt="Look at dates in next month"
            width={20}
            height={20}
          />
        }
        prevLabel={
          <NavBackContainer>
            <ChevronRightIcon
              alt="Look at dates in previous month"
              width={20}
              height={20}
            />
          </NavBackContainer>
        }
        next2Label={null}
        prev2Label={null}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
`;

const NavBackContainer = styled.div`
  transform: rotate(-180deg);
  margin-bottom: 5px; // somehow without this it's a bit under
`;
