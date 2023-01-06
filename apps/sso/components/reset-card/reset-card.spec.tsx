import { render } from '@testing-library/react';

import ResetCard from './reset-card';

describe('ResetCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ResetCard />);
    expect(baseElement).toBeTruthy();
  });
});
