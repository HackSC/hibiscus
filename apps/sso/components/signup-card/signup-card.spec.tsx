import { render } from '@testing-library/react';

import SignUpCard from './signup-card';

describe('SignUpCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SignUpCard />);
    expect(baseElement).toBeTruthy();
  });
});
