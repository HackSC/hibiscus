import { render } from '@testing-library/react';

import ResetCard from './reset-card';

describe('ResetEmailCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ResetCard />);
    expect(baseElement).toBeTruthy();
  });
});
