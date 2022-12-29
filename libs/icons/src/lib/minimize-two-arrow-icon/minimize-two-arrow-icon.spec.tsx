import { render } from '@testing-library/react';

import MinimizeTwoArrowIcon from './minimize-two-arrow-icon';

describe('MinimizeTwoArrowIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MinimizeTwoArrowIcon />);
    expect(baseElement).toBeTruthy();
  });
});
