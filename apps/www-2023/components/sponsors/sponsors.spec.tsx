import { render } from '@testing-library/react';

import Sponsors from './sponsors';

describe('Sponsors', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Sponsors />);
    expect(baseElement).toBeTruthy();
  });
});
