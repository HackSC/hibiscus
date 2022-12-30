import { useCallback, useEffect, useRef, useState } from 'react';
import { DateCallback } from 'react-calendar';
import styled from 'styled-components';
import { Calendar, CalendarProps } from '../calendar/calendar';
import OneLineText, { OneLineTextProps } from '../one-line-text/one-line-text';

/* eslint-disable-next-line */
export type DatePickerProps = OneLineTextProps & CalendarProps;

export function DatePicker(props: DatePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState('');
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
    setShowCalendar(false);
  };

  const handleChangeText: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (props.onChange) props.onChange(e);
    setText(e.target.value);
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
