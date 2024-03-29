import { ChevronRightIcon } from '@hibiscus/icons';
import { useState } from 'react';
import {
  Calendar as ReactCalendar,
  CalendarProps as ReactCalendarProps,
} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import { GlowSpan } from '../glow-span/glow-span';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CalendarProps extends ReactCalendarProps {
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
        {...props}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;

  .react-calendar {
    font-family: 'Inter', sans-serif;
    background-color: #363636;
    color: white;
    border-radius: 10px;
    padding: 1rem;
    border: 3px solid #666666;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    line-height: 1.125em;
  }
  .react-calendar--doubleView {
    width: 700px;
  }
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
  }
  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
    font-family: 'Inter';
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    color: white;
    font-size: 20px;
  }
  .react-calendar__navigation button:disabled {
    background-color: #363636;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #565656;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    font-weight: bold;
  }
  .react-calendar__month-view__days__day {
    color: white;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__year-view__months__month,
  .react-calendar__decade-view__months__month,
  .react-calendar__century-view__months__month {
    color: white;
  }
  .react-calendar__tile {
    max-width: 100%;
    padding: 10px;
    background: none;
    text-align: center;
    border-radius: 5px;
    font-family: 'Inter';
  }
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
    color: #3d3d3d;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #777777;
    font-weight: bold;
    border: 2px solid #76d3ef;
  }
  .react-calendar__tile--hasActive {
    border: 2px solid #76d3ef;
    background: #565656;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #707070;
  }
  .react-calendar__tile--active {
    background-color: #565656;
    border: 2px solid #76d3ef;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #707070;
    border: 2px solid #76d3ef;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #691b1b;
  }
`;

const NavBackContainer = styled.div`
  transform: rotate(-180deg);
  margin-bottom: 5px; // somehow without this it's a bit under
`;
