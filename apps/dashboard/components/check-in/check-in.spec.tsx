import { render } from '@testing-library/react';

import CheckIn from './check-in';

describe('CheckIn', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CheckIn />);
    expect(baseElement).toBeTruthy();
  });
});
