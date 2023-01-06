import { render } from '@testing-library/react';

import GrayLink from './gray-link';

describe('GrayLink', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GrayLink />);
    expect(baseElement).toBeTruthy();
  });
});
