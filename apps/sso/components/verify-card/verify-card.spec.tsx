import { render } from '@testing-library/react';

import VerifyCard from './verify-card';

describe('LoginCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VerifyCard />);
    expect(baseElement).toBeTruthy();
  });
});
