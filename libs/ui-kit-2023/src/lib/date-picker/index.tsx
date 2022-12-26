import { useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import './date-picker.less';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DatePickerProps {}

export function DatePicker(props: DatePickerProps) {
  const [date, setDate] = useState(new Date());
  return (
    <Wrapper>
      <Calendar
        onChange={setDate}
        value={date}
        maxDetail="month"
        next2Label={null}
        prev2Label={null}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div``;
