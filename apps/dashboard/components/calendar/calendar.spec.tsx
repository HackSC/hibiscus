import { render } from '@testing-library/react';

import Calendar from './calendar';

describe('Calendar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Calendar />);
    expect(baseElement).toBeTruthy();
  });
});
