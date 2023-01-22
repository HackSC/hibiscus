import { useCallback, useEffect, useRef, useState } from 'react';
import { DateCallback } from 'react-calendar';
import styled from 'styled-components';
import { Calendar, CalendarProps } from '../calendar/calendar';
import OneLineText, { OneLineTextProps } from '../one-line-text/one-line-text';

/* eslint-disable-next-line */
export type DatePickerProps = OneLineTextProps &
  CalendarProps & {
    valueOneLineText?: string;
  };

export function DatePicker(props: DatePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState(props.valueOneLineText ?? '');
  const [chosenDate, setChosenDate] = useState<Date | null>(null);

  // if input is a valid date text then set it to chosen
  useEffect(() => {
    const parsed = Date.parse(text);
    if (isNaN(parsed)) return;
    setChosenDate(new Date(parsed));
  }, [text]);

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
    setText(value.toLocaleDateString('en-US'));
    if (props.onClickDay) props.onClickDay(value, e);
    setShowCalendar(false);
  };

  const handleChangeText: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
    if (props.onChange) props.onChange(e);
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
      <OneLineText {...props} value={text} onChange={handleChangeText} />
      <CalendarWrapper>
        {showCalendar && (
          <Calendar onClickDay={handleClickDayCalendar} value={chosenDate} />
        )}
      </CalendarWrapper>
    </Wrapper>
  );
}

export default DatePicker;

const Wrapper = styled.div`
  width: max-content;
  position: relative;
`;

const CalendarWrapper = styled.div`
  position: absolute;
  z-index: 100;
`;
