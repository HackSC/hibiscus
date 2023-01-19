import { render } from '@testing-library/react';

import CalendarEvent from './calendar-event';

describe('CalendarEvent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CalendarEvent />);
    expect(baseElement).toBeTruthy();
  });
});
