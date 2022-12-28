import { render } from '@testing-library/react';

import GlowSpan from './glow-span';

describe('GlowSpan', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GlowSpan />);
    expect(baseElement).toBeTruthy();
  });
});
