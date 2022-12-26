import { useCallback, useEffect, useRef, useState } from 'react';
import { DateCallback } from 'react-calendar';
import styled from 'styled-components';
import { Calendar, CalendarProps } from '../calendar';
import OneLineText, { OneLineTextProps } from '../one-line-text/one-line-text';

/* eslint-disable-next-line */
export type DatePickerProps = OneLineTextProps & CalendarProps;

export function DatePicker(props: DatePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [chosenDate, setChosenDate] = useState(new Date());

  const handleShowCalendarOnClick = useCallback((e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      // clicked outside
      setShowCalendar(false);
    } else {
      setShowCalendar(true);
    }
  }, []);

  const handleClickDayCalendar: DateCallback = (value, e) => {
    setChosenDate(value);
    setShowCalendar(false);
  };

  // binding show options on click
  useEffect(() => {
    document.addEventListener('mousedown', handleShowCalendarOnClick);
    return () => {
      document.removeEventListener('mousedown', handleShowCalendarOnClick);
    };
  }, [handleShowCalendarOnClick, wrapperRef]);

  return (
    <Wrapper ref={wrapperRef}>
      <OneLineText {...props} value={chosenDate.toLocaleDateString('en-US')} />
      {showCalendar && (
        <Calendar onClickDay={handleClickDayCalendar} value={chosenDate} />
      )}
    </Wrapper>
  );
}

export default DatePicker;

const Wrapper = styled.div`
  width: max-content;
`;
