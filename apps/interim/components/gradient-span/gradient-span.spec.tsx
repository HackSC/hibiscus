import { render } from '@testing-library/react';

import GradientSpan from './gradient-span';

describe('GradientSpan', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GradientSpan />);
    expect(baseElement).toBeTruthy();
  });
});
