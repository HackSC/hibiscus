import { render } from '@testing-library/react';

import ApplyNow from './apply-now';

describe('ApplyNow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApplyNow />);
    expect(baseElement).toBeTruthy();
  });
});
