import { render } from '@testing-library/react';

import Newsletter from './newsletter';

describe('Newsletter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Newsletter />);
    expect(baseElement).toBeTruthy();
  });
});
