import { render } from '@testing-library/react';

import DatePicker from './date-picker';

describe('DatePicker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DatePicker />);
    expect(baseElement).toBeTruthy();
  });
});
