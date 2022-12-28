import { render } from '@testing-library/react';

import MaximizeTwoArrowIcon from './maximize-two-arrow-icon';

describe('MaximizeTwoArrowIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MaximizeTwoArrowIcon />);
    expect(baseElement).toBeTruthy();
  });
});
