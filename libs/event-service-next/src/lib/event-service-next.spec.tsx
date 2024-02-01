import { render } from '@testing-library/react';

import EventServiceNext from './event-service-next';

describe('EventServiceNext', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EventServiceNext />);
    expect(baseElement).toBeTruthy();
  });
});
