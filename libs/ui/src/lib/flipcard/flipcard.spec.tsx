import { render } from '@testing-library/react';

import Flipcard from './flipcard';

describe('Flipcard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Flipcard />);
    expect(baseElement).toBeTruthy();
  });
});
