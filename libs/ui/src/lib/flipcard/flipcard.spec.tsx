import { render } from '@testing-library/react';

import FlipCard from './flipcard';

describe('FlipCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlipCard title extendedTitle />);
    expect(baseElement).toBeTruthy();
  });
});
