import { render } from '@testing-library/react';

import Spacer from './spacer';

describe('Spacer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Spacer />);
    expect(baseElement).toBeTruthy();
  });
});
