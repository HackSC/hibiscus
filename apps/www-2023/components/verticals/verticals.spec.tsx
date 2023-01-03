import { render } from '@testing-library/react';

import Verticals from './verticals';

describe('Verticals', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Verticals />);
    expect(baseElement).toBeTruthy();
  });
});
